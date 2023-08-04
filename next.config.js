/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "export",
  env: {
    GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
    GOOGLE_SECRET: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    KAKAO_CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
    KAKAO_CLIENT_SECRET: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
    NAVER_CLIENT_ID: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
    NAVER_CLIENT_SECRET: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
    API_URL: process.env.NEXT_PUBLIC_URL,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
