const CACHE_NAME = '2048-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/animation.css',
  '/media-queries.css',
  '/script.js',
  '/initialize.js',
  '/animation.js',
  '/manifest.webmanifest',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png',
  '/assets/screenshots/screenshot1-narrow.png',
  '/assets/screenshots/screenshot1-wide.png',
  '/assets/screenshots/screenshot2-narrow.png',
  '/assets/screenshots/screenshot2-wide.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('Failed to cache:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});