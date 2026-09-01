/**
 * Node smoke test for the dsh-animal-island-ui browser bundle.
 *
 * Simulates the DSH module-loader environment (`window.__ModuleLoader__.load`)
 * and a minimal DOM, then runs the client module's `apply(ctx)` and asserts:
 *   - the module exposes `inject = ['theme']`
 *   - `apply` calls `ctx.theme.overrideTokens(PLUGIN_ID, TOKEN_OVERRIDES)`
 *     with a per-mode `{light, dark}` payload
 *   - it injects a <style> tag carrying the skin CSS and marks it data-plugin-css
 *   - the ctx.effect cleanup disposes the tokens and removes the style tag
 * No network, no server, no actual web app required.
 */

import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// ---- Mock window.__ModuleLoader__ ----
let captured = null;
globalThis.window = {
  __ModuleLoader__: {
    load(cfg) {
      captured = { id: cfg.id, mod: cfg.factory(() => {}) };
    },
  },
};

// ---- Minimal DOM mock ----
const styleTags = [];
const appliedBodyVars = {};
globalThis.document = {
  documentElement: { style: { setProperty() {} } },
  createElement(tag) {
    return { tag, dataset: {}, textContent: '', parentNode: null, remove() { this.removed = true; this.parentNode = null; } };
  },
  querySelector() {
    return null; // first run: nothing exists yet
  },
  head: {
    appendChild(el) {
      styleTags.push(el);
      el.parentNode = { removeChild() { el.parentNode = null; } };
    },
  },
  body: {
    style: {
      setProperty(k, v) { appliedBodyVars[k] = v; },
    },
  },
};

await import('../lib/client.js');

if (!captured) {
  throw new Error('client bundle did not register via window.__ModuleLoader__.load');
}
const { id, mod } = captured;

const t = (label, cond) => {
  if (!cond) throw new Error('FAIL: ' + label);
  console.log('  ok - ' + label);
};

console.log('module id: ' + id);
t('registers as dsh-animal-island-ui', id === 'dsh-animal-island-ui');

// ---- Contract: exports apply + inject ----
t('module exports apply', typeof mod.apply === 'function');
t('module exports inject', Array.isArray(mod.inject));
t('inject === ["theme"]', JSON.stringify(mod.inject) === JSON.stringify(['theme']));

// ---- Run apply against a mocked context ----
let override = null;
let disposed = false;
let cleanup = null;
const ctx = {
  theme: {
    overrideTokens(src, tokens) {
      override = { src, tokens };
      return () => { disposed = true; };
    },
  },
  effect(factory) {
    cleanup = factory();
    return () => {};
  },
};

mod.apply(ctx);

t('overrideTokens called once', override !== null);
t('override source = "dsh-animal-island-ui"', override.src === 'dsh-animal-island-ui');
const tokens = override.tokens;
t('tokens is a non-empty object', tokens && typeof tokens === 'object' && Object.keys(tokens).length > 30);

// Every token must be a { light, dark } pair (runtime-validated by the host).
const bad = [];
for (const k of Object.keys(tokens)) {
  const v = tokens[k];
  if (!v || typeof v !== 'object' || typeof v.light !== 'string' || typeof v.dark !== 'string') {
    bad.push(k);
  }
}
t('all ' + Object.keys(tokens).length + ' tokens are {light,dark} pairs', bad.length === 0);

// Key palette assertions (animal-island-ui design language).
t('bg-base light = parchment #f8f8f0', tokens['--dsw-alias-bg-base'].light === '#f8f8f0');
t('brand-primary light = mint #19c8b9', tokens['--dsw-alias-brand-primary'].light === '#19c8b9');
t('label-primary light = brown #794f27', tokens['--dsw-alias-label-primary'].light === '#794f27');

// ---- Assert the <style> tag was injected with the skin CSS ----
t('one style tag injected', styleTags.length === 1);
const styleEl = styleTags[0];
t('style tag has data-plugin-css', styleEl.dataset.pluginCss === 'dsh-animal-island-ui/skin.css');
t('style tag has data-plugin', styleEl.dataset.plugin === 'dsh-animal-island-ui');
const css = styleEl.textContent;
t('skin css loaded (non-empty)', typeof css === 'string' && css.length > 500);
t('skin css imports Nunito', css.includes("Nunito"));
t('skin css contains parchment #f8f8f0', css.includes('#f8f8f0'));
t('skin css contains mint #19c8b9', css.includes('#19c8b9'));
t('skin css forces 50px pill radius', css.includes('border-radius: 50px'));
t('skin css has yellow focus #ffcc00', css.includes('#ffcc00'));
t('skin css has 3D button shadow', css.includes('0 5px 0 0'));

// ---- Cleanup behavior ----
t('applied body vars set on fallback (should be empty when overrideTokens works)', Object.keys(appliedBodyVars).length === 0);
if (typeof cleanup === 'function') {
  cleanup();
  t('cleanup disposes the token override', disposed === true);
  t('cleanup removes the style tag', styleEl.parentNode === null);
} else {
  throw new Error('apply did not register a cleanup via ctx.effect');
}

console.log('\nALL CHECKS PASSED');
