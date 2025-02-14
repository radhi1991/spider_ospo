const webpack = require('webpack');

const isProd = process.env.NODE_ENV === 'production';
const repoName = 'spider_ospo';

module.exports = {
  assetPrefix: isProd ? `/${repoName}` : '',
  basePath: isProd ? `/${repoName}` : '',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.ASSET_PREFIX': JSON.stringify(isProd ? `/${repoName}` : ''),
      })
    );

    config.resolve.modules.push(__dirname);

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
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/community': { page: '/community' },
    };
  },
};
