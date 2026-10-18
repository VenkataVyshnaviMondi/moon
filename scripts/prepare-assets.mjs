import sharp from 'sharp';
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
await mkdir('public/images', { recursive: true });
await mkdir('public/fonts', { recursive: true });
await Promise.all([
  sharp('logo.png').extract({ left: 380, top: 265, width: 510, height: 425 }).resize(100, 84).webp({ quality: 90 }).toFile('public/images/brand-mark.webp'),
  sharp('swiggy.png').trim().resize({ width: 360, height: 150, fit: 'inside' }).webp({ quality: 90 }).toFile('public/images/swiggy.webp'),
  sharp('ayantech.png').trim().resize({ width: 360, height: 150, fit: 'inside' }).webp({ quality: 90 }).toFile('public/images/ayantech.webp'),
  ...[['Chippada Tej Kumar.png', 'tej'], ['Malla Krishnachaitanya.png', 'malla']].map(([input, output]) => sharp(input).extract({ left: 250, top: 20, width: 650, height: 650 }).resize(144, 144).webp({ quality: 85 }).toFile(`public/images/${output}.webp`)),
  copyFile('node_modules/@fontsource-variable/sora/files/sora-latin-wght-normal.woff2', 'public/fonts/sora-latin.woff2'),
  copyFile('node_modules/@fontsource-variable/sora/LICENSE', 'public/fonts/OFL.txt'),
]);
await writeFile('public/images/provenance.json', JSON.stringify({
  'brand-mark.webp': { source: 'https://mooncrafters.vercel.app/logo.png', method: 'Cropped existing agency atom mark; resized and encoded as WebP.' },
  'swiggy.webp': { source: 'https://mooncrafters.vercel.app/swiggy.png', method: 'Existing listed client logo; trimmed whitespace and encoded as WebP.' },
  'ayantech.webp': { source: 'https://mooncrafters.vercel.app/ayantech.png', method: 'Existing listed client logo; trimmed whitespace and encoded as WebP.' },
  'tej.webp': { source: 'https://mooncrafters.vercel.app/Chippada%20Tej%20Kumar.png', method: 'Existing CEO portrait cropped and encoded as WebP.' },
  'malla.webp': { source: 'https://mooncrafters.vercel.app/Malla%20Krishnachaitanya.png', method: 'Existing CEO portrait cropped and encoded as WebP.' },
}, null, 2));
console.log('Optimized five existing brand assets and copied one local variable font.');
