importScripts('./sw-toolbox.js');

var cacheFiles = [
	'https://wyllen.github.io/pwa',
]

//Let's just precache two items
toolbox.precache(cacheFiles);

//We'll see the main.js and main.css appear in the cache anyway!
toolbox.router.default = toolbox.networkFirst;

self.addEventListener("install", function(event) {
  console.log('SW: Installing service worker');
});
