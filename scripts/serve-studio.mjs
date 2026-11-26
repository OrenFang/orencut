import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('../', import.meta.url)));
const types = {'.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.mp4': 'video/mp4', '.jpg': 'image/jpeg', '.gif': 'image/gif'};
const port = Number(process.env.ORENCUT_PORT ?? 4173);

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    const path = resolve(root, `.${pathname === '/' ? '/studio.html' : pathname}`);
    if (!path.startsWith(root + sep) || !types[extname(path)]) {
      response.writeHead(404).end('Not found');
      return;
    }
    const file = await stat(path);
    if (!file.isFile()) throw new Error('Not a file');
    const headers = {'Content-Type': types[extname(path)], 'Content-Length': file.size, 'Accept-Ranges': 'bytes'};
    const range = /^bytes=(\d+)-(\d*)$/.exec(request.headers.range ?? '');
    const start = range ? Number(range[1]) : 0;
    const end = range && range[2] ? Math.min(file.size - 1, Number(range[2])) : file.size - 1;
    if (range && (start > end || start >= file.size)) {
      response.writeHead(416, {'Content-Range': `bytes */${file.size}`}).end();
      return;
    }
    if (range) {
      headers['Content-Range'] = `bytes ${start}-${end}/${file.size}`;
      headers['Content-Length'] = end - start + 1;
    }
    response.writeHead(range ? 206 : 200, headers);
    if (request.method === 'HEAD') response.end();
    else createReadStream(path, range ? {start, end} : undefined).pipe(response);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(port, '127.0.0.1', () => console.log(`OrenCut Studio · http://127.0.0.1:${port}/`));
