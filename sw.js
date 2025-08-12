// service-worker.js
/* eslint-disable no-restricted-globals */

const CACHE_NAME = "mistermobile-cache-v1";
const urlsToCache = [
  "/TaskApp/",
  "/TaskApp/index.html",
  "/TaskApp/favicon/apple-touch-icon.png",
  "/TaskApp/favicon/image72.png",
  "/TaskApp/favicon/favicon-96x96.png",
  "/TaskApp/favicon/web-app-manifest-192x192.png",
  "/TaskApp/favicon/web-app-manifest-512x512.png",
  "/TaskApp/site.webmanifest",
  "/TaskApp/favicon/image16.png",
  "/TaskApp/favicon/image128.png",
  "/TaskApp/favicon/image32.png",
  "/TaskApp/favicon/image256.png",
  "/TaskApp/favicon/image384.png",

];


// Install Service Worker and Cache Files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serve from cache or network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
