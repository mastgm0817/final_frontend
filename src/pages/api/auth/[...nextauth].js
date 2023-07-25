import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

const nextAuthOptions = (req, res) => {
  return {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
      }),
      KakaoProvider({
        clientId: process.env.KAKAO_CLIENT_ID,
        clientSecret: process.env.KAKAO_CLIENT_SECRET
      }),
      NaverProvider({
        clientId: process.env.NAVER_CLIENT_ID,
        clientSecret: process.env.NAVER_CLIENT_SECRET
      }),
    ],
  };
};

const authHandler = (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default authHandler;