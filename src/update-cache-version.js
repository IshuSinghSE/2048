import fs from 'fs';
import path from 'path';

const filePath = path.join('service-worker.js');

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading service-worker.js:', err);
    return;
  }

  const cacheNameMatch = data.match(/const CACHE_NAME = '2048-cache-v(\d+)';/);
  if (!cacheNameMatch) {
    console.error('CACHE_NAME not found in service-worker.js');
    return;
  }

  const currentVersion = parseInt(cacheNameMatch[1], 10);
  const newVersion = currentVersion + 1;
  const newCacheName = `2048-cache-v${newVersion}`;

  const updatedData = data.replace(/const CACHE_NAME = '2048-cache-v\d+';/, `const CACHE_NAME = '${newCacheName}';`);

  fs.writeFile(filePath, updatedData, 'utf8', err => {
    if (err) {
      console.error('Error writing service-worker.js:', err);
    } else {
      console.log(`Updated CACHE_NAME to ${newCacheName} in service-worker.js`);
    }
  });
});