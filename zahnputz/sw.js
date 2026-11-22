// Plaque Invaders – macht das Spiel installierbar und offline spielbar.
// Neue Version: VERSION hochzählen, dann holt sich das Handy die neuen Dateien.
const VERSION = "plaque-invaders-4";
const DATEIEN = ["./", "./index.html", "./manifest.php", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(DATEIEN)).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== VERSION).map(n => caches.delete(n)))).then(() => self.clients.claim()));
});
// Erst online versuchen (damit Updates sofort ankommen), sonst aus dem Speicher.
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET" || new URL(e.request.url).origin !== location.origin) return;
  e.respondWith(
    fetch(e.request).then(r => {
      if (r.ok) { const kopie = r.clone(); caches.open(VERSION).then(c => c.put(e.request, kopie)); }
      return r;
    }).catch(() => caches.match(e.request, { ignoreSearch: true }).then(r => r || caches.match("./index.html")))
  );
});
