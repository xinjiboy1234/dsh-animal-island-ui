# 🏝️ dsh-animal-island-ui

**动物小岛 (Animal Island)** — an Animal-Crossing-flavoured **skin** for the
dsh web GUI, rebuilt to the **dsh-web v2 skin-center convention** (the skin
plugin development spec of the [dsh-web](https://github.com/zhu1090093659/dsh-web)
project, `dev` branch).

> 交互遵循 dsh 当前 UI 规范，仅做外观呈现；皮肤仍为 **animal-island** 主题，
> 图标/字体资源按原库复刻打包。设计源：
> [guokaigdg/animal-island-ui](https://github.com/guokaigdg/animal-island-ui)
> (CC BY-NC 4.0)。本皮肤重新实现其视觉语言并内联其字体/图标资产，不依赖该库。

## What it looks like

Warm parchment canvas · earth-brown ink (never pure black/cold gray) ·
mint-teal `#19c8b9` primary · 50px pill controls · a 3D "game-button" press
on the primary/send action · Nunito latin type (system CJK fallback, fully
offline) · yellow focus rings (never cold blue). A dark "forest-night" warm
brown palette ships alongside.

## Repository layout (pure asset directory)

This repository **is** the skin — no `package.json`, no build step, per the
v2 convention a skin is a pure asset directory consumed by the **skin-center**
(the single loader).

```
dsh-animal-island-ui/            # skin dir → installs as <id>="animal-island"
├── skin.json                    # v2 manifest (skinManifestVersion: 2)
├── skin.css                     # L1 official --dsw-* token remap + @font-face
├── patches.css                  # L3 free-selector component patches (scoped
│                                #   under html[data-dsh-skin="animal-island"])
├── hooks.mjs                    # optional: leaf favicon (trusted facet)
├── assets/
│   ├── leaf-icon.png            # replicated from animal-island-ui
│   └── fonts/nunito-latin-*.woff2
├── preview/light.jpg|dark.jpg   # skin-center gallery screenshots
├── README.md / README.zh.md
└── NOTICE                       # asset attribution / CC BY-NC
```

## Install & use (Skin Center)

Installation follows the skin-center user-skin flow — **no plugin add, no
restart, no `cordis.patch.yml` rewrite**:

```sh
# 1. copy the skin directory into the harness home of the target dsh instance
cp -R dsh-animal-island-ui "$DSH_HOME/skins/animal-island"
# (do NOT nest: the skin.json must sit directly under skins/animal-island/)
```

Then open the GUI → 设置 → 皮肤中心 (Skin Center). The **动物小岛** card appears
in the catalog; *Try-on* previews it live, *Apply* persists it (also possible
to write `$DSH_HOME/skin-center-active.json` `{"active":"animal-island"}` and
reload). Switches are atomic in-page switches — the current UI's interactions
are untouched, only the look changes.

Remove with:

```sh
rm -rf "$DSH_HOME/skins/animal-island"
```

## Notes & requirements

- Requires a dsh web GUI that runs the **skin-center** bundle
  (`@linxin666/dsh-web-all` / `@linxin666/dsh-client-ui-skin-center`,
  or the dsh-web repo skin center) with **skin manifest v2** support.
- `skin.css` only remaps official `--dsw-*` tokens (light `:root`, dark
  `body[data-ds-dark-theme]`); `patches.css` is the disclosed L3 layer.
- `hooks.mjs` (leaf favicon) executes only for built-in / byte-verified
  installs; hand-dropped user skins keep the stock favicon (declarative parts
  still load).
- Verify (optional, needs the dsh-web repo): run that repo's
  `scripts/dsh-skin validate` + `pnpm skin-center:check` against this dir, and
  its market preview simulator with `?skin=animal-island`.

## Rebuilding previews

After editing the skin, re-shoot `preview/{light,dark}.jpg` against a running
dsh web instance with the skin applied (windowed capture, light & dark color
scheme) and commit them together with the change.

## License

Code (skin.json/css/patches/hooks) is MIT unless noted. Bundled visual assets
& the visual style are from `animal-island-ui` by guokaigdg — **CC BY-NC 4.0**
(non-commercial). See `NOTICE`.
