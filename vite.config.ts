import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: [
      // Route UI imports to the new location
      { find: "@/components/ui", replacement: path.resolve(__dirname, "./component/ui") },
      // Keep application code aliasing to src
      { find: "@", replacement: path.resolve(__dirname, "./src") },
    ],
  },
}));
