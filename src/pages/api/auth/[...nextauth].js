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
        id: 'email-Credentials',
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "email" },
            password: {  label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
              console.log(credentials);
              const email = credentials.email;
              const password = credentials.password;
                if(email === "mastgm0817@gmail.com" && password === "1234"){
                    return credentials;
                }
                throw new Error("아이디 혹은 패스워드가 틀립니다.");

          //   const res = await fetch("http://localhost:8080/api/login", {
          //     method: 'POST',
          //     headers: { "Content-Type": "application/json" },
          //     body: JSON.stringify({
          //       email : credentials?.email,
          //       password : credentials?.password,
          //     }),
          //   })
          //   const user = await res.json()
      
          //   // 인증되었음
          //   if (user) {
          //     return user
          //   }
          //   // 인증되지 않음
          //   return null
          }
        })
    ],
    callbacks:{
      callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            token.userId = 123;
            token.test = "test";
            return token;
        },
        async session(session, userOrToken) {
            session.user.userId = userOrToken.userId;
            session.user.test = userOrToken.test;
            return session
        }
    }
    }
  };
};

const authHandler = (req, res) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default authHandler;