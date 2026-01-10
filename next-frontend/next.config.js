/** @type {import('next').NextConfig} */
const nextConfig = {
    // Dockerfile expects /app/.next/standalone. Good for optimization as it strips down dependencies
    output: 'standalone',
}

module.exports = nextConfig
