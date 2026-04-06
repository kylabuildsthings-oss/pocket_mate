/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   appDir: true,
  // },
  reactStrictMode: true,
  /** Wallet UIs pull ESM paths; transpiling avoids bad dev chunks / ChunkLoadError on async imports */
  transpilePackages: ["@rainbow-me/rainbowkit", "wagmi"],
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 86_400,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cryptologos.cc",
        pathname: "/**",
      },
    ],
  },
  output: "standalone",
  webpack: (config, { dev, isServer }) => {
    // Persistent webpack disk cache (.next/cache/webpack/*.pack.gz) often breaks on external
    // volumes or when .next is cleared while dev is running — ENOENT / invalid response.
    if (dev) {
      config.cache = false;
    }
    if (isServer) {
      config.externals.push("pino-pretty", "lokijs", "encoding");
    }
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        path: false,
        crypto: false,
        // Optional native deps used by `ws` in browser bundles
        bufferutil: false,
        "utf-8-validate": false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
