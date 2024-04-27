import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env.APIKEY': JSON.stringify(env.APIKEY),
      'process.env.AUTHDOMAIN': JSON.stringify(env.AUTHDOMAIN),
      'process.env.PROJECTID': JSON.stringify(env.PROJECTID),
      'process.env.STORAGEBUCKET': JSON.stringify(env.STORAGEBUCKET),
      'process.env.MESSAGINGSENDERID': JSON.stringify(env.MESSAGINGSENDERID),
      'process.env.APPID': JSON.stringify(env.APPID),
      'process.env.MEASUREMENTID': JSON.stringify(env.MEASUREMENTID),
    },
    plugins: [react()],
  }
})