/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    tsconfigPaths()
  ],
}