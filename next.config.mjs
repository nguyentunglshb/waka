/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "307a0e78.vws.vegacdn.vn",
      },
    ],
  },
};

export default nextConfig;
