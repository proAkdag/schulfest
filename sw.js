/* Schulfest-Escape Service Worker
   Doktrin (Drei-Löcher-Lehre 2026-07-10): Seiten-Navigationen NETWORK-FIRST mit
   cache:'no-store' — online kommt IMMER die frische Version (umgeht auch den
   HTTP-Cache), offline fällt es auf den Precache zurück. Offline ist ein
   Sicherheitsnetz, nie eine Zeitkapsel. Bilder/Assets cache-first. */
var CACHE = 'schulfest-2026-07-16-v1';
var ASSETS = [
  './',
  'index.html', 'raum1.html', 'raum2.html', 'raum3.html', 'raum4.html', 'caesar.html',
  'werk_fluegel.jpg', 'werk_respekt.jpg', 'Gesamtschule_Hagen-Haspe.jpg',
  'manifest.webmanifest', 'icon-192.png', 'icon-512.png'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE)
      .then(function (c) { return c.addAll(ASSETS); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      /* nur die eigene Cache-Familie räumen — nie fremde Caches der Origin */
      return Promise.all(keys
        .filter(function (k) { return k.indexOf('schulfest-') === 0 && k !== CACHE; })
        .map(function (k) { return caches.delete(k); }));
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req.url, { cache: 'no-store' }).then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        var kopie = res.clone();
        caches.open(CACHE).then(function (c) { c.put(req, kopie); });
        return res;
      }).catch(function () {
        return caches.match(req).then(function (r) {
          return r || caches.match('index.html');
        });
      })
    );
    return;
  }

  e.respondWith(
    caches.match(req).then(function (r) {
      return r || fetch(req).then(function (res) {
        if (res && res.ok) {
          var kopie = res.clone();
          caches.open(CACHE).then(function (c) { c.put(req, kopie); });
        }
        return res;
      });
    })
  );
});
