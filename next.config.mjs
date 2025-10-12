/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://image.invaluable.com/**"
      ),
    ],
  },
};

export default nextConfig;
