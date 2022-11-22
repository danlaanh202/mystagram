/** @type {import('next').NextConfig} */

const nextConfig = {
  swcMinify: true,
  styledComponents: true,

  cssModules: true,
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    API_URL: "http://localhost:4000",
  },
};

module.exports = nextConfig;
