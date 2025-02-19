import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    historyApiFallback: true,
    port: 5173, // Ensure the correct port is set
    open: true,  // Opens browser automatically
  },
  base: "./", // Ensure correct base path
});