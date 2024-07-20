// build.js
require('esbuild').build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'dist',
    loader: { '.js': 'jsx' },
  }).catch(() => process.exit(1));