const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime-v1';

const PRECACHE_URLS = [
  "/",
  "/components/aloc-button.js",
  "/components/aloc-card.js",
  "/components/aloc-img.js",
  "/vendor/hyperhtml/esm/index.js",
  "/vendor/hyperhtml/esm/classes/Component.js",
  "/vendor/hyperhtml/esm/classes/Wire.js",
  "/vendor/hyperhtml/esm/hyper/render.js",
  "/vendor/hyperhtml/esm/hyper/wire.js",
  "/vendor/hyperhtml/esm/objects/Engine.js",
  "/vendor/hyperhtml/esm/objects/Intent.js",
  "/vendor/hyperhtml/esm/objects/Path.js",
  "/vendor/hyperhtml/esm/objects/Style.js",
  "/vendor/hyperhtml/esm/objects/Updates.js",
  "/vendor/hyperhtml/esm/shared/constants.js",
  "/vendor/hyperhtml/esm/shared/domdiff.js",
  "/vendor/hyperhtml/esm/shared/easy-dom.js",
  "/vendor/hyperhtml/esm/shared/features-detection.js",
  "/vendor/hyperhtml/esm/shared/poorlyfills.js",
  "/vendor/hyperhtml/esm/shared/re.js",
  "/vendor/hyperhtml/esm/shared/utils.js"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
