/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  output: "standalone",
  env: {
    GOOGLE_ID:
      "348049863995-rmkmgpkp5qvtiggpuc162e1hakjs5mo4.apps.googleusercontent.com",
    GOOGLE_SECRET: "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",
    KAKAO_CLIENT_ID: "25edd438130f1d799655087b02557293",
    KAKAO_CLIENT_SECRET: "pcIl6N5qw8Y7s4OtUNZyVpep0xEuVmxf",
    NAVER_CLIENT_ID: "wHHdHmY9FpvrlZv21VRF",
    NAVER_CLIENT_SECRET: "74qcy3l60D",
    CALLBACKURL: process.env.CALLBACKURL,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
// const nextConfig = {
//   experimental: {
//     appDir: true,
//   },
//   output: "standalone",
//   env: {
//     GOOGLE_ID: process.env.NEXT_PUBLIC_GOOGLE_ID,
//     GOOGLE_SECRET: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
//     KAKAO_CLIENT_ID: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID,
//     KAKAO_CLIENT_SECRET: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
//     NAVER_CLIENT_ID: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID,
//     NAVER_CLIENT_SECRET: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET,
//     API_URL: process.env.NEXT_PUBLIC_URL,
//   },
//   images: { unoptimized: true },
// };

// module.exports = nextConfig;
