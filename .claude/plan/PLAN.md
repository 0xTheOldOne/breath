# Plan de refonte — breath

Audit réalisé le 2026-11-02. Plan **validé** par l'utilisateur (« OK pour tout »).

## Décisions validées

1. Tous les lots du plan sont validés, y compris les optionnels.
2. Phosphor : **tout** passer en Phosphor — les 3 icônes Material **et** les flèches du carrousel (SVG Bootstrap) **et** le hamburger (lignes CSS).
3. `durationInMinutes` : **oui**, ajouter l'arrêt automatique de la séance.

## Méthode de travail

- Un lot à la fois, dans l'ordre. Cocher les cases au fur et à mesure dans ce fichier.
- Après chaque lot : `npm run build`, puis test **Playwright MCP** (`.mcp.json`) sur `npm run serve` :
  ouvrir la page, lancer une technique, changer de technique (prev/next), ouvrir le menu, vérifier la console (0 erreur / warning Vue).
- Respecter `CLAUDE.md` : Options API, Vuex, i18n `en` + `fr`, pas de `watch` inutile, Less scoped, pas d'URL `/` absolue.
- **Ne jamais lancer `npm run deploy` ni push sans accord explicite.**

---

## Lot 0 — Prérequis (≈ 5 min)

- [x] `npm install` (constat : `node_modules` absent, toutes les deps UNMET)
  - effet de bord : `package-lock.json` réécrit (version 0.1.0 → 0.4.0 + deps de dev Babel) ; deps de prod inchangées (vue 3.2.45)
