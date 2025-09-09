// app.config.ts
import { defineConfig } from '@tanstack/react-start/config';
import tsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
    ],
    resolve: {
      alias: [
        // Route UI imports to the new location
        { find: "@/components/ui", replacement: "./packages/component/ui" },
        // Keep application code aliasing to src
        { find: "@", replacement: "./src" },
      ],
    },
  },
  server: {
    preset: 'node-server',
  },
});
