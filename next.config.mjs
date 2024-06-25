/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // comment below if no need static export
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
