/**
 * dsh-animal-island-ui — browser half (source).
 *
 * The client plugin applies the Animal Crossing reskin in two layers:
 *
 *   L1 (tokens) — `ctx.theme.overrideTokens(...)` stacks an auto-active
 *   override layer on the host's theme. Values are `--dsw-*` CSS variables
 *   mapped from the animal-island-ui palette; the host ThemePresenter writes
 *   the folded tokens as inline vars on <body>, so the palette lands anywhere
 *   the shell consumes those tokens (backgrounds, borders, brand color,
 *   buttons, labels, status, markdown, scrollbars, fonts).
 *
 *   L2 (patches) — an injected <style> tag carries what tokens can't reach:
 *   Nunito/Noto Sans SC font faces, pill radius, 3D game-button depth, yellow
 *   focus, warm scrollbars/selection and the parchment background.
 *
 * Both are registered inside a single `ctx.effect` so a fiber unload / hot
 * reload tears the layer down cleanly.
 *
 * Requires the `theme` service (provided by @deepseek-ai/dsh-client-ui-theme).
 * It is re-exported for consumers that type against this module's surface.
 */

import type { Context } from '@deepseek-ai/cordis'
import type {} from '@deepseek-ai/dsh-client-runtime/client'
// Provides the `theme` service declaration (ctx.theme) for type-checking.
import type {} from '@deepseek-ai/dsh-client-ui-theme/client'
// eslint-disable-next-line import/no-relative-packages
import skinCss from './skin.css?raw'

/** Plugin identity (used for the token-layer source and the style tag id). */
export const PLUGIN_ID = 'dsh-animal-island-ui'
const STYLE_TAG_ID = `${PLUGIN_ID}/skin.css`

/**
 * Alias/font token overrides, keyed by `--dsw-*` variable name → `{ light, dark }`.
 * Both modes are mandatory (the host picks the value for the active scheme), so
 * the skin stays legible when the user switches light/dark.
 */
