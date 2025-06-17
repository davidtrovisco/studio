import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export', // permite gerar versão estática
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true, // necessário para next export
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Se o repositório for algo como github.com/davide/meu-site:
  // basePath: '/meu-site'
  // Se o repositório for davide.github.io, NÃO usa basePath
};

export default nextConfig;
