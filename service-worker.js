const CACHE_NAME = '2048-cache-v2'; // Update this with the new version
const CACHE_EXPIRATION_TIME = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
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
  '/AnkhSanctuary.ttf',
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

// Activate and clear old caches
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

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        if (response) {
          // Check if cache is expired
          return cache.match(event.request.url + '-timestamp').then(timestampResponse => {
            if (timestampResponse) {
              return timestampResponse.text().then(timestamp => {
                const now = Date.now();
                if (now - parseInt(timestamp) > CACHE_EXPIRATION_TIME) {
                  // Cache expired, fetch new data and update cache
                  return fetchAndUpdateCache(event, cache);
                } else {
                  // Cache is still valid, use it
                  return response;
                }
              });
            } else {
              // No timestamp, fetch new data and update cache
              return fetchAndUpdateCache(event, cache);
            }
          });
        } else {
          // No cache, fetch and update cache
          return fetchAndUpdateCache(event, cache);
        }
      });
    })
  );
});

// Function to fetch data and update cache
async function fetchAndUpdateCache(event, cache) {
  const requestURL = new URL(event.request.url);

  // Only cache requests with supported schemes
  if (requestURL.protocol === 'http:' || requestURL.protocol === 'https:') {
    const newResponse = await fetch(event.request);
    if (newResponse.ok) {
      cache.put(event.request, newResponse.clone());
      cache.put(event.request.url + '-timestamp', new Response(Date.now().toString()));
    }
    return newResponse;
  } else {
    // If the request scheme is not supported, just fetch the request without caching
    return fetch(event.request);
  }
}

// Listen for new version and show notification to the user
self.addEventListener('message', event => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});

// Handle notification of new version
self.addEventListener('install', () => {
  self.skipWaiting();
});