- [x] Ajouter `.playwright-mcp/` à `.gitignore` (sinon `npm run deploy` → `git add .` le publie)
- [x] Vérifier que les outils Playwright MCP sont disponibles dans la session (sinon : `/mcp` pour approuver le serveur)
- [x] Test Playwright de référence sur l'état actuel (captures + console) pour comparer ensuite
  - captures : `.playwright-mcp/lot0-0{1..4}-*.png` (accueil, séance en cours, next, menu)
  - console : 1 erreur `[vuex] unknown mutation type: setTechnique` (confirme Lot 1)
  - dérive du timer mesurée : 4,55 s comptées pour 5,00 s réelles (≈ −9 %, onglet actif)
  - prev/next : OK (wrap 0 → 6 OK, la séance s'arrête au changement) ; menu : OK

## Lot 1 — Bugs (≈ 45 min)

- [x] `src/store/index.js` : supprimer `initializeFromLocalStorage` (l.236-249) et son appel dans `App.vue:20` (`beforeCreate`)
  - constat : `state = JSON.parse(...)` réassigne un paramètre local (no-op) ; commit de `setTechnique`, mutation inexistante (erreur console Vuex en dev, pas de crash) ; vuex-persist restaure déjà l'état
- [x] Supprimer le code mort : `resetLocalStorage` (non appelé), state `breathTechnique` (jamais alimenté) et ses `mapState` dans `App.vue:54` et `BreathView.vue:33`
- [x] `src/components/Breather.vue` : timer `setTimeout` 10 ms chaîné (l.207-248) → `requestAnimationFrame` + delta `performance.now()`
  - constat : dérive cumulative, throttling en onglet inactif → chrono et rythme faux
- [x] `Breather.vue` : ne plus muter `step.current` sur la prop (objets du store, l.203 / l.223 / l.244) → progression dans le `data` du composant
- [x] `Breather.vue:64-68` : prop `technique` → `type: Object, required: true` sans `default` (un default objet doit être une factory)
- [x] `App.vue:48` : n'appliquer la locale navigateur que si `supportedLocalesInclude(...)` est vrai, sinon `en`
- [x] Imports inutilisés : `mapGetters` (App, BreathView, Breather, Menu, SoundSelector), `Plugin` et `DoughnutController` (`Breather.vue:54`) — vérifier dans `node_modules/vue-chartjs` que `Doughnut` enregistre bien `DoughnutController` lui-même avant de retirer l'import
- [x] `Breather.vue:193` `elapsed()` : remplacer `.slice(11, -1).substring(8, -1)` par un formatage lisible `HH:MM:SS`
- [x] `Breather.vue:5` : retirer l'attribut inutile `ticker-color="red"`

## Lot 2 — Phosphor icons (≈ 30 min)

- [x] `npm install @phosphor-icons/vue` (v2.2.1, peer `vue >=3.2.39` ; lockfile résout vue 3.2.45 → OK)
- [x] Vérifier dans `node_modules/@phosphor-icons/vue` les noms exacts des composants exportés et l'API des props (`size`, `weight`, …) — **ne rien supposer**
  - constat : props `weight` (thin|light|regular|bold|fill|duotone), `size` (défaut `1em`), `color` (défaut `currentColor`), `mirrored` ; tree-shaking OK (vendors +21 KiB, +4 KiB gzip)
- [x] Remplacer dans `Breather.vue` : `play_circle`, `stop_circle`, `device_reset` (→ `PhPlayCircle`, `PhStopCircle`, `PhArrowCounterClockwise`, weight `light`)
- [x] Remplacer dans `SoundSelector.vue` : `music_off` (→ `PhSpeakerSimpleSlash`, pas d’icône « music off » dans Phosphor ; composant non rendu, commenté dans `Menu.vue`)
- [x] Flèches du carrousel (`BreathView.vue:10-17`) : icônes Bootstrap `carousel-control-*-icon` → Phosphor (caret gauche/droite)
- [x] Hamburger (`Menu.vue:4-11`, lignes CSS) → Phosphor `PhList` / `PhX` dans un `<button aria-expanded>` (la checkbox et son `watch` disparaissent)
- [x] Les `<span v-on:click>` deviennent des `<button type="button">` avec `aria-label` traduit (`$t`)
- [x] Retirer le `<link>` Material Symbols de `public/index.html:21` et les styles `.material-symbols-outlined`

## Lot 3 — i18n et accessibilité (≈ 30 min)

- [x] Clés `en` + `fr` pour les textes en dur :
  - disclaimer `Menu.vue:27-28` (via `<i18n-t scope="global">` pour garder le lien Calm ; sans `scope="global"` → warning `[intlify] Not found parent scope` en mode legacy)
  - « Previous » / « Next » `BreathView.vue:12,16` (remplacés par les `aria-label` du Lot 2)
  - « Music » / « Sounds » / « Content » `SoundSelector.vue`
  - `aria-label` des nouveaux boutons (play, stop, reset, menu, prev, next)
- [x] `<html lang>` : mettre à jour `document.documentElement.lang` dans `App.vue` `setLocale`
- [x] `public/index.html` : retirer `user-scalable=no` et `maximum-scale=1.0` (bloque le zoom), metas obsolètes `X-UA-Compatible` et `ScreenOrientation`
- [x] `App.vue:83` : supprimer `overflow: hidden` sur `*` (garder sur `html, body` si nécessaire)
  - effet visible : le repère blanc (`.ticker:before`) n'est plus coupé à moitié → pastille ronde entière ; aucun scroll à 1241 px ni à 375 px
- [x] Supprimer les `watch` inutiles (règle 5) : (`checked` déjà retiré au Lot 2)
  - `technique` dans `Breather.vue:251` (prop statique)
  - `checked` dans `Menu.vue:70` (simple `console.log`, paramètres inversés)
- [x] `Menu.vue` : si une checkbox reste, lui donner un `id` + label ; sinon passer à un `<button>` avec `aria-expanded` (fait au Lot 2)
- [x] Nettoyer les `console.debug` / `console.log` de debug (App, store)
- [x] Ajouter `:key` sur les `v-for` (`BreathView.vue:4`, `Breather.vue:29`)
- [x] `npm run i18n:report` → 0 clé manquante (les « inutilisées » sont des faux positifs : clés dynamiques `sequences.<code>`, `messages.<type>`, ternaire `actions.open/closeMenu`)

## Lot 4 — Carrousel (≈ 30 min)

- [x] Confirmer avec Playwright le conflit suspecté (**non confirmé à ce stade**) : Bootstrap JS (`data-bs-slide`) et Vue (classe `active` liée) pilotent la même slide ; `<div>` wrapper autour de chaque `.carousel-item` (`BreathView.vue:4-6`)
  - **confirmé** (MutationObserver + `oldValue`) : au clic, Vue réécrit `className` et efface `carousel-item-next/start` posés par Bootstrap en < 1 ms → l’animation de glissement n’est jamais visible ; Bootstrap crée une instance `Carousel` à état redondant. Pas de désynchro visible, mais deux maîtres sur la même classe.
- [x] Si confirmé : navigation 100 % Vue (index du store), retirer `data-bs-*` ; évaluer le retrait du `<script>` Bootstrap JS de `index.html:13` s'il ne sert plus à rien
  - fait : `data-bs-*` et `carousel-dark` retirés, wrapper `<div>` supprimé (`v-for` directement sur `.carousel-item`), `<script>` Bootstrap JS retiré (seul usage : ce carrousel) ; Bootstrap CSS conservé
- [x] Le `Breather` actif doit s'arrêter au changement de technique (aujourd'hui via `watch breathTechniqueIndex`, l.254) — garder ce comportement, idéalement via une prop `active` passée par le parent
  - fait : prop `active` (Boolean) ; `watch active` → `stopTimer()` quand la slide est quittée (effet de bord réel, règle 5) ; `mapState(breathTechniqueIndex)` retiré de `Breather`

