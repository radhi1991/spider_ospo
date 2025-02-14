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
    config.resolve.modules.push(__dirname);
    return config;
  },
  exportPathMap: async function () {
    return {
      '/': { page: '/' },
      '/projects': { page: '/projects' },
      '/community': { page: '/community' },
      '/cybersecurity_research': { page: '/cybersecurity_research' },
    };
  },
};
