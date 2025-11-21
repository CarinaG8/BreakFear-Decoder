import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // This ensures 'process.env.API_KEY' in the code is replaced 
      // with the actual string value from Netlify environment variables.
      // We use a fallback empty string to prevent build errors if the key is missing.
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
  };
});