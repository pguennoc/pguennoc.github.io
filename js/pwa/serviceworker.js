var staticCacheName = "serviceWorker";

var cors_api_url = 'https://cors-anywhere.herokuapp.com/';
var url = 'https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/9EYlGR3a.shu'

var filesToCache = [
    '/js/pwa/',
    'https://cors-anywhere.herokuapp.com/https://planning.univ-rennes1.fr/jsp/custom/modules/plannings/9EYlGR3a.shu'
]


self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll(filesToCache);
        })
    );
});

self.addEventListener('fetch', function (event) {
    var response;
    event.respondWith(caches.match(event.request).catch(function () {
        return fetch(event.request);
    }).then(function (r) {
        response = r;
        caches.open('v1').then(function (cache) {
            cache.put(event.request, response);
        });
        return response.clone();
    }).catch(function () {
        return caches.match('/sw-test/gallery/myLittleVader.jpg');
    }));
});