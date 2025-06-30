import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react'

//@ts-ignore
export default ({ mode }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig ({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_RECIPES_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  })
}