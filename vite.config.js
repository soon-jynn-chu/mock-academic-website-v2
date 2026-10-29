import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base './' keeps asset URLs relative, so the built site works from
// username.github.io, username.github.io/repo-name/, or any other sub-path.
export default defineConfig({
  base: './',
  plugins: [react()],
})
