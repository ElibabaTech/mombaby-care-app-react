import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    host: true, // Allows external access (important for Ngrok)
    strictPort: true,
    allowedHosts: [
      '.ngrok-free.app', // Allows any Ngrok subdomain
      'localhost' // Keeps localhost access working
    ]
  }
});