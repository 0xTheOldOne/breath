# breath — Claude Code Instructions

## Project identity

**breath** is a small Vue 3 web app to practice guided deep breathing (inspired by Calm). Deployed on GitHub Pages under `/breath/`.

| Directory / file         | Content                                                        |
| ------------------------ | -------------------------------------------------------------- |
| `src/components/`        | `Breather.vue` (timer + Chart.js doughnut), `Menu.vue`, `SoundSelector.vue` |
| `src/views/`             | `BreathView.vue` (single route `/`)                            |
| `src/store/index.js`     | Vuex store: breathing techniques, colors, persisted settings   |
| `src/locales/`           | `en.json`, `fr.json` + `helper.js` (supported locales)         |
| `src/assets/`            | Background image, sounds, `style/variables.less`               |
| `public/index.html`      | Bootstrap 5, Google Fonts and Material Symbols loaded from CDN |
| `dist/`                  | Build output, **committed** and pushed to `gh-pages`           |

## Technical stack

| Component        | Technology                                         |
| ---------------- | -------------------------------------------------- |
| Framework        | Vue 3 (Options API), JavaScript                    |
| Build            | Vue CLI 5 (`vue-cli-service`)                       |
| State            | Vuex 4 + `vuex-persist` (localStorage, key `store`) |
| Routing          | Vue Router 4, hash history                          |
| i18n             | vue-i18n 9 (`en` default, `fr`)                     |
| Charts           | Chart.js 3 + vue-chartjs 4                          |
| CSS              | Less (scoped in SFCs) + Bootstrap 5.2 via CDN       |
| Icons            | Google Material Symbols Outlined (CDN)              |

No test suite. Lint: ESLint 10 standalone (`eslint.config.mjs`, `@eslint/js` + `eslint-plugin-vue` `flat/essential`), not wired into the Vue CLI build.

## Commands

```bash
npm run serve        # dev server
npm run build        # production build into dist/
npm run lint         # ESLint
npm run i18n:report  # missing/unused translation keys
```

## Universal behaviors

- **No hallucinations / verified facts only** — never invent an API, option, npm package, CLI flag, path or version. When in doubt, verify (repo code, `node_modules`, official docs) or say "à vérifier".
- Distinguish facts (observed in the code) from interpretations and assumptions.
- Reference concrete file paths and component/method names when asserting things about the code.
- Always validate a plan before implementing. Do not modify code before asking for validation.
- **Concise comments**: function header ≤ 2 lines, intra-function ≤ 1 line; document the non-obvious *why*, never paraphrase code.
- Code, comments and commit messages are in **English** (match existing code). Conversations are in French.
- **Commits**: never add a `Co-Authored-By:` line in commit messages, in any form.
- Do not create a summary README for a technical change unless explicitly asked.

## Absolute rules

1. **Vue Options API only**: never use the Composition API (`setup()`, `ref`, `reactive`). JavaScript only, no TypeScript.
2. **Vuex only**: no Pinia. Persisted fields are whitelisted in the `vuexLocal` reducer (`src/store/index.js`) — add a field there if it must survive a reload.
3. **Every user-facing string goes through i18n** (`$t(...)`), with the key added to **both** `en.json` and `fr.json`.
4. **Breathing techniques** live in `state.breathTechniques`: each has a `code` (also its i18n key under `sequences.<code>`), `durationInMinutes`, `advanced`, and a `sequence` of steps `{ type: inhale|hold|exhale, detail, color, duration }`. Reuse the `colors` constant for step colors.
5. **Avoid unnecessary `watch`**: do not copy a static prop into `data` — use the prop or a computed; reserve `watch` for real side effects.
6. **Styles**: Less, `scoped` in components; shared values in `src/assets/style/variables.less`. Use Bootstrap utility classes already loaded from the CDN rather than adding a CSS dependency.
7. **Asset paths**: `publicPath` is `/breath/` in production (`vue.config.js`) — never hardcode absolute `/` URLs.

## Deploy — outward-facing, ask first

`npm run deploy` runs `build`, then `git add . && git commit -m "deploy"`, `git push origin`, and `git subtree push --prefix dist origin gh-pages`. It stages **every** working-tree change and publishes. **Never run it, nor push, without explicit approval.**
