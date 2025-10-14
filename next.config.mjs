import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverSourceMaps: false,
    webpackMemoryOptimizations: true,
  },
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  productionBrowserSourceMaps: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config, { dev }) {
    if (config.cache && !dev) {
      config.cache = Object.freeze({
        type: "memory",
      });
    }
    
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
      {
        test: /\.svg$/i,
        type: "asset",
        resourceQuery: /url/,
      }
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

const withMDX = createMDX()

export default withMDX(nextConfig);
