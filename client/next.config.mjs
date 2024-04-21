/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["upload.wikimedia.org"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      }
    ]
  },
};

export default nextConfig;
