// Guten-Morgen-Tafel: nur damit sich die Seite als App installieren lässt – immer frisch aus dem Netz
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {});
