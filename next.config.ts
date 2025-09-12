/** @type {import("next").NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http", // <-- pakai http, bukan https
        hostname: "127.0.0.1", // <-- hanya hostname tanpa http://
        port: "8000", // <-- port dipisah
        pathname: "/**",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

module.exports = nextConfig;
