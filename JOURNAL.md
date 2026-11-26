# Journal

## 21/11/2026 · V1 du jeu

**Demande de Teddy** : un petit jeu vidéo subversif, façon GTA en 16 bits, avec la charte « À vous de jouer » (email Brevo et landing de prévente du registre phyto). Le vigneron saute d'un rang de vigne à l'autre, évite ou neutralise les nouvelles obligations (facture électronique, douane et GAMMA 2, QR code nutritionnel, registre phyto) avec nos logiciels comme armes (Viticode, Vitisoft, le registre, le bureau). Autonomie complète, auto-audit.

**Décisions prises (à valider par Teddy)**
- Titre : « À vous de jouer. » (le titre de la campagne). Aucun nom, logo ni visuel de GTA : clin d'œil par le genre (missions, étoiles de recherche devenues étoiles de retard, écran « PAPERASSÉ. », SMS, radio), pas par la copie. Raison : risque juridique et image publique.
- Vue pseudo-3D de dos dans l'allée, reprise directe du visuel de l'email (soleil à rayures, château au bout de l'allée, liseré néon des feuilles).
- 4 missions dans l'ordre chronologique des obligations, une saison par mission : été (étiquette), automne (douane), vendanges de nuit (facture électronique), aube d'hiver sur vigne taillée (registre phyto, 1er janvier 2027).
- Armes : Viticode (mission 1), Vitisoft (mission 2), le bureau en bombe (mission 3), Registre phyto (mission 4). Vitiwin non utilisé (rien de vérifié qui colle à un obstacle).
- « Multicode » dans la demande dictée : compris comme Viticode [Probable].
- Fin de partie et victoire : encart de prévente (4,99 € HT/mois jusqu'au 31/12/2026) et bouton vers la landing avec `?source=jeu-a-vous-de-jouer`. Bascule automatique des textes à partir du 1er janvier 2027.
- Citation de Teddy en écran de victoire : « Le vin se fait à la vigne. Le reste se gagne au bureau. » (reprise de son post LinkedIn du 21/11).
- Musique et sons : composés en code (Web Audio), originaux.

**Faits vérifiés (agent de vérification, 21/11/2026)**
- Étiquetage : vins produits depuis le 8 décembre 2023, ingrédients et déclaration nutritionnelle ; QR code possible avec la mention « ingrédients » (règl. UE 2021/2117, guide UE C/2023/1190). Viticode : QR codes nutritionnels gratuits (blog vitisoft.fr).
- Douane : DRM chaque mois avant le 10, même sans mouvement (echeances.json du site). DAE sur GAMMA 2 depuis le 26 juin 2025, ancien GAMMA fermé (douane.gouv.fr). Vitisoft : calcule la DRM, validée dans CIEL ; DAE sur GAMMA 2 depuis les factures (page DRM de vitisoft.fr).
- Facture électronique : réception obligatoire au 1er septembre 2026 ; émission TPE et PME au 1er septembre 2027 via plateforme agréée (fiche impots.gouv.fr). Vitisoft produit les factures en Factur-X.
- Registre phyto : numérique au 1er janvier 2027 ; papier toléré jusqu'en 2029 avec conversion avant le 31 janvier suivant ; conservation 5 ans (arrêté du 24/12/2025). Stat'Phyto annuel à partir de 2028 [Probable, notice DGAL via CLAUDE.md].
- Le bureau : extension web de Vitisoft qui dit chaque matin qui rappeler et quoi proposer.
- Écart signalé : la FAQ `vitisoft.fr/src/pages/fonctionnalites/facturation-electronique.astro` dit que Vitisoft « se connecte aux PA », ce qui contredit `REGLES_COPIE_EMAILS.md`. Écarté du jeu, à trancher par Teddy.

**Vérifications faites**
- Syntaxe JS, aucune erreur console (Chrome headless) sur : titre, mission, jeu, 4 missions, boss, perdu, victoire.
- Captures : bureau 1280x800, mobile portrait 390x844 et 360x640, paysage 844x390. Pas de défilement horizontal. Boutons tactiles et glissés testés.
- Équilibrage par robot (simulation) : un joueur attentif gagne les 4 missions ; un joueur moyen gagne les missions 1 à 3 et cale sur la 4 ; sans rien faire, perdu en 15 à 25 s.
- Corrigé en route : écrans cachés qui bloquaient les clics, nuée de factures qui donnait 5 étoiles d'un coup, sbires de boss qui donnaient des étoiles, débordement des boutons sur mobile.

**Reste à décider par Teddy**
- Mise en ligne publique (Vercel ou GitHub Pages) et adresse du jeu (`PUBLIC_URL`).
- Consignation Notion (calendrier des contenus) au moment de la publication.

## 21/11/2026 · Retours de Teddy, V2

**Retours** : plein écran sur téléphone, sans boutons (gestes, consignes avant la partie) ; « les douanes » et non « la douane » ; parler de la DRM, des DAE, DSA, DAES ; ajouter le fisc (TVA, comptabilité) avec Vitisoft comme arme.

**Fait**
- Téléphone : l'écran interne s'adapte à la forme de l'écran (224 de large en portrait, 224 de haut en paysage), le jeu occupe 100 % de l'écran. Aucun bouton. Gestes : glisser gauche ou droite (changer de rang), haut (sauter), bas (le bureau), toucher les côtés ou le milieu. Pause : petit bouton II en haut au centre. Plein écran natif demandé au lancement quand le navigateur l'accepte.
- Sur téléphone, l'outil se choisit tout seul selon la couleur de l'ennemi visé (impossible de changer d'arme sans bouton en pleine action). Décision prise par moi, réversible.
- Tablette et ordinateur : inchangés (boutons sur tablette, clavier et manette sur ordinateur). Consignes et écran Commandes adaptés à l'appareil.
- Mission 2 « Les douanes » : DRM, DAE, DSA, DAES, GAMMA 2. Nouvel ennemi DAES.
- Mission 3 « Le fisc » (remplace « La facture électronique ») : TVA au régime simplifié agricole + facture électronique + e-reporting. Nouvel ennemi TVA.
- Mission 4 adoucie (taux de réussite mesuré par robot : 80 % joueur attentif, 50 % joueur moyen, contre 10 à 30 % avant).

**Faits vérifiés (agent, 21/11/2026)**
- DAE : document administratif électronique, vins en suspension de droits (entrepositaire, UE, export hors UE avec DAE export apuré par DELTA). DSA : droits acquittés entre professionnels, en France. DAES : document administratif électronique simplifié, droits acquittés vers un professionnel de l'UE (depuis le 13/02/2023). Les trois sur GAMMA 2 (douane.gouv.fr).
- TVA, régime simplifié agricole : déclaration annuelle 3517-AGR (CA12A) et 4 acomptes (3525 bis), télédéclaration obligatoire (impots.gouv.fr). La suppression du régime simplifié au 01/01/2027 ne concerne pas le RSA. E-reporting au 01/09/2027 pour les PME et TPE.
- Vitisoft : génère DAE et DAES sur GAMMA 2 depuis les factures ; exporte factures et encaissements, comptes de TVA par taux paramétrés, vers le logiciel du comptable. Rien de sourcé sur le calcul ou la déclaration de la TVA, ni sur la tenue de la comptabilité.

**À signaler à Teddy**
- « Les DAES à chaque facture à l'export » : hors UE, c'est un DAE (le DAES sert dans l'UE en droits acquittés). « DAE et DSA confondus » : non, régimes différents, seul GAMMA 2 est commun.
- « Le fisc, la TVA, la compta, c'est Vitisoft » : le jeu dit seulement ce qui est sourcé (export des écritures vers le comptable). La publicité Meta « Vitisoft, animation boucle » montre « Déclaration TVA » et « Valider la TVA mensuelle » sans source.

## 21/11/2026 · V3 : optimisation et nettoyage

**Demande de Teddy** : rendre le jeu le plus léger possible sans perdre en qualité, nettoyer le code.

**Mesures (Chrome headless sur Mac, coût de calcul d'une image en jeu)**
| | Avant | Après |
|---|---|---|
| Téléphone portrait | 2,3 ms | 0,7 ms (moins 70 %) |
| Ordinateur | 1,3 ms | 0,4 ms (moins 68 %) |
| Fichier livré | 127 Ko (40 Ko compressé) | 93 Ko (34 Ko compressé) |

**Ce qui a changé**
- Sol : écrit pixel par pixel puis envoyé en une fois, au lieu d'environ 6 000 appels de dessin par image sur téléphone.
- Textes du HUD : chaque texte est rendu une fois en petite image (de 0,3 à 0,6 ms par image à 0,01 ms).
- Ceps : rangés sur une planche unique (atlas), préparés en tâche de fond dès le briefing.
- Plus aucune allocation mémoire par image (fini les à-coups du ramasse-miettes sur téléphone).
- Rien n'est calculé derrière les écrans opaques (briefing, pause, fin) : économie de batterie.
- Musique non programmée quand le son est coupé.
- Polices Poppins : 3 graisses chargées au lieu de 5.
- Build minifié avec esbuild (dépendance de développement).
- Code mort retiré (alias, variables et caches inutilisés).

**Vérifié** : rendu identique sur captures (ordinateur, téléphone portrait et paysage, tablette), aucune erreur console, gestes et boutons OK, équilibrage inchangé (robot).

## 21/11/2026 · Retour de Teddy : les ennemis arrivent de trop loin

**Fait** : apparition à 32 m devant le vigneron au lieu de 56 m (environ 3 s pour réagir au lieu de 5,5 s), petite animation d'apparition, tutoriel recalé sur la distance d'arrivée.

**Test (robot, réaction humaine 0,25 s, saut anticipé, 6 parties par case)**
| Mission | Avant, joueur attentif / moyen | Après, joueur attentif / moyen |
|---|---|---|
| 1 | 6/6, 6/6 (0 coup) | 6/6, 6/6 (0 à 1 coup) |
| 2 | 6/6, 6/6 | 5/6, 4/6 (3 à 4 coups) |
| 3 | 6/6, 6/6 | 5/6, 6/6 (étoiles de retard proches de 4) |
| 4 | 6/6, 2/6 | 4/6, 3/6 |

Verdict : avant, trop facile, ce qui confirme le ressenti de Teddy. Après, la mission 1 reste un tutoriel, puis ça se tend en restant gagnable.

## 21/11/2026 · Vigneron ou vigneronne

**Demande de Teddy** : pouvoir choisir vigneron ou vigneronne, plus inclusif.

**Fait** : deux vignettes sur l'écran d'accueil, choix mémorisé d'une partie à l'autre, personnage changé aussi dans le tracteur. La vigneronne a la même tenue, avec une queue de cheval auburn qui sort de la casquette. Textes accordés : accroche « Vigneron ou vigneronne, quatre obligations... », description et aperçu de partage, libellé d'accessibilité de l'écran, texte de partage devenu neutre (« la paperasse des vignes »), avec « douanes, fisc » mis à jour au passage.

**Vérifié** : sélection, mémorisation après rechargement, partie avec la vigneronne, ordinateur, tablette et téléphone, aucune erreur.

## 21/11/2026 · Retour de Teddy : la règle des étoiles est trop dure

Constat de Teddy : on perd quand des obligations passent, alors qu'on ne peut pas toutes les attraper.

Mesure avant changement (bot qui ne vise que les obligations à un rang d'écart au plus, comme un joueur humain, 8 parties par ligne) : 0 à 3 victoires sur 8 selon la mission, presque toutes perdues par les étoiles, mission 1 comprise.

Nouvelle règle :
- 5 étoiles ne font plus perdre la partie. C'est un « contrôle » : une grappe de sérénité en moins, et les étoiles repartent à zéro.
- Les étoiles redescendent plus vite : une de moins toutes les 3 éliminations (au lieu de 5) ou après 6 s sans faute (au lieu de 9).
- On ne perd plus que quand la sérénité tombe à zéro (chocs ou contrôles).

Mesure après changement (bot, 8 parties par ligne) :

| Mission | Bot « 1 rang », réflexes bons | Bot « 1 rang », distrait | Contrôles par partie |
|---|---|---|---|
| 1 | 8/8 | 8/8 | 1,1 |
| 2 | 7/8 | 7/8 | 1 à 1,4 |
| 3 | 8/8 | 7/8 | 0,4 à 0,9 |
| 4 | 8/8 | 3/8 | 0,5 à 0,9 |

Le bot qui chasse tout garde les mêmes résultats qu'avant (il perd surtout par les chocs). La mission 4 reste la plus dure, c'est voulu.

Corrigés au passage (défauts d'affichage vus en testant) : sous-titres qui débordaient de l'écran sur téléphone en portrait, et texte sous les bandeaux (BOSS, CONTRÔLE, etc.) peu lisible sur les vignes, maintenant entouré d'un contour sombre.

## 21/11/2026 · Mise en ligne publique sur GitHub Pages

Choix de Teddy : GitHub Pages. Dépôt renommé `a-vous-de-jouer` (l'ancien nom `-vous-de-jouer` avait perdu le « À »), public.

- Adresse : https://professeurt.github.io/a-vous-de-jouer/ (branche `main`, racine). Chaque push sur `main` met à jour le jeu en ligne.
- `PUBLIC_URL` renseignée : le bouton de partage met ce lien dans le texte, y compris depuis l'Artifact.
- Aperçu de partage : balises Open Graph et Twitter (titre, description, image `og.jpg` 1200 x 630, adresse canonique).
- `.nojekyll` : pas de traitement Jekyll, les fichiers sont servis tels quels.

## 21/11/2026 · Arbitrages de Teddy : plateforme agréée et TVA

Les deux écarts signalés plus haut sont tranchés par Teddy :
- **Plateforme agréée** : Vitisoft est connecté à la plateforme agréée Pennylane pour la facture électronique (« c'est certain »). La FAQ de vitisoft.fr (« se connecte aux PA ») est donc juste. C'est cohérent avec `REGLES_COPIE_EMAILS.md` (section 5) : Vitisoft produit la facture, Pennylane la transporte. Pennylane annonce son immatriculation définitive comme plateforme agréée en décembre 2025 (fiche pennylane.com « liste des PDP », non recoupée avec la liste officielle de la DGFiP).
- **TVA mensuelle** : validée par Teddy, parce que la TVA part dans le journal des ventes sur tous les logiciels comptables. La pub Meta peut garder « Valider la TVA mensuelle ».

Textes du jeu mis à jour (mission 3) : consigne de mission (« transmises par Pennylane, plateforme agréée », « votre journal des ventes, TVA comprise, part tout seul dans le logiciel de votre comptable »), indice en jeu sur la TVA, SMS du cabinet. Pas de « TVA du mois » dans le jeu : la fiche de mission rappelle que le régime simplifié agricole, c'est une déclaration par an et quatre acomptes.

## 21/11/2026 · Retour de Teddy : sauter les barrières, ou passer par le trou

Demande : pouvoir sauter par-dessus les barrières NORME, tout en gardant le trou comme autre passage.

- La barrière est plus basse (18 px au lieu de 24, soit 0,9 m au lieu de 1,25 m). Le saut (1,26 m au plus haut) la franchit s'il est bien placé.
- Franchie si le joueur est à plus de 85 % de sa hauteur au contact, comme les dossiers au sol. Le saut doit partir entre 0,15 et 0,55 s environ avant la barrière (fenêtre un peu plus courte que pour un dossier). Le trou reste le choix sûr.
- Bonus de 150 € et « PAR-DESSUS ! » à l'écran quand on la saute. Le tracteur la casse toujours.
- Textes : aide (« Sautez par-dessus (bonus) ou passez par le trou ») et indice de la mission 2.

Test par robot (8 à 15 barrières par cas) : saut précis 100 % franchies, saut approximatif 75 %, trop tôt 13 %, trop tard 0 %. L'équilibre des missions ne change pas pour un joueur qui prend le trou.

## 26/11/2026 · Noms des méchants alignés sur le rollup de Teddy

Demande : changer le nom des méchants, comme sur le rollup (« 4 missions, 3 armes » : la DGCCRF, les douanes, le fisc, la DRAAF ; boss final : la paperasse).

- Missions : « L'étiquette » devient « La DGCCRF », « Le registre phyto » devient « La DRAAF ». Les douanes et le fisc ne changent pas. La date et la fiche de chaque mission ne changent pas : elles expliquent toujours l'obligation.
- Boss : la DGCCRF (au lieu de l'étiquette géante), les douanes (au lieu du tampon GAMMA 2), le fisc (au lieu de la pile de factures). La paperasse reste le boss de la mission 4, annoncée « BOSS FINAL ».
- Inchangés : noms des petits ennemis (étiquette, DRM, DAE, TVA, carnet...), texte de partage et description de la page (« étiquetage, douanes, fisc, registre phyto »), image d'aperçu.

Vérifié : fiche de mission 1, HUD et bandeau du boss final (navigateur, 390 x 844), aucune erreur console.

## 26/11/2026 · Retour de Teddy : outil choisi tout seul partout

Demande : « sur PC ou tablette ou partout, rends la sélection des armes automatique partout, c'est pas jouable sinon ».

- L'outil se choisit tout seul selon la couleur de l'ennemi visé sur ordinateur, tablette et téléphone (avant : téléphone seulement). Le joueur ne gère plus que le rang, le saut et le bureau.
- Retirés : boutons VITICODE, VITISOFT, REGISTRE de la tablette (il reste LE BUREAU et SAUT), touches 1 2 3, E et Tab, gâchettes de la manette.
- Textes mis à jour : écran Commandes, consignes des missions 2 et 4, indices « NOUVEAU : VITISOFT / REGISTRE PHYTO, CHOISI TOUT SEUL », tableau des commandes de la mission 1. Retiré : l'indice « IL FAUT ... : TOUCHE 1 » (il affichait aussi « BOUTON ... » sur téléphone, où il n'y a pas de bouton). « PAS LE BON OUTIL » reste quand un tir déjà parti touche un ennemi d'une autre couleur.

Vérifié (navigateur) : ordinateur 1280 x 800, robot sur la mission 4, les 3 outils servent, 99 contrôles « l'outil est celui de l'ennemi du rang » sur 99 ; tablette paysage 1024 x 768 et portrait 768 x 1024, boutons bien alignés ; téléphone 390 x 844 ; aucune erreur, y compris en appuyant sur 2.

## 26/11/2026 · Version téléphone plus fluide et optimisée

Demande de Teddy : « améliorer le jeu en version mobile afin qu'il soit plus lissé, et optimisé à fond ».

**Diagnostic** (téléphone simulé 390 x 844, densité 3, processeur ralenti x 4)
- Cadence : la simulation tournait par pas fixes de 1/60 s, sans lien avec l'écran. Sur un écran à 90 Hz, une image sur trois était figée ; à 120 Hz, une sur deux. Même à 60 Hz, quelques images doublées.
- Pixels : l'image de 224 pixels était agrandie de 5,22 fois. Un pixel du jeu faisait 5 ou 6 pixels de l'écran (49 sur 187 à 6), d'où une image qui « tremble » en défilant.
- Près de l'horizon, les bandes du sol devenaient plus fines qu'un pixel et scintillaient.
- Coût d'une image : 3,0 ms (sol 51 %, ceps 33 %, la simulation elle-même 2 %). Le score fabriquait une nouvelle petite image à chaque changement.

**Fait**
- Boucle : un pas de simulation par image affichée, de sa durée réelle. Irrégularité du défilement : 0,2 à 0,4 % à 60, 90 et 120 Hz (avant : 9 %, 71 %, 100 %).
- Saut calculé d'après le temps écoulé : exactement la trajectoire d'avant à 60 images/s (écart 5e-15 m), la même à toutes les cadences. Fumée du tracteur et explosions du boss proportionnelles au temps.
- Téléphone : échelle entière. La taille interne s'ajuste (234 x 506 sur iPhone 390 x 844, 216 x 480 sur Android 360 x 800, 506 x 234 en paysage), l'écran du jeu est calé pile sur les pixels physiques. Vérifié par mesure des aplats sur capture en pleine résolution : uniquement des multiples de 5 (ou 4, ou 6). Écran inhabituel (densité 1) : ancien calcul.
- Tablette et ordinateur : échelle entière aussi quand l'écran du jeu y perd au plus 12 % de sa taille (ordinateur 1280 x 800 densité 2 : 768 x 672 au lieu de 832 x 728 ; tablette 1024 x 768 : 512 x 448).
- Lignes de balayage alignées sur les lignes de pixels du jeu (plus de moiré).
- Sol : bandes fondues dans leur couleur moyenne là où elles font moins de 2 pixels (plus de scintillement à l'horizon).
- Score collé chiffre par chiffre depuis le cache ; sol envoyé en premier ; décor construit une seule fois au démarrage sur téléphone.

**Vérifié** : téléphone portrait et paysage, Android densité 2,625, tablette, ordinateur (captures, aucune erreur) ; coût 3,1 ms par image pour 9 % de pixels en plus ; mission 1 gagnée par un robot sur écran simulé à 60, 90 et 120 Hz.

**Pas testable ici** : un vrai téléphone (Safari iOS, Chrome Android). À essayer sur le téléphone de Teddy avant de pousser.
