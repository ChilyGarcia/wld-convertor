/** @type {import('next').NextConfig} */

const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
  },
  ...(process.env.NODE_ENV === 'production' && {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  }),
  // Forzar todas las rutas a ser dinámicas
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
