import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Sync logo file on config load
try {
  const srcPath = 'C:/Users/addmy/.gemini/antigravity-ide/brain/c6db2054-ba7a-4c0f-af8b-70e9b1e6d0f1/media__1786199309057.png';
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, path.resolve(__dirname, 'public/logo.png'));
    fs.copyFileSync(srcPath, path.resolve(__dirname, 'public/ethizone-logo.png'));
    fs.copyFileSync(srcPath, path.resolve(__dirname, 'public/logo.svg'));
    
    const assetsDir = path.resolve(__dirname, 'src/assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    fs.copyFileSync(srcPath, path.resolve(assetsDir, 'logo.png'));
  }
} catch (e) {
  console.error('Logo sync error:', e);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        secure: false,
      }
    }
  }
});

