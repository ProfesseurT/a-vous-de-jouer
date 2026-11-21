// Construit, depuis src/jeu.html (la source lisible) :
//  - dist/jeu.html : fragment minifié, publié en Artifact claude.ai ;
//  - index.html    : page complète minifiée, prête pour n'importe quel hébergeur statique.
// Refuse tout tiret cadratin ou demi-cadratin (charte du client).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { transform } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = await readFile(join(root, 'src', 'jeu.html'), 'utf8');

if (/[–—]/.test(src)) {
  console.error('Tiret cadratin ou demi-cadratin trouvé dans src/jeu.html : interdit par la charte.');
  process.exit(1);
}

const pick = (open, close) => {
  const a = src.indexOf(open), b = src.indexOf(close, a);
  if (a < 0 || b < 0) throw new Error('Bloc introuvable : ' + open);
  return { a, b: b + close.length, inner: src.slice(a + open.length, b) };
};
const style = pick('<style>', '</style>');
const script = pick('<script>', '</script>');

const css = (await transform(style.inner, { loader: 'css', minify: true, charset: 'utf8' })).code.trim();
const js = (await transform(script.inner, { loader: 'js', minify: true, charset: 'utf8', target: 'es2020' })).code.trim();

// HTML : on retire seulement l'indentation entre les balises (les espaces d'une même ligne sont conservés)
const html = s => s.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s*\n\s*</g, '><').trim();

const head = html(src.slice(0, style.a));
const body = html(src.slice(style.b, script.a));
const fragment = `${head}<style>${css}</style>${body}<script>${js}</script>\n`;

const og = '<meta property="og:title" content="À vous de jouer">'
  + '<meta property="og:description" content="Un vigneron, quatre obligations, des logiciels en guise d\'armes. Le jeu 16 bits de l\'équipe Solumatic.">'
  + '<meta property="og:type" content="website">';
const page = '<!doctype html><html lang="fr"><head><meta charset="utf-8">'
  + '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  + `${head}${og}<style>${css}</style></head><body>${body}<script>${js}</script></body></html>\n`;

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(join(root, 'dist', 'jeu.html'), fragment);
await writeFile(join(root, 'index.html'), page);

const ko = n => (n / 1024).toFixed(1) + ' Ko';
console.log(`source ${ko(Buffer.byteLength(src))} → index.html ${ko(Buffer.byteLength(page))} (compressé ${ko(gzipSync(page, { level: 9 }).length)})`);
