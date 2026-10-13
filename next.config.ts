import type { NextConfig } from 'next';

const isPagesDeploy = process.env.GITHUB_ACTIONS === 'true' && process.env.DEPLOY_TARGET === 'pages';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', 'lucide-react'],
  output: isPagesDeploy ? 'export' : undefined,
  basePath: isPagesDeploy ? '/Mahi-UI-Component-Playground' : '',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
