import { copyFile, cp, mkdir, readdir, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = path.resolve(root, 'public');
if (path.dirname(output) !== path.resolve(root) || path.basename(output) !== 'public') {
  throw new Error('Invalid static output directory');
}
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
const extensions = new Set(['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.mp4', '.woff', '.woff2']);
for (const entry of await readdir(root, { withFileTypes: true })) {
  if (entry.isFile() && !entry.name.startsWith('.') && extensions.has(path.extname(entry.name).toLowerCase())) {
    await copyFile(path.join(root, entry.name), path.join(output, entry.name));
  }
}
await cp(path.join(root, 'services'), path.join(output, 'services'), { recursive: true });
console.log('Static website ready in public/');
