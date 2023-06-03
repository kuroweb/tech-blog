/** @type {import('next/dist/next-server/server/config-shared').NextConfig} */

const config = {
  reactStrictMode: true,
  images: {
    domains: ['images.microcms-assets.io', 'flowbite.com'],
  },
}

const removeImports = require('next-remove-imports')()

module.exports = removeImports({
  ...config,
})
