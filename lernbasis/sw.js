const C='lernbasis-v25';
const FILES=['./','index.html','manifest.php','icon-192.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
 const u=new URL(e.request.url);
 if(e.request.method!=='GET'||u.pathname.endsWith('api.php'))return;
 if(e.request.mode==='navigate'||u.pathname.endsWith('index.html')){
  e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));return}
 e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
self.addEventListener('push',e=>{e.waitUntil(caches.open('lb-mode').then(c=>c.match('mode')).then(r=>r?r.text():'kind').catch(()=>'kind').then(m=>m==='eltern'?self.registration.showNotification('Lernbasis Eltern',{body:'Henry hat heute noch nicht gelernt.',icon:'icon-eltern-192.png',badge:'icon-eltern-192.png',tag:'lernen-eltern'}):self.registration.showNotification('Lernbasis 📚',{body:'Hast du heute schon gelernt? Deine Serie wartet auf dich! 🔥',icon:'icon-192.png',badge:'icon-192.png',tag:'lernen',renotify:true})))});
self.addEventListener('notificationclick',e=>{e.notification.close();e.waitUntil(clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return clients.openWindow('./')}))});
