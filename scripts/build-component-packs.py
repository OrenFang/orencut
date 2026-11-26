"""Build OrenCut's public catalog and one offline ZIP per component."""

import argparse
from base64 import b64encode
from concurrent.futures import ThreadPoolExecutor
import json
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED


root = Path(__file__).resolve().parent.parent
site = 'https://orenfang.github.io/orencut/'
release = 'studio-v0.2.0'
downloads = f'https://github.com/OrenFang/orencut/releases/download/{release}/'


def entry(scene):
    ident = scene['id']
    counter = ident == '27'
    portrait = scene['portrait']
    return {
        'id': ident, 'title': scene['title'], 'group': scene['group'],
        'keywords': list(dict.fromkeys([source['label'] for source in scene['sources']] +
                                       [source['symbol'] for source in scene['sources']])),
        'width': 540 if portrait else 960, 'height': 960 if portrait else 540,
        'fps': scene['fps'], 'frames': scene['frames'], 'durationSeconds': scene['seconds'],
        'mode': 'counter' if counter else 'clip', 'audio': False,
        'inputs': {
            'title': {'type': 'string', 'maxLength': 80, 'default': ''},
            **({'endValue': {'type': 'integer', 'minimum': 0, 'maximum': 9999, 'default': 1000},
                'unit': {'type': 'string', 'maxLength': 4, 'default': ''},
                'caption': {'type': 'string', 'maxLength': 42, 'default': ''}} if counter else
               {'position': {'type': 'string', 'enum': ['bottom', 'top', 'middle'], 'default': 'bottom'}}),
        },
        'previewPath': f'previews/{ident}.mp4', 'posterPath': f'previews/{ident}.jpg',
        **({'editPath': 'studio-assets/27-clean.mp4'} if counter else {}),
        'previewUrl': f'{site}previews/{ident}.mp4',
        'studioUrl': f'{site}studio.html?id={ident}',
        'downloadUrl': f'{downloads}orencut-{ident}.zip',
    }


def build_pack(data, target, html, assets):
    name = f'orencut-{data["id"]}'
    packed = {'component': data}
    for key in ('preview', 'poster', 'edit'):
        if location := data.get(f'{key}Path'):
            packed[key] = b64encode((root / location).read_bytes()).decode('ascii')
    asset_script = 'globalThis.OrenCutPackage = ' + json.dumps(packed, ensure_ascii=False, separators=(',', ':')) + ';\n'
    info = ('OrenCut Studio\n\n在新版桌面 Chrome 或 Edge 中打开 index.html。\n'
            '点击播放预览。填写标题后可导出静音 MP4。留空直接导出原版画面。\n'
            '此包包含组件画面和浏览器运行代码。先解压整个 ZIP，再打开 index.html。\n')
    with ZipFile(target / f'{name}.zip', 'w', compression=ZIP_DEFLATED, compresslevel=5) as bundle:
        bundle.writestr(f'{name}/index.html', html)
        bundle.writestr(f'{name}/studio-data.js', asset_script)
        bundle.writestr(f'{name}/component.json', json.dumps({'entry': 'index.html', **data}, ensure_ascii=False, indent=2))
        bundle.writestr(f'{name}/README.txt', info)
        for path in assets:
            bundle.write(path, Path(name) / path.relative_to(root))
    with ZipFile(target / f'{name}.zip') as bundle:
        if bundle.testzip() is not None:
            raise ValueError(f'Invalid component ZIP: {name}')
    return name


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('target', type=Path, help='directory for component ZIPs')
    parser.add_argument('--catalog-only', action='store_true')
    args = parser.parse_args()
    rows = json.loads((root / 'src/catalog.json').read_text())
    components = [entry(row) for row in sorted(rows, key=lambda row: row['id'])]
    assert len(components) == 33 and len({row['id'] for row in components}) == 33
    catalog = {'schemaVersion': 1, 'name': 'OrenCut Studio', 'release': release, 'components': components}
    (root / 'catalog.json').write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + '\n')
    if args.catalog_only:
        return

    args.target.mkdir(parents=True, exist_ok=True)
    page = (root / 'studio.html').read_text()
    html = page.replace('<!-- standalone data -->', '<script defer src="studio-data.js"></script>')
    asset_names = ['studio.css', 'studio.js', 'renderer.js', 'mediabunny.js', 'MEDIABUNNY-LICENSE.txt', 'THIRD-PARTY.md']
    assets = [root / 'studio-assets' / name for name in asset_names] + [root / 'LICENSE', root / 'NOTICE']
    with ThreadPoolExecutor(max_workers=3) as pool:
        for name in pool.map(lambda row: build_pack(row, args.target, html, assets), components):
            print(name, flush=True)


if __name__ == '__main__':
    main()
