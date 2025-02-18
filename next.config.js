const isProd = process.env.NODE_ENV === "production";
const assetPrefix = isProd ? "/spider_ospo" : ""; // Replace with your repo name

module.exports = {
  reactStrictMode: true,
  assetPrefix,

  webpack: (config, { isServer }) => {
    // Define ASSET_PREFIX environment variable
    config.plugins.push(
      new (require("webpack")).DefinePlugin({
        "process.env.ASSET_PREFIX": JSON.stringify(assetPrefix),
      })
    );

    // Ensure the root directory is resolved properly
    config.resolve.modules.push(__dirname);

    // Proper SVG handling using @svgr/webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgo: false,
            titleProp: true,
            ref: true,
          },
        },
      ],
    });

    return config;
  },

  images: {
    unoptimized: true, // Required for GitHub Pages (Next.js Image Optimization won't work)
  },

  devIndicators: {
    autoPrerender: false,
  },

  experimental: {
    // Ensures static HTML export works correctly
    appDir: false,
  },
};
