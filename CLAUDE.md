# À vous de jouer : le jeu

Petit jeu vidéo 16 bits, subversif, de l'équipe Solumatic. Un vigneron court dans les rangs de vigne et affronte la paperasse avec nos logiciels en guise d'armes. 4 missions : l'étiquette, les douanes, le fisc (TVA et facture électronique), le registre phyto. Il surfe sur la sortie de GTA 6 sans jamais copier GTA : nom, personnages, logo et graphismes sont 100 % originaux.

But business : faire parler de la prévente du registre phyto et amener des vignerons vers la page de préinscription (`?source=jeu-a-vous-de-jouer`).

## Fichiers

| Fichier | Rôle |
|---|---|
| `src/jeu.html` | **La source unique, lisible.** CSS, écrans HTML et moteur JS dans un seul fichier. |
| `index.html` | Généré : page complète minifiée pour un hébergeur statique. Ne pas éditer à la main. |
| `dist/jeu.html` | Généré : fragment minifié publié en Artifact (non versionné). |
| `scripts/build.mjs` | Minifie (esbuild), construit les deux fichiers, refuse tout tiret cadratin ou demi-cadratin. |
| `JOURNAL.md` | Décisions, vérifications, état. |

Première fois : `npm install`. Après toute modification de `src/jeu.html` : `npm run build`.

## Règles du client (héritées du projet Bureau du Vigneron)

- **Jamais de tiret cadratin ni de demi-cadratin**, nulle part (le build bloque).
- **Règle de vérité** : chaque date, chiffre ou promesse produit affiché dans le jeu est vérifié à sa source. Fiche de faits du 21/11/2026 résumée dans `JOURNAL.md`.
- Registre phyto : jamais « vous êtes en règle » ; pas de nom d'appli inventé ; pas de concurrent nommé ; l'appli ouvre le 1er janvier 2027 (ne pas la décrire comme disponible avant) ; prévente 4,99 € HT/mois jusqu'au 31/12/2026, ensuite 9,99 € HT/mois. Le jeu bascule seul ses textes après le 31/12/2026 (`EN_PREVENTE`).
- « 3 500 comptes Viticode » et « 2 000 domaines chez Vitisoft » : jamais additionnés.
- Étiquetage : c'est l'information qui est obligatoire, pas le QR code.
- On dit « les douanes ». Hors UE, c'est un DAE (pas un DAES). DAE et DSA sont deux régimes différents.
- Vitisoft calcule la DRM (validée dans CIEL), génère DAE et DAES sur GAMMA 2, produit les factures en Factur-X, exporte factures et encaissements (comptes de TVA compris) vers le logiciel du comptable. Il ne transmet pas la DRM, ne déclare pas la TVA, ne tient pas la comptabilité, ne reçoit pas les factures fournisseurs.
- Téléphone d'abord : plein écran, gestes, aucun bouton.
- Le bureau : ni prix, ni date, ni « IA ».
- Teddy pousse lui-même sur git ; rien n'est publié publiquement sans son accord.

## Conception (pour reprendre le code)

- Écran interne 256 x 224 sur ordinateur et tablette ; sur téléphone, adapté à la forme de l'écran pour le remplir (`setRes`), sans boutons, aux gestes, outil choisi tout seul (`autoWeapon`). Agrandi sans lissage. Vue pseudo-3D : 5 allées (`LANE_X`), rangs de vigne entre elles, caméra à 3 m, joueur à 8 m devant (`PZ`).
- Une couleur = un outil : rose Viticode, orange Vitisoft, cyan Registre phyto, blanc n'importe lequel. Le bureau = bombe qui range l'écran.
- Apparition des obligations à 32 m devant le vigneron (`SPAWN_Z = 40`, environ 3 s pour réagir) : retour de Teddy du 21/11, à 56 m le jeu était trop facile. Le tutoriel est décrit en distance d'arrivée, il suit tout seul ce réglage.
- Étoiles de retard : chaque obligation qui passe ajoute une étoile (une seule par nuée), 5 = perdu ; 5 éliminations ou 9 s sans faute en retirent une.
- Textes et dates : objets `WEAPONS`, `MISSIONS`, `BOMB_INFO`, `QUIPS` en haut du script.
- Lien de prévente : `LP_URL`. Adresse publique du jeu pour le partage : `PUBLIC_URL` (à renseigner au déploiement).
- Banc de test : `window.AVDJ` (`step(n)` simule sans affichage, `bench(n)` mesure le coût d'une image).
- Performance (à préserver) : sol écrit pixel par pixel dans un tampon puis `putImageData` ; ceps rangés sur un atlas ; textes rendus une fois en petites images ; aucune allocation dans la boucle (tableaux compactés sur place, liste de profondeur réutilisée) ; plus aucun calcul derrière un écran opaque ; musique non programmée quand le son est coupé.
