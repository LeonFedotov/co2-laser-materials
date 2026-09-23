import { readFile, writeFile } from 'node:fs/promises';
const read = path => readFile(new URL('../' + path, import.meta.url), 'utf8');
const modules = ['laser-materials.js','src/preview.js','src/references.js','src/domain.js','src/exports.js','src/sync.js','src/app.js'];
const script = (await Promise.all(modules.map(read))).map(text => text.replace(/^import .*;\s*$/gm,'').replace(/^export /gm,'')).join('\n');
const styles = await read('src/catalog.css'), vendor = await read('src/vendor/lucide.js'), analytics = await read('src/analytics.html');
const html = (await read('src/shell.html')).replace('/* STYLES */', () => styles)
  .replace('/* ICONS */', () => vendor).replace('<!-- ANALYTICS -->', () => analytics)
  .replace('/* APPLICATION */', () => script.replace(/<\/script/gi, '<\\/script'));
if (process.argv.includes('--check')) {
  if (html !== await read('index.html')) throw new Error('index.html is stale. Run npm run build.');
  console.log('Standalone page matches source.');
} else {
  await writeFile(new URL('../index.html', import.meta.url), html);
  console.log('Built standalone index.html.');
}
