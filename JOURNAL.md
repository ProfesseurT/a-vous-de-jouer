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
