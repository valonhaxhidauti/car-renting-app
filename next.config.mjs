/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
      // Add SVGR loader
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      });
  
      return config;
    },
  };
  
  export default nextConfig;
