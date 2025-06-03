import { defineConfig } from 'vite'

import * as fs from 'fs';
import * as path from 'path';

// Helper to extract only the latest version from CHANGELOG.md
function getChangelogVersion() {
  const changelogPath = path.resolve(__dirname, 'CHANGELOG.md');
  if (!fs.existsSync(changelogPath)) return '0.0.0';
  const content = fs.readFileSync(changelogPath, 'utf-8');
  const versionMatch = content.match(/^##\s*\[?([0-9]+\.[0-9]+\.[0-9]+)\]?(?:\s*-\s*[0-9-]+)?/m);
  return versionMatch ? versionMatch[1] : '0.0.0';
}

const version = getChangelogVersion();

export default defineConfig({
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'antd-vendor': ['antd'],
        },
      },
    },
  },
  define: {
    __APP_VERSION__: JSON.stringify(version),
  },
});