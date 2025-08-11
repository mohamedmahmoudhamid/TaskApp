const CACHE_NAME = "app-cache-v1";
const URLS_TO_CACHE = [
  "/",
  "/index.html",
  "/manifest.json",
  "/favicon/favicon-72x72.png",
  "/favicon/favicon-96x96.png",
  "/favicon/favicon-128x128.png",
  "/favicon/favicon-192x192.png",
  "/favicon/favicon-512x512.png"
];

// تثبيت
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

// تفعيل
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// جلب الموارد
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request);
    })
  );
});
