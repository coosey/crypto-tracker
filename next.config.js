const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([]);

module.exports = withPlugins([
  [
    {
      pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
    },
  ],
  withTM,
]);
