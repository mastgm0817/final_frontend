import NextAuth from "next-auth";
import axios from "axios";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId:
        "348049863995-rmkmgpkp5qvtiggpuc162e1hakjs5mo4.apps.googleusercontent.com",
      clientSecret: "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",
    }),
    KakaoProvider({
      clientId: "25edd438130f1d799655087b02557293",
      clientSecret: "pcIl6N5qw8Y7s4OtUNZyVpep0xEuVmxf",
    }),
    NaverProvider({
      clientId: "wHHdHmY9FpvrlZv21VRF",
      clientSecret: "74qcy3l60D",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account && user) {
        try {
          const response = await fetch(
            process.env.NEXT_PUBLIC_URL + `/users/join`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                provider: account.provider,
                nickName: user.name,
                email: user.email,
                profileImage: user.image,
              }),
            }
          );

          const data = await response.text(); // 응답을 텍스트로 처리

          if (response.status === 201) {
            console.log("회원가입 성공:", data);
            return true; // 로그인 성공
          } else {
            console.error("회원가입 기존존재?:", data);
            return true; // 로그인 실패
          }
        } catch (error) {
          console.error("회원가입 에러:", error);
          return false; // 로그인 실패
        }
      }
      console.log(user);
      return false; // 로그인 실패
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.sub as string;
      // console.log("token", token);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
