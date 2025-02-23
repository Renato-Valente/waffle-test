import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'public/home.html',
        dashboard: 'public/dashboard.html',
        login: 'public/login.html'
      },
    },
  },
  server: {
    //historyApiFallback: true, // Garante que o React Router funcione corretamente
  }
});
