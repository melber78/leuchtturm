// Macht das Portal als App installierbar. Es wird nichts zwischengespeichert –
// alle Seiten kommen immer frisch vom Server (wichtig für geschützte Daten).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(() => new Response(
    '<!DOCTYPE html><html lang="de"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
    '<body style="font-family:sans-serif;text-align:center;padding:60px 20px;color:#333"><h2>Keine Internetverbindung</h2>' +
    '<p>Bitte Verbindung prüfen und neu laden.</p><button onclick="location.reload()" style="padding:12px 20px;font-size:16px;border-radius:12px;border:0;background:#3a56b0;color:#fff">Neu laden</button></body></html>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } })));
});
