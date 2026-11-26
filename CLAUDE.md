# À vous de jouer : le jeu

Petit jeu vidéo 16 bits, subversif, de l'équipe Solumatic. Un vigneron court dans les rangs de vigne et affronte la paperasse avec nos logiciels en guise d'armes. 4 missions, nommées d'après les méchants : la DGCCRF (l'étiquette), les douanes, le fisc (TVA et facture électronique), la DRAAF (le registre phyto). Boss final : la paperasse. Il surfe sur la sortie de GTA 6 sans jamais copier GTA : nom, personnages, logo et graphismes sont 100 % originaux.

But business : faire parler de la prévente du registre phyto et amener des vignerons vers la page de préinscription (`?source=jeu-a-vous-de-jouer`).

## Fichiers

| Fichier | Rôle |
|---|---|
| `src/jeu.html` | **La source du jeu, lisible.** CSS, écrans HTML et moteur JS dans un seul fichier. |
| `src/consentement.html` | Fenêtre de consentement + pixel Meta. Le build l'injecte dans `index.html` seulement, jamais dans `dist/jeu.html`. |
| `index.html` | Généré : page complète minifiée pour un hébergeur statique. Ne pas éditer à la main. |
| `dist/jeu.html` | Généré : fragment minifié publié en Artifact (non versionné). |
| `scripts/build.mjs` | Minifie (esbuild), construit les deux fichiers, ajoute le consentement à `index.html` seulement, refuse tout tiret cadratin ou demi-cadratin, refuse un pixel dans `dist/jeu.html` et un deuxième `<style>` ou `<script>` dans une source (il serait perdu). |
| `JOURNAL.md` | Décisions, vérifications, état. |
| `og.jpg` | Image d'aperçu quand le lien est partagé (LinkedIn, etc.). |

Première fois : `npm install`. Après toute modification de `src/jeu.html` ou `src/consentement.html` : `npm run build`.

## Règles du client (héritées du projet Bureau du Vigneron)

- **Jamais de tiret cadratin ni de demi-cadratin**, nulle part (le build bloque).
- **Règle de vérité** : chaque date, chiffre ou promesse produit affiché dans le jeu est vérifié à sa source. Fiche de faits du 21/11/2026 résumée dans `JOURNAL.md`.
- Registre phyto : jamais « vous êtes en règle » ; pas de nom d'appli inventé ; pas de concurrent nommé ; l'appli ouvre le 1er janvier 2027 (ne pas la décrire comme disponible avant) ; prévente 4,99 € HT/mois jusqu'au 31/12/2026, ensuite 9,99 € HT/mois. Le jeu bascule seul ses textes après le 31/12/2026 (`EN_PREVENTE`).
- « 3 500 comptes Viticode » et « 2 000 domaines chez Vitisoft » : jamais additionnés.
- Étiquetage : c'est l'information qui est obligatoire, pas le QR code.
- On dit « les douanes ». Hors UE, c'est un DAE (pas un DAES). DAE et DSA sont deux régimes différents.
- Vitisoft calcule la DRM (validée dans CIEL), génère DAE et DAES sur GAMMA 2, produit les factures en Factur-X. Il est connecté à Pennylane, plateforme agréée, qui transporte les factures électroniques (Pennylane ne fait jamais la facture). Il envoie le journal des ventes, TVA comprise, dans le logiciel du comptable (arbitrage de Teddy du 21/11/2026 : « TVA mensuelle » validée). Il ne transmet pas la DRM et ne tient pas la comptabilité.
- Téléphone d'abord : plein écran, gestes, aucun bouton.
- Le bureau : ni prix, ni date, ni « IA ».
- Teddy pousse lui-même sur git ; rien n'est publié publiquement sans son accord.

## Conception (pour reprendre le code)

