import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      exportAsDefault: true,
      svgrOptions: {
        exportType: "default",
      }
    })
  ],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/shared" },
      { find: "api", replacement: "/src/api" }
    ]
  },
  server: {
    host: true,
  },
})
