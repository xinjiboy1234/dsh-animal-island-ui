/**
 * Ambient declarations for the skin module imports used by the source, so
 * `tsc` understands the Vite-ish `?raw` suffix. The shipped `lib/client.js`
 * already inlines the CSS string, so this only matters when rebuilding from
 * source.
 */
declare module '*.css?raw' {
  const content: string
  export default content
}