- Écran interne 256 x 224 sur ordinateur et tablette ; sur téléphone, adapté à la forme de l'écran pour le remplir (`setRes`), sans boutons, aux gestes. Partout, l'outil se choisit tout seul selon la couleur de l'ennemi visé (`autoWeapon`) : ni touches 1 2 3, ni boutons d'outil (retour de Teddy du 26/11 : « pas jouable sinon »). Agrandi sans lissage, à l'échelle entière : chaque pixel du jeu couvre un nombre entier de pixels physiques (5 x 5 sur iPhone), la taille interne s'ajuste pour remplir l'écran (`fit`, `scanlines`). Vue pseudo-3D : 5 allées (`LANE_X`), rangs de vigne entre elles, caméra à 3 m, joueur à 8 m devant (`PZ`).
- Personnage au choix sur l'accueil : vigneron ou vigneronne (`SPR.heroes`, choix mémorisé dans le navigateur). Textes neutres ou accordés : jamais « le vigneron » seul.
- Une couleur = un outil : rose Viticode, orange Vitisoft, cyan Registre phyto, blanc n'importe lequel. Le bureau = bombe qui range l'écran.
- Barrières NORME (4 rangs sur 5, un trou) : au choix, passer par le trou (sûr) ou sauter par-dessus (saut à placer environ 0,15 à 0,55 s avant, bonus 150 €). Retour de Teddy du 21/11. Barrière de 18 px, franchie si le saut dépasse 85 % de sa hauteur, même règle que les dossiers au sol.
- Apparition des obligations à 32 m devant le vigneron (`SPAWN_Z = 40`, environ 3 s pour réagir) : retour de Teddy du 21/11, à 56 m le jeu était trop facile. Le tutoriel est décrit en distance d'arrivée, il suit tout seul ce réglage.
- Étoiles de retard : chaque obligation qui passe ajoute une étoile (une seule par nuée). À 5, « contrôle » : une grappe de sérénité en moins et les étoiles repartent à zéro (retour de Teddy du 21/11 : perdre la partie à 5 étoiles était trop dur, on ne peut pas tout attraper). 3 éliminations ou 6 s sans faute retirent une étoile. On ne perd que par la sérénité.
- Textes et dates : objets `WEAPONS`, `MISSIONS`, `BOMB_INFO`, `QUIPS` en haut du script.
- Lien de prévente : `LP_URL`. Adresse publique du jeu : https://professeurt.github.io/a-vous-de-jouer/ (GitHub Pages, branche `main`, racine ; `PUBLIC_URL` dans le jeu, `PUBLIC` dans `scripts/build.mjs`). Chaque push sur `main` met le jeu en ligne. `og.jpg` = image d'aperçu des partages (1200 x 630, capture de l'accueil) : à refaire si l'accueil change. `.nojekyll` : GitHub sert les fichiers tels quels.
- Pixel Meta (`src/consentement.html`, 2162686380997506) : derrière une fenêtre de consentement reprise des 2 landing pages de prévente, aux couleurs du jeu. Rien n'est chargé ni déposé avant « Accepter ». Actif seulement sur professeurt.github.io (et localhost pour les tests) et jusqu'au 1er janvier 2027 0 h heure de Paris (`FIN`, même date que `PREVENTE_FIN` : les changer ensemble) ; ensuite ni fenêtre ni pixel, et les cookies d'un accord passé sont effacés. Événements : PageView et ViewContent (`content_name` « Jeu a vous de jouer »), jamais d'InitiateCheckout (le jeu ne vend rien). Choix gardé 6 mois (`avdj_meta_consent`) ; changer `VERSION` si le texte change, pour redemander. Bouton « Cookies » ajouté par le module sur l'accueil (ligne « Par l'équipe Solumatic ») et dans la pause ; refuser après avoir accepté efface `_fbp` et `_fbc` (sur l'adresse exacte : github.io est un suffixe public) et recharge la page. Tant que la fenêtre est ouverte : reste de la page inerte, clavier intercepté avant le jeu, manette ignorée (`body.cc-lock`, seul point d'accroche dans `src/jeu.html`). Le module passe après le script du jeu : ne pas changer cet ordre. Pour tester : le pixel n'envoie rien depuis un navigateur qui se déclare « HeadlessChrome », donner un identifiant de navigateur normal, et intercepter `facebook.com/tr` pour ne pas fausser les statistiques.
- Banc de test : `window.AVDJ` (`step(n)` simule sans affichage, `bench(n)` mesure le coût d'une image).
- Fluidité : un pas de simulation par image affichée, de sa durée réelle (`frame`) : régulier à 60, 90 et 120 Hz. Le saut est calculé d'après le temps écoulé (même trajectoire partout). Tout effet aléatoire par pas doit être proportionnel à `dt`.
- Performance (à préserver) : sol écrit pixel par pixel dans un tampon puis `putImageData` ; ceps rangés sur un atlas ; textes rendus une fois en petites images (score collé chiffre par chiffre) ; sol envoyé avant tout autre dessin ; aucune allocation dans la boucle (tableaux compactés sur place, liste de profondeur réutilisée) ; plus aucun calcul derrière un écran opaque ; musique non programmée quand le son est coupé.
