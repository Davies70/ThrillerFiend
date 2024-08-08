module.exports = {
  globDirectory: 'dist/',
  globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,gif}'],
  swDest: 'dist/service-worker.js',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/jsonplaceholder\.typicode\.com\/.*$/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 5 * 60, // 5 minutes
        },
      },
    },
  ],
};
