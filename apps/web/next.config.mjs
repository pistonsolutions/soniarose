/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side bundle splitting
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // Separate vendor chunks for large libraries
            clerk: {
              test: /@clerk/,
              name: 'clerk',
              priority: 10,
            },
            framer: {
              test: /framer-motion/,
              name: 'framer-motion',
              priority: 10,
            },
            // Default vendors
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    return config;
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', '@clerk/nextjs', 'clsx'],
  },

  // Only use API rewrites in development
  ...(process.env.NODE_ENV === 'development' && {
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:3001/api/:path*',
        },
      ];
    },
  }),
};

export default nextConfig;
