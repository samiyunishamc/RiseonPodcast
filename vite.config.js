<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Serve index.html for all routes (SPA behaviour)
    historyApiFallback: true,
  },
})
=======
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Serve index.html for all routes (SPA behaviour)
    historyApiFallback: true,
  },
})
>>>>>>> a3e83a631e6aa3d66034697253f1a72e544ca08e
