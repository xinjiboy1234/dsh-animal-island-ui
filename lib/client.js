/**
 * dsh-animal-island-ui — browser half (built bundle).
 *
 * A DSH client module-loader bundle: `window.__ModuleLoader__.load({ id, factory })`
 * exporting `{ apply, inject }`. The loader gates activation on `inject`, then
 * calls `apply(ctx)` with the client Cordis context.
 *
 * The reskin is two layers, both torn down by the `ctx.effect` cleanup:
 *   L1  `ctx.theme.overrideTokens()` — auto-active `--dsw-*` token layer mapped
 *       from the animal-island-ui palette.
 *   L2  an injected <style> shaping the shell's real widgets (see skin.css).
 *
 * Source: src/client/index.ts + src/client/skin.css (see `npm run build`).
 */

window.__ModuleLoader__.load({
  id: 'dsh-animal-island-ui',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;

Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0raw:1
var _raw_1_default = "/* ============================================================================\n * dsh-animal-island-ui — Animal Crossing / animal-island-ui themed skin.\n *\n * Design language (from guokaigdg/animal-island-ui):\n *   warm parchment bg  #f8f8f0 / #f7f3df\n *   earth-brown text   #794f27 (never pure black / cold gray)\n *   mint-teal primary  #19c8b9\n *   pill controls      50px radius on buttons/inputs; cards 20px (no box-shadow)\n *   3D game-button     box-shadow 0 5px 0 0 #bdaea0 (hover lift / active press)\n *   fonts              Nunito + Noto Sans SC (weight >= 500)\n *   motion             cubic-bezier(0.4, 0, 0.2, 1), 0.15–0.35s\n *   focus              #ffcc00 (inputs) / #19c8b9 (buttons) — never blue\n *\n * Color/font tokens ride the official --dsw-* token system (applied by the\n * host's ThemePresenter as inline vars on <body>) — see index.ts. That layer\n * already landed and is what warms the palette everywhere.\n *\n * THIS file is the COMPONENT layer. The shell styles its components with CSS\n * Modules, emitting class names of the form `{buildHash}_{semanticSuffix}`\n * (e.g. `uV2eYG_primary`). The hash changes between host rebuilds but the\n * suffix is fixed, so we target with `[class*=\"_suffix\"]`, scoped under `#root`.\n *\n * SCOPE DISCIPLINE (learned the hard way): the shell already lays out and sizes\n * every widget. We only re-surface it — we must NOT restyle the geometry of\n * small/dense controls (rows, icon buttons, model entries, switches) or apply\n * the \"card\" treatment to input surfaces. Over-broad rule = broken UI.\n *\n * VALUES: literal hex constants (not custom --animal-* props, which a late\n * `:root {}` block may drop at parse time, turning `var(--animal-*)` empty and\n * making filled controls transparent).\n *\n * Injected as a <style> tag and cleaned up on unload.\n * ========================================================================== */\n\n/* Rounded Latin/Chinese typefaces (fall back to system fonts when offline). */\n@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&family=Noto+Sans+SC:wght@400;500;700&display=swap');\n\n/* ---------------------------------------------------------------------------\n * 0. Page + typography.\n * ------------------------------------------------------------------------- */\nhtml,\nbody,\n#root {\n  background-color: #f8f8f0;\n}\n#root {\n  font-family: 'Nunito', 'Noto Sans SC', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;\n  font-weight: 500;\n  letter-spacing: 0.01em;\n}\n#root h1,\n#root h2,\n#root h3,\n#root h4,\n#root h5,\n#root h6,\n#root button,\n#root [role='button'],\n#root [class*='_headlineText'],\n#root [class*='_brandName'] {\n  font-weight: 700;\n  letter-spacing: 0.02em;\n}\n\n/* ---------------------------------------------------------------------------\n * 1. Standard text inputs / textarea → pill, warm input surface, mint focus.\n *    (Kept to the big composer + search; small settings fields keep their own\n *    compact radius so they don't turn into weird tall pills.)\n * ------------------------------------------------------------------------- */\n#root [data-slot='conversation.composer.bar'] textarea,\n#root [data-slot='conversation.composer.bar'] input,\n#root [data-slot='sidebar.workspaces'] input[type='text'] {\n  border-radius: 50px;\n  background-color: #fffbe7;\n}\n#root input:focus-visible,\n#root textarea:focus-visible,\n#root select:focus-visible,\n#root [contenteditable='true']:focus-visible {\n  outline: 2px solid #ffcc00 !important;\n  outline-offset: 2px !important;\n}\n#root button:focus-visible,\n#root [role='button']:focus-visible {\n  outline: 2px solid #19c8b9 !important;\n  outline-offset: 2px !important;\n}\n\n/* ---------------------------------------------------------------------------\n * 2. Composer card — a clean input surface, NOT a \"content card\".\n * ------------------------------------------------------------------------- */\n#root [data-slot='conversation.composer.bar'] [class*='_card'],\n#root [class*='_composerStack'] [class*='_card'] {\n  background-color: #fffbe7;\n  background-image: none;\n  border: 1px solid #c4b89e;\n  border-radius: 22px;\n  box-shadow: 0 4px 12px rgba(61, 52, 40, 0.08);\n}\n#root [data-slot='conversation.composer.bar'] [class*='_card'] [class*='_input'],\n#root [class*='_composerStack'] [class*='_card'] [class*='_input'] {\n  border-radius: 0;\n  caret-color: #19c8b9;\n}\n\n/* ---------------------------------------------------------------------------\n * 3. The send / primary action — mint with the 3D game-button depth.\n * ------------------------------------------------------------------------- */\n#root [class*='_primary'] {\n  background: #19c8b9 !important;\n  color: #ffffff !important;\n  box-shadow: 0 4px 0 0 #bdaea0;\n  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);\n}\n#root [class*='_primary']:hover:not(:disabled) {\n  background: #3dd4c6 !important;\n  transform: translateY(-1px);\n  box-shadow: 0 5px 0 0 #bdaea0;\n}\n#root [class*='_primary']:active:not(:disabled) {\n  transform: translateY(2px);\n  box-shadow: 0 1px 0 0 #bdaea0;\n}\n/* The + attachment button. */\n#root [class*='_add'] {\n  background: #e6f9f6;\n  color: #794f27;\n  border-radius: 50%;\n  box-shadow: none;\n}\n#root [class*='_add']:hover:not(:disabled) {\n  background: #19c8b9;\n  color: #ffffff;\n}\n\n/* ---------------------------------------------------------------------------\n * 4. Header / tabs — mint active indicator, pill hover. Never cold blue.\n * ------------------------------------------------------------------------- */\n#root [class*='_tab'] {\n  border-radius: 50px;\n}\n#root [class*='_tab']::after {\n  border-radius: 50px;\n}\n#root [class*='_crumb'] {\n  border-radius: 50px;\n}\n\n/* ---------------------------------------------------------------------------\n * 5. Content \"cards\" (sidebar cards, plugin/agent cards, panels) — warm surface\n *    and 20px radius, honestly sized. Use :where() so the shell's own per-card\n *    geometry and nested-card styles still win, and NO dot pattern / box-shadow\n *    that would make nested cards stack borders (\"卡片套卡片\").\n * ------------------------------------------------------------------------- */\n#root :where([class*='_card']) {\n  border: 1px solid #c4b89e;\n  background-color: rgb(247, 243, 223);\n  border-radius: 20px;\n}\n\n/* ---------------------------------------------------------------------------\n * 6. Sidebar — warm list rows.\n * ------------------------------------------------------------------------- */\n#root [data-slot='sidebar.workspaces'] [class*='_row'],\n#root [data-slot='sidebar.workspaces'] [class*='_item'] {\n  border-radius: 12px;\n}\n#root [data-slot='sidebar.workspaces'] [class*='_row']:hover,\n#root [data-slot='sidebar.workspaces'] [class*='_item']:hover {\n  background: #e6f9f6;\n}\n#root [data-slot='sidebar.workspaces'] [class*='_active'] {\n  background: #e6f9f6;\n  color: #794f27;\n}\n\n/* ---------------------------------------------------------------------------\n * 7. Appearance \"theme cube\" — selected state must be warm mint, not the\n *    default white + cold bluish border (the DSH `selected` token).\n * ------------------------------------------------------------------------- */\n#root [class*='_themeCube'] {\n  border-radius: 50px;\n}\n#root [class*='_themeCube'][class*='_selected'] {\n  background: #e6f9f6 !important;\n  border-color: #19c8b9 !important;\n  color: #0e6e64 !important;\n}\n#root [class*='_themeCube'][class*='_selected']:hover {\n  background: #d3f3ee !important;\n  border-color: #19c8b9 !important;\n}\n\n/* ---------------------------------------------------------------------------\n * 8. Switches / checkboxes (enable / disable) — warm, soft, on-palette.\n * ------------------------------------------------------------------------- */\n#root [class*='_switchTrack'],\n#root [role='switch'] {\n  background: #f0e8d8;\n}\n#root [role='switch'][aria-checked='true'],\n#root [data-state='checked'] {\n  background: #19c8b9;\n}\n#root input[type='checkbox'] {\n  accent-color: #19c8b9;\n}\n\n/* ---------------------------------------------------------------------------\n * 9. Warm scrollbars / selection / caret.\n * ------------------------------------------------------------------------- */\n#root,\n#root * {\n  scrollbar-width: thin;\n  scrollbar-color: #c4b89e #f0e8d8;\n}\n#root *::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n#root *::-webkit-scrollbar-track {\n  background: #f0e8d8;\n}\n#root *::-webkit-scrollbar-thumb {\n  background: #c4b89e;\n  border-radius: 10px;\n}\n#root *::-webkit-scrollbar-thumb:hover {\n  background: #a89878;\n}\n#root ::selection {\n  background: #e6f9f6;\n  color: #794f27;\n}\n#root [contenteditable='true'],\n#root textarea {\n  caret-color: #19c8b9;\n}\n\n/* ---------------------------------------------------------------------------\n * 10. Messages / markdown on-palette.\n * ------------------------------------------------------------------------- */\n#root pre,\n#root code {\n  border-radius: 12px;\n}\n#root [class*='_bubble'] {\n  border-radius: 18px;\n}\n#root [class*='_kindTag'],\n#root [class*='_badge'] {\n  border-radius: 999px;\n}\n";
//#endregion
//#region src/client/index.ts
/** Plugin identity (used for the token-layer source and the style tag id). */
const PLUGIN_ID = "dsh-animal-island-ui";
const STYLE_TAG_ID = `${PLUGIN_ID}/skin.css`;
/**
* Alias/font token overrides, keyed by `--dsw-*` variable name → `{ light, dark }`.
* Both modes are mandatory (the host picks the value for the active scheme), so
* the skin stays legible when the user switches light/dark.
*/
const TOKEN_OVERRIDES = {
	"--dsw-alias-bg-base": {
		light: "#f8f8f0",
		dark: "#2a231c"
	},
	"--dsw-alias-bg-layer-1": {
		light: "#f7f3df",
		dark: "#332b22"
	},
	"--dsw-alias-bg-layer-2": {
		light: "#f0e8d8",
		dark: "#3b3227"
	},
	"--dsw-alias-bg-mask-1": {
		light: "rgba(61,52,40,0.35)",
		dark: "rgba(0,0,0,0.5)"
	},
	"--dsw-alias-border-l1": {
		light: "#c4b89e",
		dark: "#4a4238"
	},
	"--dsw-alias-border-l2": {
		light: "#a89878",
		dark: "#5c5244"
	},
	"--dsw-alias-border-l3": {
		light: "#9f927d",
		dark: "#6b5f4e"
	},
	"--dsw-alias-border-l4": {
		light: "#8a7b66",
		dark: "#7a6c58"
	},
	"--dsw-alias-border-inverted": {
		light: "#f8f8f0",
		dark: "#2a231c"
	},
	"--dsw-alias-brand-primary": {
		light: "#19c8b9",
		dark: "#2fd6c4"
	},
	"--dsw-alias-button-primary-fill": {
		light: "#19c8b9",
		dark: "#2fd6c4"
	},
	"--dsw-alias-button-primary-hover": {
		light: "#3dd4c6",
		dark: "#4de2da"
	},
	"--dsw-alias-button-ghost-active-fill": {
		light: "#e6f9f6",
		dark: "rgba(47,214,196,0.12)"
	},
	"--dsw-alias-button-ghost-active-border": {
		light: "#19c8b9",
		dark: "#2fd6c4"
	},
	"--dsw-alias-button-tool-bar-fill": {
		light: "#f8f8f0",
		dark: "#332b22"
	},
	"--dsw-alias-button-tool-bar-hover": {
		light: "#e6f9f6",
		dark: "#3b3227"
	},
	"--dsw-alias-button-contrast-fill": {
		light: "#794f27",
		dark: "#1d1814"
	},
	"--dsw-alias-interactive-bg-hover": {
		light: "#e6f9f6",
		dark: "rgba(47,214,196,0.10)"
	},
	"--dsw-alias-interactive-bg-active": {
		light: "#b7c6e5",
		dark: "#2e463f"
	},
	"--dsw-alias-interactive-bg-hover-danger": {
		light: "#f7d0d0",
		dark: "rgba(224,90,90,0.18)"
	},
	"--dsw-alias-label-primary": {
		light: "#794f27",
		dark: "#f0e6d2"
	},
	"--dsw-alias-label-primary-foreground": {
		light: "#794f27",
		dark: "#2a231c"
	},
	"--dsw-alias-label-primary-inverted": {
		light: "#f8f8f0",
		dark: "#2a231c"
	},
	"--dsw-alias-label-secondary": {
		light: "#725d42",
		dark: "#d8cbb0"
	},
	"--dsw-alias-label-tertiary": {
		light: "#9f927d",
		dark: "#a89a82"
	},
	"--dsw-alias-label-caption": {
		light: "#8a7b66",
		dark: "#b3a38a"
	},
	"--dsw-alias-label-dimmed": {
		light: "#c4b89e",
		dark: "#6b5f4e"
	},
	"--dsw-alias-markdown-code-block": {
		light: "#f0e8d8",
		dark: "#3b3227"
	},
	"--dsw-alias-markdown-code-block-banner": {
		light: "#e6f9f6",
		dark: "rgba(47,214,196,0.12)"
	},
	"--dsw-alias-markdown-inline-code": {
		light: "rgba(25,200,185,0.12)",
		dark: "rgba(47,214,196,0.14)"
	},
	"--dsw-alias-scrollbar-bg-l2": {
		light: "#f0e8d8",
		dark: "#332b22"
	},
	"--dsw-alias-scrollbar-hover-l2": {
		light: "#c4b89e",
		dark: "#6b5f4e"
	},
	"--dsw-alias-state-business-primary": {
		light: "#19c8b9",
		dark: "#2fd6c4"
	},
	"--dsw-alias-state-business-tertiary": {
		light: "#e6f9f6",
		dark: "rgba(47,214,196,0.12)"
	},
	"--dsw-alias-state-error-primary": {
		light: "#e05a5a",
		dark: "#e87878"
	},
	"--dsw-alias-state-error-secondary": {
		light: "#f7d0d0",
		dark: "rgba(224,90,90,0.18)"
	},
	"--dsw-alias-state-success-primary": {
		light: "#6fba2c",
		dark: "#85cc45"
	},
	"--dsw-alias-state-success-secondary": {
		light: "#e6f4da",
		dark: "rgba(111,186,44,0.18)"
	},
	"--dsw-alias-state-success-tertiary": {
		light: "#f2f8ea",
		dark: "rgba(111,186,44,0.12)"
	},
	"--dsw-alias-state-warn-primary": {
		light: "#f5c31c",
		dark: "#f7d04a"
	},
	"--dsw-alias-state-warn-secondary": {
		light: "#fff3c4",
		dark: "rgba(245,195,28,0.18)"
	},
	"--dsw-alias-state-warn-tertiary": {
		light: "#fffbe0",
		dark: "rgba(245,195,28,0.12)"
	},
	"--dsw-alias-state-warn-label": {
		light: "#dba90e",
		dark: "#f7d04a"
	},
	"--dsw-alias-tooltip-bg": {
		light: "#794f27",
		dark: "#f0e6d2"
	},
	"--dsw-alias-toast-bg": {
		light: "#794f27",
		dark: "#f0e6d2"
	},
	"--dsw-alias-button-info-fill": {
		light: "#19c8b9",
		dark: "#2fd6c4"
	},
	"--dsw-alias-button-info-hover": {
		light: "#3dd4c6",
		dark: "#4de2da"
	},
	"--dsw-alias-button-elevated-fill": {
		light: "#fffbe7",
		dark: "#3b3227"
	},
	"--dsw-alias-button-floating-fill": {
		light: "#fffbe7",
		dark: "#332b22"
	},
	"--dsw-alias-button-floating-hover": {
		light: "#e6f9f6",
		dark: "#3b3227"
	},
	"--dsw-alias-button-tool-bar-fill-invisible": {
		light: "transparent",
		dark: "transparent"
	},
	"--dsw-specific-sidebar-fill": {
		light: "#f7f3df",
		dark: "#332b22"
	},
	"--dsw-specific-sidebar-nav-item-active": {
		light: "#b7c6e5",
		dark: "#2e463f"
	},
	"--dsw-specific-sidebar-nav-item-active-accent": {
		light: "#19c8b9",
		dark: "#2fd6c4"
	},
	"--dsw-specific-sidebar-nav-item-hover": {
		light: "#d6dff0",
		dark: "#3b3227"
	},
	"--dsw-specific-input-major": {
		light: "#fffbe7",
		dark: "#3b3227"
	},
	"--dsw-specific-menu": {
		light: "#fffbe7",
		dark: "#3b3227"
	},
	"--dsw-specific-selector": {
		light: "#f0e8d8",
		dark: "#3b3227"
	},
	"--dsw-specific-tip": {
		light: "#f0e8d8",
		dark: "#3b3227"
	},
	"--dsw-specific-bubble": {
		light: "#f7f3df",
		dark: "#3b3227"
	},
	"--dsw-specific-bubble-highlight": {
		light: "#e6f9f6",
		dark: "rgba(47,214,196,0.12)"
	},
	"--dsw-alias-bg-layer-3": {
		light: "#e6dcc4",
		dark: "#433a2e"
	},
	"--dsw-alias-bg-overlay": {
		light: "rgba(61,52,40,0.28)",
		dark: "rgba(0,0,0,0.55)"
	},
	"--dsw-alias-bg-skeleton": {
		light: "#f0e8d8",
		dark: "#433a2e"
	},
	"--dsw-alias-bg-module-platform": {
		light: "#e6f9f6",
		dark: "#2e463f"
	},
	"--dsw-alias-bg-multi-select": {
		light: "#fffbe7",
		dark: "#3b3227"
	},
	"--dsw-alias-fill-l2": {
		light: "#f0e8d8",
		dark: "#3b3227"
	},
	"--dsw-alias-border-inverted2": {
		light: "#f8f8f0",
		dark: "#2a231c"
	},
	"--dsw-alias-line-secondary": {
		light: "#c4b89e",
		dark: "#5c5244"
	},
	"--dsw-alias-separator-primary": {
		light: "#e6dcc4",
		dark: "#433a2e"
	},
	"--dsw-alias-label-quaternary": {
		light: "#c4b89e",
		dark: "#6b5f4e"
	},
	"--dsw-alias-label-primary-bluish": {
		light: "#794f27",
		dark: "#f0e6d2"
	},
	"--dsw-alias-label-primary-dimmed": {
		light: "#a89878",
		dark: "#8a7b66"
	},
	"--dsw-alias-label-error": {
		light: "#c94444",
		dark: "#e87878"
	},
	"--dsw-alias-markdown-tag": {
		light: "#e6f9f6",
		dark: "rgba(47,214,196,0.12)"
	},
	"--dsw-alias-scrollbar-bg-l1": {
		light: "#f0e8d8",
		dark: "#332b22"
	},
	"--dsw-alias-scrollbar-hover-l1": {
		light: "#c4b89e",
		dark: "#6b5f4e"
	},
	"--dsw-alias-interactive-bg-hover-accent": {
		light: "#e6f9f6",
		dark: "rgba(47,214,196,0.10)"
	},
	"--dsw-alias-interactive-bg-hover-solid": {
		light: "#f0e8d8",
		dark: "#433a2e"
	},
	"--dsw-font-family": {
		light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
		dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"
	},
	"--dsw-font-markdown-base": {
		light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
		dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"
	},
	"--dsw-font-markdown-base-strong": {
		light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
		dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"
	},
	"--dsw-font-markdown-h1": {
		light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
		dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"
	},
	"--dsw-font-markdown-h2": {
		light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
		dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"
	},
	"--dsw-font-markdown-h3": {
		light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
		dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"
	},
	"--dsw-font-markdown-h4": {
		light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
		dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"
	},
	"--dsw-font-markdown-table": {
		light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
		dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"
	},
	"--dsw-font-markdown-table-head": {
		light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
		dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif"
	}
};
/** Services required before mounting (`theme` is provided by dsh-client-ui-theme). */
const inject = ["theme"];
/**
* Client plugin body: apply the Animal Crossing token override layer and inject
* the skin stylesheet for the page lifetime, tearing both down on fiber unload.
* @param ctx - client Cordis context.
*/
function apply(ctx) {
	ctx.effect(() => {
		let disposeTokens;
		try {
			disposeTokens = ctx.theme.overrideTokens(PLUGIN_ID, TOKEN_OVERRIDES);
		} catch {
			for (const key of Object.keys(TOKEN_OVERRIDES)) try {
				document.body.style.setProperty(key, TOKEN_OVERRIDES[key].light);
			} catch {}
		}
		let styleTag = null;
		if (typeof document !== "undefined") {
			const existing = document.querySelector(`style[data-plugin-css="${STYLE_TAG_ID}"]`);
			if (existing == null) {
				styleTag = document.createElement("style");
				styleTag.dataset.plugin = PLUGIN_ID;
				styleTag.dataset.pluginCss = STYLE_TAG_ID;
				styleTag.textContent = _raw_1_default;
				document.head.appendChild(styleTag);
			} else styleTag = existing;
		}
		return () => {
			if (typeof disposeTokens === "function") try {
				disposeTokens();
			} catch {}
			if (styleTag != null && styleTag.parentNode != null) try {
				styleTag.remove();
			} catch {}
		};
	}, `${PLUGIN_ID}: skin lifecycle`);
}
//#endregion
exports.PLUGIN_ID = PLUGIN_ID;
exports.TOKEN_OVERRIDES = TOKEN_OVERRIDES;
exports.apply = apply;
exports.inject = inject;


    return module.exports;
  },
});
