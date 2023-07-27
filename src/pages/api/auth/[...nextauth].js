import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials"

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

      CredentialsProvider({
        id : 'telephone',
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "jsmith" },
            password: {  label: "Password", type: "password" }
          },
          async authorize(credentials, req) {

            const res = await fetch("http://localhost:8080/auth/login", {
              method: 'POST',
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email : credentials?.email,
                password : credentials?.password,
              }),
            })
            const user = await res.json()
      
            // 인증되었음
            if (user) {
              return user
            }
            // 인증되지 않음
            return null
          }
        })
    ],
    callbacks:{
      // async profile(profile) {
      //   // 사용자 정보 가공
      //   return {
      //     ...profile,
      //     userName: profile.name, // name 키를 userName으로 변경
      //   };
      // },
      async jwt({token, user}){
        return { ...token, ...user};
      },
      // async session({ session, token, user}){
      //   session.user = token as any;
      //   return session;
      // },
    }
  };
};

const authHandler = (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default authHandler;