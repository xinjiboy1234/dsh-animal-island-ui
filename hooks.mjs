/**
 * animal-island (hooks.mjs) — trusted escape hatch of the v2 skin contract
 * (x-org.linxin666.skin-center/v1alpha1), reviewed and released together with
 * the skin. Importing this module executes nothing; apply() owns every DOM
 * write and registers its retraction through ctx.onCleanup.
 *
 * Scope today:
 *  - favicon: swap the browser-tab icon for the animal-island leaf mark
 *    (assets/leaf-icon.png, from animal-island-ui, CC BY-NC 4.0).
 *
 * Trust note: per the skin-center security model hooks run only for built-in
 * skins or byte-verified official-market installs. When this directory is
 * hand-dropped into $DSH_HOME/skins/<id> the hooks facet is refused and only
 * the declarative parts (skin.css / patches.css) load — the skin still works,
 * it simply keeps the stock favicon.
 */
export default function defineSkinHooks() {
  return {
    apply(ctx) {
      const favicon = document.createElement('link')
      favicon.rel = 'icon'
      favicon.type = 'image/png'
      favicon.href = `${ctx.assetBase}/assets/leaf-icon.png`
      document.head.append(favicon)
      ctx.onCleanup(() => favicon.remove())
    },
  }
}
