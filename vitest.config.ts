import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    include: ['**/*.{test,spec}.{ts,tsx}'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
