//declare var window: Window & typeof globalThis;
//declare var self;
let CACHE_NAME = 'ohsool';
let urlsToCache = [
    '/',
];

// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});
// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['ohsool'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', (event) => {
    let body
    if (event.data) {
      //You can set an original message by passing it on the event.
      body = event.data.text()
    } else {
      body = 'Default body'
    }
   
    const options = {
      body: body,
      icon: '/ohsoolIcon150.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: 1,
      },
    }
    event.waitUntil(
      self.registration.showNotification('알림!!!!',    
      options))
  })