import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  if (command === 'build') {
    return {
      plugins: [react()],
      base: '/switch-game-ratings/'
    }
  }

  return {
    plugins: [react()]
  }
})
