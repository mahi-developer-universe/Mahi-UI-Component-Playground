import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', 'lucide-react'],
  images: {
    unoptimized: true
  }
};

export default nextConfig;
