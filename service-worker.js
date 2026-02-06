// Whenever you make big changes, update this line:
// const CACHE_NAME = "mini-games-v2"; // increment version

const CACHE_NAME = "mini-games-v1";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./manifest.json",
  "./favicon.ico",
  "./favicon.png",
  "./assets/logo_Light.png",
  "./assets/Snake.png",
  "./assets/TicTacToe.png",
  "./assets/StressRelefBubbles.png",
  "./Snake.html",
  "./Tic-Tac-Toe.html",
  "./StressRelefBubbles.html"
];

/* Install */
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // 🚀 activate immediately
});

/* Activate */
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

/* Fetch */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
