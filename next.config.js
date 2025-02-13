const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'spider_ospo'; 
const assetPrefix = isProd ? `/${repoName}` : '';
const basePath = isProd ? `/${repoName}` : '';

module.exports = {
  assetPrefix,
  basePath,
  images: {
    unoptimized: true, // Fixes <Image /> component issues on GitHub Pages
  },
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]___[hash:base64:5]',
    url: false,
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ASSET_PREFIX': JSON.stringify(assetPrefix),
      }),
    );

    config.resolve.modules.push(__dirname);

    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: 'babel-loader',
        },
        {
          loader: 'react-svg-loader',
          options: {
            jsx: true, // true outputs JSX tags
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
