/*
	We only need to modify 2 places:
		1. cacheName
		2. filesToCache
*/

// register service worker
if ('serviceWorker' in navigator) { // if service worker API is available
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/toddlerfarmanimal/sw.js', {scope: '/toddlerfarmanimal/'}).then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
      });
  });
}

var cacheName = 'farmAnimal-v1'; /* Name your cache  */
var filesToCache = [				 /* Files you wan to store in cache */
  '/toddlerfarmanimal/',
  '/toddlerfarmanimal/index.html',
  '/toddlerfarmanimal/manifest.json',
  '/toddlerfarmanimal/sw.js',
  '/toddlerfarmanimal/js/main.js',
  '/toddlerfarmanimal/js/phaser.js',
  '/toddlerfarmanimal/assets/audio/chicken.mp3',
  '/toddlerfarmanimal/assets/audio/chicken.ogg',
  '/toddlerfarmanimal/assets/audio/horse.mp3',
  '/toddlerfarmanimal/assets/audio/horse.ogg',
  '/toddlerfarmanimal/assets/audio/pig.mp3',
  '/toddlerfarmanimal/assets/audio/pig.ogg',
  '/toddlerfarmanimal/assets/audio/sheep.mp3',
  '/toddlerfarmanimal/assets/audio/sheep.ogg',
  '/toddlerfarmanimal/assets/images/icons/icon-72x72.png',
  '/toddlerfarmanimal/assets/images/icons/icon-96x96.png',
  '/toddlerfarmanimal/assets/images/icons/icon-128x128.png',
  '/toddlerfarmanimal/assets/images/icons/icon-144x144.png',
  '/toddlerfarmanimal/assets/images/icons/icon-152x152.png',
  '/toddlerfarmanimal/assets/images/icons/icon-192x192.png',
  '/toddlerfarmanimal/assets/images/icons/icon-384x384.png',
  '/toddlerfarmanimal/assets/images/icons/icon-512x512.png',
  '/toddlerfarmanimal/assets/images/arrow.png',
  '/toddlerfarmanimal/assets/images/background.png',
  '/toddlerfarmanimal/assets/images/chicken_spritesheet.png',
  '/toddlerfarmanimal/assets/images/horse_spritesheet.png',
  '/toddlerfarmanimal/assets/images/logo.png',
  '/toddlerfarmanimal/assets/images/pig_spritesheet.png',
  '/toddlerfarmanimal/assets/images/sheep_spritesheet.png',
];


// install service worker 
self.addEventListener('install', function(event) {
  console.log('sw install');
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('sw caching files');
      return cache.addAll(filesToCache);
    }).catch(function(err) {
      console.log(err);
    })
  );
});

// use cached assets: fetching service worker
self.addEventListener('fetch', (event) => {
  console.log('sw fetch');
  console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    }).catch(function (error) {
      console.log(error);
    })
  );
});

