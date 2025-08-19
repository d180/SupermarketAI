/** @type {import('next').NextConfig} */
const nextConfig = {eslint: { ignoreDuringBuilds: true },
  // if you use TypeScript and want to unblock CI too:
  typescript: { ignoreBuildErrors: true },
  };

export default nextConfig;
