import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const pins = JSON.parse(readFileSync(new URL('visual-archives.json', root), 'utf8'));
const lock = new URL('visual-assets.lock.json', root);
let valid = false;

if (existsSync(lock)) {
  const imported = JSON.parse(readFileSync(lock, 'utf8'));
  const archivesMatch = Object.entries(pins).every(([slot, pin]) => imported.archives?.[slot] === pin.sha256);
  const files = Object.keys(imported.files ?? {});
  valid = archivesMatch
    && files.length > 0
    && files.every((path) => path.startsWith('public/') && existsSync(new URL(path, root)));
}

if (!valid) {
  console.error('需要先导入与这组组件匹配的可编辑 ZIP 中的素材。');
  console.error('安装 Python 3、FFmpeg 与 ffprobe，然后运行：');
  console.error('  python3 scripts/import-visual-assets.py /本地/可编辑工程目录');
  console.error('可传入多个目录或独立 ZIP 路径。成功后重新运行 npm run studio:original。');
  process.exitCode = 1;
}
