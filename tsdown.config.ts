import { defineConfig } from 'tsdown'
import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'

// Vite-style `?raw` loader: resolve `./x.css?raw` to a virtual id (no `.css`
// in it, so tsdown's css-guard never treats it as a stylesheet), then load()
// returns the file contents as a default-export string module.
function rawPlugin() {
  const rawFiles = new Map()
  return {
    name: 'raw',
    resolveId(source, importer) {
      if (!source.endsWith('?raw')) return null
      const bare = source.slice(0, -'?raw'.length)
      const abs = importer ? resolve(dirname(importer), bare) : resolve(bare)
      const id = '\0raw:' + rawFiles.size
      rawFiles.set(id, abs)
      return id
    },
    load(id) {
      if (rawFiles.has(id)) {
        const text = readFileSync(rawFiles.get(id), 'utf8')
        return { code: 'export default ' + JSON.stringify(text), map: null }
      }
      return null
    },
  }
}

// DSH module-loader bundle shape. tsdown emits a plain CJS body (which needs
// `module`/`exports` in scope and uses `exports.X = ...`); we wrap it with a
// banner that supplies those globals and a footer that returns the exports.
export default defineConfig({
  entry: { client: 'src/client/index.ts' },
  format: ['cjs'],
  platform: 'browser',
  target: 'es2020',
  treeshake: true,
  clean: false,
  dts: false,
  sourcemap: false,
  outDir: 'lib',
  plugins: [rawPlugin()],
  banner() {
    return `/**
 * dsh-animal-island-ui — browser half (built bundle).
 *
 * A DSH client module-loader bundle: \`window.__ModuleLoader__.load({ id, factory })\`
 * exporting \`{ apply, inject }\`. The loader gates activation on \`inject\`, then
 * calls \`apply(ctx)\` with the client Cordis context.
 *
 * The reskin is two layers, both torn down by the \`ctx.effect\` cleanup:
 *   L1  \`ctx.theme.overrideTokens()\` — auto-active \`--dsw-*\` token layer mapped
 *       from the animal-island-ui palette.
 *   L2  an injected <style> shaping the shell's real widgets (see skin.css).
 *
 * Source: src/client/index.ts + src/client/skin.css (see \`npm run build\`).
 */

window.__ModuleLoader__.load({
  id: 'dsh-animal-island-ui',
  factory: (require) => {
    var module = { exports: {} };
    var exports = module.exports;
`
  },
  footer() {
    return `
    return module.exports;
  },
});
`
  },
})
