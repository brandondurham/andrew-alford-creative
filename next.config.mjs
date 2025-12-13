import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
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
    
    // Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    // Exclude SVG files from the default file loader
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    // Add a new rule to handle SVG imports with @svgr/webpack
    // This rule should come before other rules to ensure it's processed first
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            exportType: "default",
            svgo: false,
          },
        },
      ],
    });

    return config;
  },
};

const withMDX = createMDX()

export default withMDX(nextConfig);
