/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NAMECHEAP_STORAGE_ENDPOINT: process.env.NAMECHEAP_STORAGE_ENDPOINT,
    NAMECHEAP_STORAGE_REGION: process.env.NAMECHEAP_STORAGE_REGION,
    NAMECHEAP_ACCESS_KEY_ID: process.env.NAMECHEAP_ACCESS_KEY_ID,
    NAMECHEAP_SECRET_ACCESS_KEY: process.env.NAMECHEAP_SECRET_ACCESS_KEY,
    NAMECHEAP_STORAGE_BUCKET_NAME: process.env.NAMECHEAP_STORAGE_BUCKET_NAME,
  },
}

module.exports = nextConfig

