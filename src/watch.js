import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const watchPaths = [
  './posts',
  './src/styles.css',
  './src/build.js'
];

console.log('👀 Watching for changes...');
console.log('Press Ctrl+C to stop\n');

// Initial build
console.log('🔨 Initial build...');
execSync('node src/build.js', { stdio: 'inherit' });

// Watch for changes
watchPaths.forEach(watchPath => {
  fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
    if (filename && (filename.endsWith('.md') || filename.endsWith('.css') || filename.endsWith('.js'))) {
      console.log(`\n📝 Changed: ${filename}`);
      console.log('🔨 Rebuilding...');
      try {
        execSync('node src/build.js', { stdio: 'inherit' });
        console.log('✅ Build complete\n');
      } catch (err) {
        console.error('❌ Build failed:', err.message);
      }
    }
  });
});

console.log('Watching:', watchPaths.join(', '));
