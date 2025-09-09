import { defineConfig } from 'vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths(),
    tanstackStart({ customViteReactPlugin: true , target: 'node-server'}),
    viteReact(),
  ],
})
// import { defineConfig } from '@tanstack/react-start/config';
// import tsConfigPaths from 'vite-tsconfig-paths';

// const ReactCompilerConfig = {
//   /* ... */
// };
// export default defineConfig({
//   vite: {
//     plugins: [
//       tsConfigPaths({
//         projects: ['./tsconfig.json'],
//       }),
//     ],
//     build: {
//       rollupOptions: {
//         external: ['../pkg', 'pkg', 'fsevents'],
//         output: {
//           entryFileNames: `assets/[name]-[hash].js`,
//           chunkFileNames: `assets/[name]-[hash].js`,
//           assetFileNames: `assets/[name].[ext]`, // pas de hash
//         },
//       },
//     },
//     ssr: {
//       external: ['../pkg', 'pkg', 'fsevents'],
//     },
//   },
//   react: {
//     babel: {
//       plugins: ['babel-plugin-react-compiler', ReactCompilerConfig],
//     },
//   },
//   server: {
//     preset: 'node-server',
//   },
// });
