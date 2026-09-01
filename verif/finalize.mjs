/**
 * Post-build finalize: tsdown emits `lib/client.cjs` (cjs body wrapped by the
 * module-loader banner/footer in tsdown.config.ts). The DSH host/plugin loads
 * the client bundle from `./client` → `lib/client.js`, so rename to `.js` and
 * drop any stale `lib/client.cjs` / `lib/index.*` leftovers from prior builds.
 */
import { renameSync, rmSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const lib = resolve(process.cwd(), 'lib')
const cjs = resolve(lib, 'client.cjs')
const js = resolve(lib, 'client.js')

if (!existsSync(cjs)) {
  console.error(`finalize: expected ${cjs} but it's missing`)
  process.exit(1)
}

rmSync(js, { force: true })
renameSync(cjs, js)

for (const stale of ['index.cjs', 'index.js']) {
  const p = resolve(lib, stale)
  if (existsSync(p)) rmSync(p)
}

console.log('finalize: lib/client.js written')
