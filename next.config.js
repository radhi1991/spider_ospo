const isProd = process.env.NODE_ENV === "production";
const repoName = "spider_ospo"; 

module.exports = {
  reactStrictMode: true,
  assetPrefix: isProd ? `/${repoName}/` : "",
  basePath: isProd ? `/${repoName}` : "",
  trailingSlash: true,
  images: {
    unoptimized: true, // This is needed for static exports
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, 
        path: false,
      };
    }
    return config;
  },
};
