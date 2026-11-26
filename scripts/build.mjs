// Construit, depuis src/jeu.html (la source lisible) :
//  - dist/jeu.html : fragment minifié, publié en Artifact claude.ai ;
//  - index.html    : page complète minifiée, prête pour n'importe quel hébergeur statique.
// index.html seulement reçoit aussi src/consentement.html (fenêtre de consentement + pixel Meta) : jamais l'Artifact.
// Refuse tout tiret cadratin ou demi-cadratin (charte du client).
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { transform } from 'esbuild';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const src = await readFile(join(root, 'src', 'jeu.html'), 'utf8');
const ccSrc = await readFile(join(root, 'src', 'consentement.html'), 'utf8');

const fail = msg => { console.error(msg); process.exit(1); };
for (const [nom, txt] of [['src/jeu.html', src], ['src/consentement.html', ccSrc]]) {
  if (/[\u2013\u2014]/.test(txt)) fail(`Tiret cadratin ou demi-cadratin trouvé dans ${nom} : interdit par la charte.`);
}

// Un seul <style> et un seul <script> par fichier source : un bloc ajouté à côté serait perdu.
const pick = (txt, open, close) => {
  const a = txt.indexOf(open), b = txt.indexOf(close, a);
  if (a < 0 || b < 0) throw new Error('Bloc introuvable : ' + open);
  if (txt.indexOf(open, b) >= 0) throw new Error('Deuxième bloc ' + open + ' : il serait perdu, fusionnez-le avec le premier.');
  return { a, b: b + close.length, inner: txt.slice(a + open.length, b) };
};
const minCss = async s => (await transform(s, { loader: 'css', minify: true, charset: 'utf8' })).code.trim();
const minJs = async s => (await transform(s, { loader: 'js', minify: true, charset: 'utf8', target: 'es2020' })).code.trim();
// HTML : on retire seulement l'indentation entre les balises (les espaces d'une même ligne sont conservés)
const html = s => s.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s*\n\s*</g, '><').trim();

const style = pick(src, '<style>', '</style>');
const script = pick(src, '<script>', '</script>');
const css = await minCss(style.inner);
const js = await minJs(script.inner);
const head = html(src.slice(0, style.a));
const body = html(src.slice(style.b, script.a));
const fragment = `${head}<style>${css}</style>${body}<script>${js}</script>\n`;

// Consentement : la fenêtre (HTML), son style, son script. Placé après le script du jeu (voir src/consentement.html).
const ccStyle = pick(ccSrc, '<style>', '</style>');
const ccScript = pick(ccSrc, '<script>', '</script>');
if (ccStyle.a > ccScript.a) throw new Error('src/consentement.html : le <style> doit précéder le <script>.');
const ccCss = await minCss(ccStyle.inner);
const ccJs = await minJs(ccScript.inner);
const ccHtml = html(ccSrc.slice(0, ccStyle.a) + ccSrc.slice(ccStyle.b, ccScript.a) + ccSrc.slice(ccScript.b));

const PUBLIC = 'https://professeurt.github.io/a-vous-de-jouer/';
const og = '<meta property="og:title" content="À vous de jouer">'
  + '<meta property="og:description" content="Vigneron ou vigneronne, quatre obligations, des logiciels en guise d\'armes. Le jeu 16 bits de l\'équipe Solumatic.">'
  + '<meta property="og:type" content="website"><meta property="og:locale" content="fr_FR">'
  + `<meta property="og:url" content="${PUBLIC}"><link rel="canonical" href="${PUBLIC}">`
  + `<meta property="og:image" content="${PUBLIC}og.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">`
  + '<meta property="og:image:alt" content="Écran d\'accueil du jeu À vous de jouer : vigneron ou vigneronne dans les rangs de vigne au coucher du soleil.">'
  + '<meta name="twitter:card" content="summary_large_image">';
const page = '<!doctype html><html lang="fr"><head><meta charset="utf-8">'
  + '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">'
  // icône d'onglet : une grappe en pixels (évite aussi la requête favicon.ico en 404)
  + '<link rel="icon" href="data:image/svg+xml,<svg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 8 8%27 shape-rendering=%27crispEdges%27><path fill=%27%236fcf5a%27 d=%27M4 0h2v1H4z%27/><path fill=%27%239a2cb0%27 d=%27M2 1h4v1H2zM1 2h6v2H1zM2 4h4v2H2zM3 6h2v1H3z%27/><path fill=%27%23ff9ac8%27 d=%27M2 2h1v1H2zM4 3h1v1H4zM3 5h1v1H3z%27/></svg>">'
  + `${head}${og}<style>${css}${ccCss}</style></head><body>${body}<script>${js}</script>${ccHtml}<script>${ccJs}</script></body></html>\n`;

// Garde-fou : le pixel est dans index.html, jamais dans l'Artifact.
const pixel = (ccSrc.match(/PIXEL_ID\s*=\s*'(\d+)'/) || [])[1];
if (!pixel) fail('Numéro du pixel introuvable dans src/consentement.html.');
if (/fbevents|fbq|facebook/i.test(fragment) || fragment.includes(pixel)) fail('Le pixel Meta s\'est glissé dans dist/jeu.html (Artifact) : interdit.');
if (!page.includes(pixel) || !page.includes('fbevents.js') || !page.includes('id="cc"')) fail('Consentement absent de index.html.');

await mkdir(join(root, 'dist'), { recursive: true });
await writeFile(join(root, 'dist', 'jeu.html'), fragment);
await writeFile(join(root, 'index.html'), page);

const ko = n => (n / 1024).toFixed(1) + ' Ko';
console.log(`source ${ko(Buffer.byteLength(src) + Buffer.byteLength(ccSrc))} → index.html ${ko(Buffer.byteLength(page))} (compressé ${ko(gzipSync(page, { level: 9 }).length)}), dist/jeu.html ${ko(Buffer.byteLength(fragment))} sans pixel`);
