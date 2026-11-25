"""Import the pinned visual archives into a local OrenCut working copy."""

import argparse
import hashlib
import json
from pathlib import Path, PurePosixPath
import re
import subprocess
import tempfile
from zipfile import ZipFile


ROOT = Path(__file__).resolve().parent.parent
AUDIO = {'.aac', '.aif', '.aiff', '.flac', '.m4a', '.mp3', '.ogg', '.opus', '.wav'}
VIDEO = {'.m4v', '.mkv', '.mov', '.mp4', '.webm'}


def fingerprint(path):
    digest = hashlib.sha256()
    with path.open('rb') as file:
        for chunk in iter(lambda: file.read(1024 * 1024), b''):
            digest.update(chunk)
    return digest.hexdigest()


def sha_bytes(data):
    return hashlib.sha256(data).hexdigest()


def output(path, data, previous=None):
    current = path.read_bytes() if path.exists() else None
    if current == data:
        return
    if current is not None and current != previous:
        raise ValueError(f'Refusing to replace an existing file: {path}')
    path.parent.mkdir(exist_ok=True, parents=True)
    with tempfile.NamedTemporaryFile(dir=path.parent, delete=False) as temporary:
        pending = Path(temporary.name)
        temporary.write(data)
    try:
        pending.replace(path)
    finally:
        pending.unlink(missing_ok=True)


def decode_stream_types(ffprobe, path):
    raw = subprocess.check_output([
        ffprobe, '-v', 'error', '-show_entries', 'stream=codec_type', '-of', 'json', str(path),
    ])
    return [stream['codec_type'] for stream in json.loads(raw)['streams']]


def visual_video(raw, filename, ffmpeg, ffprobe, workspace):
    original = workspace / f'source{filename.suffix}'
    silent = workspace / f'silent{filename.suffix}'
    original.write_bytes(raw)
    kinds = decode_stream_types(ffprobe, original)
    if kinds == ['video']:
        return raw
    if kinds.count('video') != 1:
        raise ValueError(f'Expected one picture track in {filename}')
    subprocess.run([
        ffmpeg, '-nostdin', '-v', 'error', '-xerror', '-y', '-i', str(original),
        '-map', '0:v:0', '-an', '-sn', '-dn', '-map_metadata', '-1', '-c:v', 'copy', str(silent),
    ], check=True)
    if decode_stream_types(ffprobe, silent) != ['video']:
        raise ValueError(f'Did not remove the non-picture tracks from {filename}')
    return silent.read_bytes()


def matching_archives(inputs, pins):
    input_files = set()
    for path in inputs:
        if path.is_dir():
            input_files.update(p for p in path.glob('*.zip') if p.is_file())
        elif path.is_file():
            input_files.add(path)
        else:
            raise FileNotFoundError(path)
    by_sha = {fingerprint(file): file for file in sorted(input_files)}
    missing = [slot for slot, pin in pins.items() if pin['sha256'] not in by_sha]
    if missing:
        raise ValueError('Missing exact editable archive for slot(s) ' + ', '.join(missing))
    return {slot: by_sha[pin['sha256']] for slot, pin in pins.items()}


def import_one(slot, archive_path, prefix, arguments, workspace, public, licenses):
    imported = remuxed = 0
    with ZipFile(archive_path) as archive:
        if len(archive.namelist()) != len(set(archive.namelist())):
            raise ValueError(f'Duplicate entries in {archive_path}')
        for entry in archive.infolist():
            if entry.is_dir() or not entry.filename.startswith(prefix):
                continue
            member = entry.filename[len(prefix):]
            path = PurePosixPath(member)
            if path.is_absolute() or '\\' in member or '..' in path.parts or not path.parts:
                raise ValueError(f'Invalid archive entry: {member}')
            if path.parts[0] != 'public':
                if path.name == 'assets.json' or re.search(r'(?:license|ofl|official.free.use)', path.name, re.IGNORECASE):
                    data = archive.read(entry)
                    output(ROOT/'licenses'/slot/path, data)
                    licenses[f'{slot}/{path}'] = sha_bytes(data)
                continue
            suffix = path.suffix.lower()
            if suffix in AUDIO or 'audio' in path.parts or 'delivery-audio' in path.parts:
                continue
            raw = archive.read(entry)
            source_sha = sha_bytes(raw)
            if member in public:
                if public[member]['archiveSha256'] != source_sha:
                    raise ValueError(f'Conflicting files under {member}')
                continue
            data = visual_video(raw, path, arguments.ffmpeg, arguments.ffprobe, workspace) if suffix in VIDEO else raw
            remuxed += int(data != raw)
            output(ROOT/path, data, previous=raw)
            public[member] = {'archiveSha256':source_sha, 'localSha256':sha_bytes(data), 'slot':slot}
            imported += 1
    print(f'{slot}: {imported} visual files, {remuxed} videos stream-copied without audio', flush=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('archives', nargs='+', type=Path, help='an editable ZIP or directory containing editable ZIPs')
    parser.add_argument('--ffmpeg', default='ffmpeg')
    parser.add_argument('--ffprobe', default='ffprobe')
    args = parser.parse_args()
    pins = json.loads((ROOT/'visual-archives.json').read_text(encoding='utf-8'))
    resolved = matching_archives(args.archives, pins)
    public, licenses = {}, {}
    with tempfile.TemporaryDirectory(dir=ROOT, prefix='.visual-import-') as work:
        for slot, archive in sorted(resolved.items()):
            import_one(slot, archive, pins[slot]['prefix'], args, Path(work), public, licenses)
    record = {
        'schema':1,
        'archives':{slot: pin['sha256'] for slot, pin in pins.items()},
        'files':public,
        'licenses':licenses,
        'sourceNarrationIncluded':False,
    }
    lock = ROOT/'visual-assets.lock.json'
    previous = lock.read_bytes() if lock.exists() else None
    output(lock, (json.dumps(record, indent=2, sort_keys=True)+'\n').encode(), previous=previous)
    print(f'{len(public)} visual files imported. Run npm run studio to open the exact visuals.')


if __name__ == '__main__':
    try:
        main()
    except (OSError, ValueError, subprocess.CalledProcessError) as error:
        raise SystemExit(str(error)) from error
