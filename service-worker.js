// // const CACHE_NAME = 'dynamic-cache-v1';

// // self.addEventListener('fetch', (event) => {
// //   if (event.request.url.includes('/api/')) {
// //     event.respondWith(
// //       caches.open(CACHE_NAME).then((cache) => {
// //         return fetch(event.request)
// //           .then((response) => {
// //             cache.put(event.request, response.clone());
// //             return response;
// //           })
// //           .catch(() => {
// //             return cache.match(event.request);
// //           });
// //       })
// //     );
// //   } else {
// //     event.respondWith(
// //       caches.match(event.request).then((response) => {
// //         return response || fetch(event.request);
// //       })
// //     );
// //   }
// // });
// // Import Workbox from the CDN
// // importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

// // if (workbox) {
// //     console.log(`Yay! Workbox is loaded 🎉`);

// //     // Cache API requests
// //     workbox.routing.registerRoute(
// //         ({url}) => url.origin === 'https://jsonplaceholder.typicode.com', // Adjust the URL pattern to your API endpoint
// //         new workbox.strategies.NetworkFirst({
// //             cacheName: 'api-cache',
// //             plugins: [
// //                 new workbox.expiration.ExpirationPlugin({
// //                     maxEntries: 50,
// //                     maxAgeSeconds: 5 * 60, // Cache for 5 minutes
// //                 }),
// //             ],
// //         })
// //     );

// } else {
//     console.log(`Boo! Workbox didn't load 😬`);
// }
