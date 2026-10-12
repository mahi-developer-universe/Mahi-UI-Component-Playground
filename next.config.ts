import type { NextConfig } from 'next';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', 'lucide-react'],
  output: isGithubActions ? 'export' : undefined,
  basePath: isGithubActions ? '/Mahi-UI-Component-Playground' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
