importScripts('./sw-toolbox.js');
 
var themePath = '/';
var cacheFiles = [
	'/',
	'/wp-json/wp/v2/cards/',
	'/wp-json/wp/v2/card_categories',
]

//Let's just precache two items
toolbox.precache(cacheFiles);

//We'll see the main.js and main.css appear in the cache anyway!
toolbox.router.default = toolbox.networkFirst;

self.addEventListener("install", function(event) {
  console.log('SW: Installing service worker');
});