## Lot 5 — Dépendances (≈ 20 min)

- [x] `npm audit fix` **sans `--force`**
  - résultat prod : vue 3.2.45 → 3.5.44, vue-i18n 9.2.2 → 9.14.5 (+ @intlify/*), postcss 8.4.19 → 8.5.32, nanoid 3.3.4 → 3.3.20, flatted 3.2.7 → 3.4.4, source-map-js 1.0.2 → 1.2.2 ; Vue CLI 5.0.8 → 5.0.9 ; `package.json` inchangé (plages semver respectées)
  - audit après fix : prod 6 (2 low, 4 high), total 28 (3 low, 15 moderate, 10 high) — avant : prod 11, total 63
- [x] **Refuser** le « fix » de `vuex-persist` (rétrogradation vers 2.3.0)
  - restant : `deepmerge` (prototype poisoning) via `vuex-persist` — vecteur = contenu du localStorage de la même origine, non exploitable à distance ici
- [x] Constat audit (lockfile) : 13 vulnérabilités en prod (7 high : vue, vue-i18n, postcss, nanoid, flatted, source-map-js…), 66 au total, quasi tout le reste vient de Vue CLI 5 (dev, en fin de vie)
- [x] La faille vue-i18n (`escapeParameterHtml`) n'est pas exploitable ici (fonction non utilisée)
  - vérifié : aucun `escapeParameter`, `v-html` ni `srcdoc` dans `src/` ; les 2 advisories vue-i18n restants (GHSA-8rc2-428q-7ww3, GHSA-83rm-6c8r-g728) ne sont corrigés qu’en 11.x (hors plage `^9`)
- [x] Rebuild + test Playwright complet

## Lot 6 — Optionnels validés (≈ 1 à 2 h)

- [x] Arrêt automatique de la séance à `durationInMinutes` (champ présent sur chaque technique, lu nulle part aujourd'hui) — afficher la durée dans les badges de `Breather.vue` + clés i18n
  - fait : la séance s’arrête à la **première fin de cycle ≥ durée** (`computed sessionEndMs`, pas de souffle coupé, pile à la durée quand elle est multiple du cycle) ; `reset` après la durée relance un cycle complet ; badge `messages.duration` (« 5 min ») en + du badge de rythme
- [x] eslint + eslint-plugin-vue (le projet n'a aucun linter) — vérifier la compatibilité avec Vue CLI 5 avant d'installer
  - constat : `@vue/cli-plugin-eslint` 5 → `eslint-webpack-plugin` ^3 (eslintrc legacy) ; ESLint 9 en fin de maintenance → choix : **ESLint 10 autonome** (`eslint.config.mjs`, `@eslint/js` + `eslint-plugin-vue` `flat/essential` + `globals`), non branché sur le build ; script `npm run lint` ; Node ≥ 20.19 requis
  - 6 erreurs initiales : 1 corrigée (`no-useless-assignment` dans `scale()`), `SoundSelector` gardé avec un `eslint-disable-next-line` (bloc commenté dans le template), `multi-word-component-names` / `no-reserved-component-names` désactivées (renommer `Menu` / `Breather` = refactor séparé) → 0 erreur
- [x] Déploiement via GitHub Actions au lieu de `npm run deploy` (`git add .` stage tout le working tree) — **proposer le workflow, ne rien pousser sans accord**
  - proposé : `.github/workflows/deploy.yml` (checkout@v7, setup-node@v7 Node 24, `npm ci` + lint + build, configure-pages@v6, upload-pages-artifact@v5 `dist`, deploy-pages@v5 — tags et inputs vérifiés via l’API GitHub) ; déclenchement **manuel uniquement** (`workflow_dispatch`) ; prérequis : Settings > Pages > Source = « GitHub Actions » ; rien poussé, `npm run deploy` inchangé

---

## Journal

<!-- Ajouter ici une ligne par lot terminé : date, lot, résultat du test Playwright. -->

- 2026-11-02 — Lot 0 — build OK ; Playwright OK (page, séance, prev/next, menu) ; console : 1 erreur Vuex `setTechnique` (connue, Lot 1) ; dérive timer ≈ −9 %.
- 2026-11-02 — Lot 1 — build OK ; Playwright OK : console 0 erreur / 0 warning ; dérive 5 038 ms pour 5 028 ms réels ; enchaînement inhale/hold/exhale conforme (relax, energy) ; reset garde le chrono, stop le remet à 0 ; prev/next arrête la séance ; locale `de-DE` → `en`. Limite connue : onglet caché → rAF en pause, le chrono reste juste mais le cycle saute au retour.
- 2026-11-02 — Lot 2 — build OK ; Playwright OK : 8 icônes Phosphor rendues (play/stop/reset, carets, menu liste/croix), boutons accessibles par nom (`Démarrer`, `Arrêter`, `Recommencer le cycle`, `Technique précédente/suivante`, `Ouvrir/Fermer le menu`), `aria-expanded` bascule ; console 0 erreur / 0 warning.
- 2026-11-02 — Lot 3 — build OK ; i18n:report 0 manquante ; Playwright OK : `<html lang>` suit la locale (fr/en), disclaimer traduit avec lien Calm, labels en/fr, viewport zoomable, aucun scroll desktop/mobile, prev/next arrête la séance ; console 0 erreur / 0 warning.
- 2026-11-02 — Lot 4 — build OK ; Playwright OK : `window.bootstrap` absent, slide active = index du store après clics simples, 3 clics rapides, wrap 0↔6 ; la séance s’arrête au changement ; menu OK ; console 0 erreur / 0 warning.
- 2026-11-02 — Lot 5 — build OK (mêmes warnings de taille webpack qu’au Lot 0 ; vendors 384 KiB / 127 KiB gzip) ; Playwright OK sur Vue 3.5.44 : séance, dérive 3 003 ms / 3 001 ms, reset/stop, prev/next + wrap, menu ; console 0 erreur / 0 warning.
- 2026-11-02 — Lot 6 — build OK ; lint 0 erreur ; Playwright OK : arrêt auto « relax » à 300 000 ms (fin d’expiration, 1198/1200) et « focus » à 128 000 ms (1re fin de cycle après 120 s) ; reset après la durée → +1 cycle (16 000 ms), badges « 5 min » / « 2 min », energy inspir. ventre → poitrine → expir. conforme, prev/next, menu ; console 0 erreur / 0 warning.
