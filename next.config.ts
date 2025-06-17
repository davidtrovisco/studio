import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // 🔹 fundamental para gerar site estático
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // 🔹 importante para export funcionar
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // 🔹 se o repositório não for do tipo teunome.github.io, ativa o basePath:
 // <--- só se o repo não for teunome.github.io
};

export default nextConfig;
