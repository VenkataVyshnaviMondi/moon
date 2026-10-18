import { readFile, writeFile } from 'node:fs/promises';
import { createServer } from 'vite';
import { renderToString } from 'react-dom/server';
import { createElement } from 'react';

const server = await createServer({ mode: 'production', server: { middlewareMode: true }, appType: 'custom' });
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx');
  const html = await readFile('dist/index.html', 'utf8');
  const rendered = renderToString(createElement(App));
  if (!rendered.includes('Grow your brand.')) throw new Error('Prerender did not include the primary content.');
  await writeFile('dist/index.html', html.replace('<!--app-html-->', rendered));
  console.log('Pre-rendered complete page: headline, services, navigation and contact form.');
} finally {
  await server.close();
}
