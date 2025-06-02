// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   server: {
//     host: true, // Allows external access (important for Ngrok)
//     strictPort: true,
//     allowedHosts: [
//       '.ngrok-free.app', // Allows any Ngrok subdomain
//       'localhost' // Keeps localhost access working
//     ]
//   }
// });




import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/mombaby-care-app-react/',  // <-- important for GitHub Pages sub-path
  plugins: [react()],
})
