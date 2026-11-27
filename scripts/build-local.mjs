// Fallback production build that needs only esbuild + tailwindcss (no Vite).
// Use `npm run build` (Vite) normally; this exists for offline environments.
//   node scripts/build-local.mjs
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import fs from 'node:fs'
import path from 'node:path'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')
const dist = path.join(root, 'dist')
const searchPaths = [path.join(root, 'node_modules'), '/opt/npm-tools/node_modules']
const require = createRequire(import.meta.url)
const resolvePkg = (name) => {
  for (const p of searchPaths) { if (fs.existsSync(path.join(p, name))) return path.join(p, name) }
  throw new Error(`Cannot find ${name}`)
}

const esbuildDir = resolvePkg('esbuild')
const { build, transform } = createRequire(esbuildDir + '/')(esbuildDir)

fs.rmSync(dist, { recursive: true, force: true })
fs.mkdirSync(path.join(dist, 'assets'), { recursive: true })

// 1) JS bundle (code-split lazy sections)
const result = await build({
  entryPoints: { main: path.join(root, 'src/main.jsx') },
  outdir: path.join(dist, 'assets'),
  entryNames: '[name]-[hash]',
  chunkNames: 'chunk-[name]-[hash]',
  bundle: true, splitting: true, format: 'esm', minify: true, sourcemap: false,
  target: 'es2020', jsx: 'automatic', nodePaths: searchPaths,
  loader: { '.js': 'jsx' },
  // CSS is compiled separately with Tailwind below, so ignore CSS imports here.
  plugins: [{
    name: 'skip-css',
    setup(b) {
      b.onResolve({ filter: /\.css$/ }, (a) => ({ path: a.path, namespace: 'skip-css' }))
      b.onLoad({ filter: /.*/, namespace: 'skip-css' }, () => ({ contents: '', loader: 'js' }))
    },
  }],
  define: { 'process.env.NODE_ENV': '"production"' },
  metafile: true, logLevel: 'info',
})
const entryJs = Object.keys(result.metafile.outputs).find((f) => /assets\/main-.*\.js$/.test(f))

// 2) Tailwind CSS via its programmatic compiler
const twDir = resolvePkg('tailwindcss')
const { compile } = await import(pathToFileURL(path.join(twDir, 'dist/lib.mjs')).href)
const cssSrc = fs.readFileSync(path.join(root, 'src/index.css'), 'utf8')
const compiler = await compile(cssSrc, {
  base: path.join(root, 'src'),
  onDependency: () => {},
  loadStylesheet: async (id, base) => {
    let file
    if (id === 'tailwindcss') file = path.join(twDir, 'index.css')
    else if (id.startsWith('tailwindcss/')) file = path.join(twDir, id.slice('tailwindcss/'.length) + '.css')
    else file = path.resolve(base, id)
    return { path: file, base: path.dirname(file), content: fs.readFileSync(file, 'utf8') }
  },
})
const files = []
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).forEach((e) => {
  const p = path.join(d, e.name)
  if (e.isDirectory()) walk(p); else if (/\.(jsx?|html)$/.test(e.name)) files.push(p)
})
walk(path.join(root, 'src')); files.push(path.join(root, 'index.html'))
const candidates = new Set()
for (const f of files) for (const t of fs.readFileSync(f, 'utf8').split(/[\s"'`<>{}]+/)) if (t) candidates.add(t)
const css = compiler.build([...candidates])
const min = await transform(css, { loader: 'css', minify: true })
const cssName = `main-${Date.now().toString(36)}.css`
fs.writeFileSync(path.join(dist, 'assets', cssName), min.code)

// 3) HTML + public files
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8')
html = html.replace('<script type="module" src="/src/main.jsx"></script>',
  `<link rel="stylesheet" href="/assets/${cssName}" />\n    <script type="module" src="/${entryJs.split('dist/')[1] ?? entryJs}"></script>`)
fs.writeFileSync(path.join(dist, 'index.html'), html)
fs.cpSync(path.join(root, 'public'), dist, { recursive: true })
console.log('Built →', dist)
