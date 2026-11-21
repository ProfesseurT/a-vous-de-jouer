// Construit index.html (page complète, prête pour n'importe quel hébergeur statique)
// à partir de src/jeu.html (fragment publié tel quel en Artifact).
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = await readFile(join(root, 'src', 'jeu.html'), 'utf8');

const headEnd = src.indexOf('</style>') + '</style>'.length;
const head = src.slice(0, headEnd);
const body = src.slice(headEnd);

const og = `
<meta property="og:title" content="À vous de jouer">
<meta property="og:description" content="Un vigneron, quatre obligations, des logiciels en guise d'armes. Le jeu 16 bits de l'équipe Solumatic.">
<meta property="og:type" content="website">`;

const html = `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
${head.trim()}${og}
</head>
<body>
${body.trim()}
</body>
</html>
`;

if (/[–—]/.test(src)) {
  console.error('Tiret cadratin ou demi-cadratin trouvé dans src/jeu.html : interdit par la charte.');
  process.exit(1);
}
await writeFile(join(root, 'index.html'), html);
console.log('index.html écrit (' + Math.round(html.length / 1024) + ' Ko)');