export const TOKEN_OVERRIDES: Record<string, { light: string; dark: string }> = {
  // Backgrounds
  '--dsw-alias-bg-base': { light: '#f8f8f0', dark: '#2a231c' },
  '--dsw-alias-bg-layer-1': { light: '#f7f3df', dark: '#332b22' },
  '--dsw-alias-bg-layer-2': { light: '#f0e8d8', dark: '#3b3227' },
  '--dsw-alias-bg-mask-1': { light: 'rgba(61,52,40,0.35)', dark: 'rgba(0,0,0,0.5)' },

  // Borders
  '--dsw-alias-border-l1': { light: '#c4b89e', dark: '#4a4238' },
  '--dsw-alias-border-l2': { light: '#a89878', dark: '#5c5244' },
  '--dsw-alias-border-l3': { light: '#9f927d', dark: '#6b5f4e' },
  '--dsw-alias-border-l4': { light: '#8a7b66', dark: '#7a6c58' },
  '--dsw-alias-border-inverted': { light: '#f8f8f0', dark: '#2a231c' },

  // Brand / buttons
  '--dsw-alias-brand-primary': { light: '#19c8b9', dark: '#2fd6c4' },
  '--dsw-alias-button-primary-fill': { light: '#19c8b9', dark: '#2fd6c4' },
  '--dsw-alias-button-primary-hover': { light: '#3dd4c6', dark: '#4de2da' },
  '--dsw-alias-button-ghost-active-fill': { light: '#e6f9f6', dark: 'rgba(47,214,196,0.12)' },
  '--dsw-alias-button-ghost-active-border': { light: '#19c8b9', dark: '#2fd6c4' },
  '--dsw-alias-button-tool-bar-fill': { light: '#f8f8f0', dark: '#332b22' },
  '--dsw-alias-button-tool-bar-hover': { light: '#e6f9f6', dark: '#3b3227' },
  '--dsw-alias-button-contrast-fill': { light: '#794f27', dark: '#1d1814' },

  // Interactive surfaces
  '--dsw-alias-interactive-bg-hover': { light: '#e6f9f6', dark: 'rgba(47,214,196,0.10)' },
  '--dsw-alias-interactive-bg-active': { light: '#b7c6e5', dark: '#2e463f' },
  '--dsw-alias-interactive-bg-hover-danger': { light: '#f7d0d0', dark: 'rgba(224,90,90,0.18)' },

  // Labels (warm brown family — never pure black / cold gray)
  '--dsw-alias-label-primary': { light: '#794f27', dark: '#f0e6d2' },
  '--dsw-alias-label-primary-foreground': { light: '#794f27', dark: '#2a231c' },
  '--dsw-alias-label-primary-inverted': { light: '#f8f8f0', dark: '#2a231c' },
  '--dsw-alias-label-secondary': { light: '#725d42', dark: '#d8cbb0' },
  '--dsw-alias-label-tertiary': { light: '#9f927d', dark: '#a89a82' },
  '--dsw-alias-label-caption': { light: '#8a7b66', dark: '#b3a38a' },
  '--dsw-alias-label-dimmed': { light: '#c4b89e', dark: '#6b5f4e' },

  // Markdown / code
  '--dsw-alias-markdown-code-block': { light: '#f0e8d8', dark: '#3b3227' },
  '--dsw-alias-markdown-code-block-banner': { light: '#e6f9f6', dark: 'rgba(47,214,196,0.12)' },
  '--dsw-alias-markdown-inline-code': { light: 'rgba(25,200,185,0.12)', dark: 'rgba(47,214,196,0.14)' },

  // Scrollbars
  '--dsw-alias-scrollbar-bg-l2': { light: '#f0e8d8', dark: '#332b22' },
  '--dsw-alias-scrollbar-hover-l2': { light: '#c4b89e', dark: '#6b5f4e' },

  // Status — "business" is the shell's interactive/accent channel (tab active,
  // composer caret, text-refs, pending dot). Drive it with mint, never cold blue.
  '--dsw-alias-state-business-primary': { light: '#19c8b9', dark: '#2fd6c4' },
  '--dsw-alias-state-business-tertiary': { light: '#e6f9f6', dark: 'rgba(47,214,196,0.12)' },
  '--dsw-alias-state-error-primary': { light: '#e05a5a', dark: '#e87878' },
  '--dsw-alias-state-error-secondary': { light: '#f7d0d0', dark: 'rgba(224,90,90,0.18)' },
  '--dsw-alias-state-success-primary': { light: '#6fba2c', dark: '#85cc45' },
  '--dsw-alias-state-success-secondary': { light: '#e6f4da', dark: 'rgba(111,186,44,0.18)' },
  '--dsw-alias-state-success-tertiary': { light: '#f2f8ea', dark: 'rgba(111,186,44,0.12)' },
  '--dsw-alias-state-warn-primary': { light: '#f5c31c', dark: '#f7d04a' },
  '--dsw-alias-state-warn-secondary': { light: '#fff3c4', dark: 'rgba(245,195,28,0.18)' },
  '--dsw-alias-state-warn-tertiary': { light: '#fffbe0', dark: 'rgba(245,195,28,0.12)' },
  '--dsw-alias-state-warn-label': { light: '#dba90e', dark: '#f7d04a' },

  // Tooltip / toast
  '--dsw-alias-tooltip-bg': { light: '#794f27', dark: '#f0e6d2' },
  '--dsw-alias-toast-bg': { light: '#794f27', dark: '#f0e6d2' },

  // Buttons — the full surface, incl. `info-fill` (the circular send / primary
  // action) and the elevated/floating chip buttons.
  '--dsw-alias-button-info-fill': { light: '#19c8b9', dark: '#2fd6c4' },
  '--dsw-alias-button-info-hover': { light: '#3dd4c6', dark: '#4de2da' },
  '--dsw-alias-button-elevated-fill': { light: '#fffbe7', dark: '#3b3227' },
  '--dsw-alias-button-floating-fill': { light: '#fffbe7', dark: '#332b22' },
  '--dsw-alias-button-floating-hover': { light: '#e6f9f6', dark: '#3b3227' },
  '--dsw-alias-button-tool-bar-fill-invisible': { light: 'transparent', dark: 'transparent' },

  // Specific surfaces (sidebar / menu / select / input-major / tip / bubble).
  '--dsw-specific-sidebar-fill': { light: '#f7f3df', dark: '#332b22' },
  '--dsw-specific-sidebar-nav-item-active': { light: '#b7c6e5', dark: '#2e463f' },
  '--dsw-specific-sidebar-nav-item-active-accent': { light: '#19c8b9', dark: '#2fd6c4' },
  '--dsw-specific-sidebar-nav-item-hover': { light: '#d6dff0', dark: '#3b3227' },
  '--dsw-specific-input-major': { light: '#fffbe7', dark: '#3b3227' },
  '--dsw-specific-menu': { light: '#fffbe7', dark: '#3b3227' },
  '--dsw-specific-selector': { light: '#f0e8d8', dark: '#3b3227' },
  '--dsw-specific-tip': { light: '#f0e8d8', dark: '#3b3227' },
  '--dsw-specific-bubble': { light: '#f7f3df', dark: '#3b3227' },
  '--dsw-specific-bubble-highlight': { light: '#e6f9f6', dark: 'rgba(47,214,196,0.12)' },

  // Misc aliases that were left on the cold/deepseek defaults.
  '--dsw-alias-bg-layer-3': { light: '#e6dcc4', dark: '#433a2e' },
  '--dsw-alias-bg-overlay': { light: 'rgba(61,52,40,0.28)', dark: 'rgba(0,0,0,0.55)' },
  '--dsw-alias-bg-skeleton': { light: '#f0e8d8', dark: '#433a2e' },
  // Selected module/settings surface — the appearance theme-cube "selected" bg
  // and the settings editor panel (default was a cold neutral-bluish-60).
  '--dsw-alias-bg-module-platform': { light: '#e6f9f6', dark: '#2e463f' },
  '--dsw-alias-bg-multi-select': { light: '#fffbe7', dark: '#3b3227' },
  '--dsw-alias-fill-l2': { light: '#f0e8d8', dark: '#3b3227' },
  '--dsw-alias-border-inverted2': { light: '#f8f8f0', dark: '#2a231c' },
  '--dsw-alias-line-secondary': { light: '#c4b89e', dark: '#5c5244' },
  '--dsw-alias-separator-primary': { light: '#e6dcc4', dark: '#433a2e' },
  '--dsw-alias-label-quaternary': { light: '#c4b89e', dark: '#6b5f4e' },
  '--dsw-alias-label-primary-bluish': { light: '#794f27', dark: '#f0e6d2' },
  '--dsw-alias-label-primary-dimmed': { light: '#a89878', dark: '#8a7b66' },
  '--dsw-alias-label-error': { light: '#c94444', dark: '#e87878' },
  '--dsw-alias-markdown-tag': { light: '#e6f9f6', dark: 'rgba(47,214,196,0.12)' },
  '--dsw-alias-scrollbar-bg-l1': { light: '#f0e8d8', dark: '#332b22' },
  '--dsw-alias-scrollbar-hover-l1': { light: '#c4b89e', dark: '#6b5f4e' },
  '--dsw-alias-interactive-bg-hover-accent': { light: '#e6f9f6', dark: 'rgba(47,214,196,0.10)' },
  '--dsw-alias-interactive-bg-hover-solid': { light: '#f0e8d8', dark: '#433a2e' },

  // Typography roles — Nunito + Noto Sans SC (monospace blocked for UI text;
  // markdown code keeps its own font via the shell default).
  '--dsw-font-family': {
    light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
  '--dsw-font-markdown-base': {
    light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
  '--dsw-font-markdown-base-strong': {
    light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
  '--dsw-font-markdown-h1': {
    light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
  '--dsw-font-markdown-h2': {
    light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
  '--dsw-font-markdown-h3': {
    light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
  '--dsw-font-markdown-h4': {
    light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
  '--dsw-font-markdown-table': {
    light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
  '--dsw-font-markdown-table-head': {
    light: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
    dark: "'Nunito','Noto Sans SC',-apple-system,'PingFang SC','Hiragino Sans GB','Microsoft YaHei',sans-serif",
  },
}

/** Services required before mounting (`theme` is provided by dsh-client-ui-theme). */
export const inject = ['theme']

/**
 * Client plugin body: apply the Animal Crossing token override layer and inject
 * the skin stylesheet for the page lifetime, tearing both down on fiber unload.
 * @param ctx - client Cordis context.
 */
export function apply(ctx: Context): void {
  ctx.effect(
    () => {
      let disposeTokens: (() => void) | undefined
      try {
        disposeTokens = ctx.theme.overrideTokens(PLUGIN_ID, TOKEN_OVERRIDES)
      } catch {
        // Runtime validation (both modes required) failed: fall back to writing
        // the light palette directly onto <body> so the skin still lands.
        for (const key of Object.keys(TOKEN_OVERRIDES)) {
          try {
            document.body.style.setProperty(key, TOKEN_OVERRIDES[key].light)
          } catch {
            /* ignore per-property write errors */
          }
        }
      }

      let styleTag: HTMLStyleElement | null = null
      if (typeof document !== 'undefined') {
        const existing = document.querySelector<HTMLStyleElement>(
          `style[data-plugin-css="${STYLE_TAG_ID}"]`,
        )
        if (existing == null) {
          styleTag = document.createElement('style')
          styleTag.dataset.plugin = PLUGIN_ID
          styleTag.dataset.pluginCss = STYLE_TAG_ID
          styleTag.textContent = skinCss
          document.head.appendChild(styleTag)
        } else {
          styleTag = existing
        }
      }

      return () => {
        if (typeof disposeTokens === 'function') {
          try {
            disposeTokens()
          } catch {
            /* ignore dispose errors */
          }
        }
        if (styleTag != null && styleTag.parentNode != null) {
          try {
            styleTag.remove()
          } catch {
            /* ignore removal errors */
          }
        }
      }
    },
    `${PLUGIN_ID}: skin lifecycle`,
  )
}
