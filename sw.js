/*
	We only need to modify 2 places:
		1. cacheName
		2. filesToCache
*/

// register service worker
if ('serviceWorker' in navigator) { // if service worker API is available
  window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js', {scope: '/'}).then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
      }, function(err) {
          console.log('ServiceWorker registration failed: ', err);
      });
  });
}

var cacheName = 'farmAnimal-v1'; /* Name your cache  */
var filesToCache = [				 /* Files you wan to store in cache */
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/js/main.js',
  '/js/phaser.js',
  '/assets/audio/chicken.mp3',
  '/assets/audio/chicken.ogg',
  '/assets/audio/horse.mp3',
  '/assets/audio/horse.ogg',
  '/assets/audio/pig.mp3',
  '/assets/audio/pig.ogg',
  '/assets/audio/sheep.mp3',
  '/assets/audio/sheep.ogg',
  '/assets/images/icons/icon-72x72.png',
  '/assets/images/icons/icon-96x96.png',
  '/assets/images/icons/icon-128x128.png',
  '/assets/images/icons/icon-144x144.png',
  '/assets/images/icons/icon-152x152.png',
  '/assets/images/icons/icon-192x192.png',
  '/assets/images/icons/icon-384x384.png',
  '/assets/images/icons/icon-512x512.png',
  '/assets/images/arrow.png',
  '/assets/images/background.png',
  '/assets/images/chicken_spritesheet.png',
  '/assets/images/horse_spritesheet.png',
  '/assets/images/logo.png',
  '/assets/images/pig_spritesheet.png',
  '/assets/images/sheep_spritesheet.png',
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

