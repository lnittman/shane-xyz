const CACHE_NAME = 'shane-cache-v1';

// Assets to cache immediately
const PRECACHE_ASSETS = [
  '/',
  '/bio',
  '/projects',
  '/manifest.json',
  '/assets/logo.png',
  '/assets/shane-home.png',
  '/assets/shane-bio.png',
  '/assets/shane-projects.png'
];

// Assets to cache on first use
const RUNTIME_ASSETS = [
  // Add media files here
];

// Install event - precache core assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network-first strategy with fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response before caching
        const responseToCache = response.clone();

        // Cache successful responses
        if (response.ok) {
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
        }

        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // If not in cache, return a basic offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
            
            return new Response('Offline content not available');
          });
      })
  );
}); 