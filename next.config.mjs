/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Ignore unused variable lint warnings during build for development prototypes
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
