# 🏝 dsh-animal-island-ui

An **Animal Crossing / animal-island-ui themed reskin** for the DeepSeek Harness
web GUI (`dsh web`). It makes the DSH web shell look and feel like the
[`animal-island-ui`](https://github.com/guokaigdg/animal-island-ui) component
library — warm parchment backgrounds, earth-brown text, mint-teal primary,
50px pill controls, 3D "game-button" depth, Nunito + Noto Sans SC, and
yellow/gold focus rings (never cold blue).

It is a self-contained **DSH client UI plugin** ("theme plugin"). It needs no
third-party skin runtime and applies automatically once enabled — no reload of
the plugin, no manual skin picker.

> Design source: <https://github.com/guokaigdg/animal-island-ui> (CC BY-NC 4.0).
> This plugin re-implements the *visual style* as CSS variables / rules against
> the DSH shell token system; it does not bundle or depend on the library.

---

## How it works

A DSH client plugin has a **server half** (`lib/index.js`, a Cordis plugin) and
a **browser half** (`lib/client.js`, a `window.__ModuleLoader__.load({ id,
factory })` bundle exporting `{ apply, inject }`).

`apply(ctx)` skins the page in two layers, both torn down by one `ctx.effect`:

| Layer | Mechanism | What it covers |
| --- | --- | --- |
| **L1 — tokens** | `ctx.theme.overrideTokens('dsh-animal-island-ui', { … })` | `--dsw-alias-*` background/border/brand/label/button/status/markdown/scrollbar tokens, `--dsw-specific-*` surface tokens (sidebar, menu, selector, input-major, bubble) and `--dsw-font-*` typography, mapped to the animal-island-ui palette (86 `{light, dark}` pairs). The host ThemePresenter writes the folded tokens as inline vars on `<body>`, so the palette re-skins anywhere the shell consumes those tokens. |
| **L2 — components** | an injected `<style>` tag (`data-plugin-css="dsh-animal-island-ui/skin.css"`) | Shapes the shell's **actual widgets**: Nunito/Noto Sans SC `@font-face` (Google Fonts, with system fallback), 50px pill radius on buttons/inputs, 3D game-button depth on the primary/send action, rounded parchment composer card with the dot pattern, mint active-tab indicator, pill tabs/tags/badges, warm scrollbar/selection and yellow/mint focus rings — the parts the token system can't reach. |

- `inject = ['theme']` — the bundle gates on the `theme` service
  (`@deepseek-ai/dsh-client-ui-theme`), which ships in the base web bundle.
- If `overrideTokens` is unavailable/throws, it falls back to writing the light
  palette directly onto `document.body`.
- Because overrides carry **both** `light` and `dark` values, the skin stays
  legible when the user switches color schemes (dark mode uses a warm
  "dark-forest brown" palette).

## Files

```
dsh-animal-island-ui/
├── package.json          # dsh.bundle.patch → cordis.patch.yml; dsh.client.{inject,platform}; ./client export
├── cordis.patch.yml      # inserts the profile-registered plugin row
├── lib/
│   ├── index.js          # server half — a minimal Cordis plugin (no-op): makes the bundle row valid
│   └── client.js         # browser half — the module-loader bundle that applies the skin
├── src/
│   ├── client/index.ts   # source for the client bundle (export apply + inject + TOKEN_OVERRIDES)
│   ├── client/skin.css   # the L2 component stylesheet (inlined into lib/client.js at build)
│   └── env.d.ts          # ambient `*.css?raw` declaration for rebuilding
├── tsdown.config.ts      # bundles src/client/index.ts into the module-loader wrapper (lib/client.js)
├── tsconfig.json
└── verif/
    ├── smoke.mjs         # Node smoke test of the browser bundle (no server needed)
    └── finalize.mjs      # renames tsdown's lib/client.cjs → lib/client.js (run by `npm run build`)
```

## Install & enable

### Option A — `dsh plugin add` (standard path)

```bash
# from the profile-owner machine:
dsh plugin --profile web add /path/to/dsh-animal-island-ui
```

This installs the package and reconciles `dsh.profile.bundles`. On Windows with
the plugin on a *different drive* than the profile, pnpm's absolute-path
`link:` spec can produce a malformed junction; if so, use Option B.

### Option B — manual (Windows cross-drive fallback)

```bash
# 1. register the bundle (profile package.json -> dsh.profile.bundles): add "dsh-animal-island-ui"
# 2. copy the package into the profile's node_modules
cp -R /path/to/dsh-animal-island-ui  "$DSH_HOME/profiles/web/node_modules/dsh-animal-island-ui"
```

Either way the bundle is now in the profile plugin roster **enabled by
default** (the row `{ id: animal-island-ui, name: dsh-animal-island-ui }` has no
`disabled` flag in the composed config).

### Enable / disable manually

In `$DSH_HOME/profiles/web/cordis.patch.yml`, add a row to disable it:

```yaml
- id: animal-island-ui
  name: dsh-animal-island-ui
  disabled: true
```

### Restart the web app

New bundles are read by the server at boot. Restart the `dsh web` process (or
re-run `dsh --profile web`) so the profile reloads and the browser picks up the
fresh client bundle, then hard-refresh `http://127.0.0.1:3080`.

## Verify

- **Composed config** (the plugin row appears, enabled):
  ```bash
  dsh --profile web --dump-config | grep -A2 'animal-island-ui'
  ```
- **Browser bundle smoke test** (no server — mocks the loader + DOM):
  ```bash
  node verif/smoke.mjs
  ```
- **In the GUI**: the background goes warm parchment, accent controls turn mint
  teal, buttons become 50px pills with a 3D "press" shadow, the font becomes
  Nunito/Noto Sans SC, and focus rings are yellow.

## Customising

- **Palette** — edit `TOKEN_OVERRIDES` in `src/client/index.ts` (light + dark).
- **Shapes / shadows / fonts / component widgets** — edit `src/client/skin.css`.
- **Rebuild** `lib/client.js` from source (`tsdown` + `finalize`):
  ```bash
  pnpm install    # bring in the dsh client devDeps (or `npm install -D tsdown typescript`)
  pnpm run build
  ```
  The build type-checks, bundles `src/client/index.ts` (inlining `skin.css`) and
  wraps it in the `window.__ModuleLoader__.load({ id, factory })` loader shape.

## License

MIT. This project restyles the DSH web shell using the *visual style* of
`animal-island-ui` (CC BY-NC 4.0, non-commercial). It contains no Nintendo
assets or the animal-island-ui library itself.
