const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'spider_ospo'; // Your GitHub repo name

module.exports = {
  assetPrefix: isProd ? `/${repoName}/` : '',
  basePath: isProd ? `/${repoName}` : '',
  images: {
    unoptimized: true, // Fixes <Image /> issues on GitHub Pages
  },
  webpack: (config, { isServer }) => {
    // Define asset prefix for environment variables
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ASSET_PREFIX': JSON.stringify(isProd ? `/${repoName}/` : ''),
      })
    );

    // Resolve modules
    config.resolve.modules.push(__dirname);

    // Fix SVG imports for React
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: '@svgr/webpack',
          options: {
            icon: true,
          },
        },
      ],
    });

    return config;
  },
  devIndicators: {
    autoPrerender: false,
  },
};
