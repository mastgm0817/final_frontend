import NextAuth from "next-auth";
import { User } from "next-auth"; // 기본 User 타입 임포트
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider, { DateTime } from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import { log } from "console";

type CustomUser = User & {
  accessToken?: string; // accessToken 속성 추가
  profileImage?: string;
  nickName?: string;
  userRole?: string;
};

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
    CredentialsProvider({
      id: "Credentials",
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // 서버에 요청을 보내 사용자 인증
        if (!credentials) {
          return null;
        }
        const res = await fetch(
          process.env.NEXT_PUBLIC_URL + `/normal/users/authorize`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password, // 필요한 경우 비밀번호도 포함
            }),
          }
        );

        const user = await res.json();

        // 토큰이 유효하면 사용자 반환
        if (user) {
          return user;
        }

        // 인증 실패시 null 반환
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/api/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      // const callBackUrl = process.env.NEXT_PUBLIC_CALLBACKURL as string;
      const callBackUrl = "/test";
      if (account && user) {
        try {
          const loginRes = await fetch(
            process.env.NEXT_PUBLIC_URL + `/users/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                providerName: account.provider,
                nickName: user.name,
                email: user.email,
              }),
            }
          );

          // if (loginRes.ok) {
          //   const data = await loginRes.json();
          //   console.log(data.token);
          //   (user as CustomUser).accessToken = data.token; // 사용자 정의 User 객체에 accessToken을 설정합니다.
          //   return true;
          // }
          if (loginRes.ok) {
            const data = await loginRes.json();
            (user as CustomUser).nickName = data.nickName; // 닉네임을 추가
            (user as CustomUser).userRole = data.userRole; // 유저권한 추가
            (user as CustomUser).accessToken = data.token;
            return true;
          }

          // 상태 코드가 404인 경우, 회원가입 페이지로 리다이렉트
          if (loginRes.status === 404) {
            const loginRes = await fetch(
              process.env.NEXT_PUBLIC_URL + `/users/join`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  providerName: account.provider,
                  nickName: user.name,
                  email: user.email,
                  profileImage: user.image,
                }),
              }
            );
            const responseBody = await loginRes.json();
            const { email, nickName } = responseBody.user;
            const res_email = encodeURIComponent(email);
            const res_nickName = encodeURIComponent(nickName);
            const callbackURL = `/test?email=${res_email}&nickName=${res_nickName}`;

            return callbackURL;
          }

          // return "http://localhost:3000/signup"; // 리다이렉트 URL 반환

          if (loginRes.status !== 404) {
            console.error(loginRes.body);
          }
          return loginRes.ok;
        } catch (error) {
          return false;
        }
      }
      return false; // 로그인 실패
    },

    async jwt({ token, user }: { token: any; user?: CustomUser }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.profileImage = user.profileImage;
        token.nickName = user.nickName;
        token.userRole = user.userRole;
        return token;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
    }: {
      session: any;
      token: any;
      user?: CustomUser;
    }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.accessToken as string;
      if (token.profileImage != null)
        session.user.image = token.profileImage as string;
      if (token.nickName != null) session.user.name = token.nickName as string;
      if (token.userRole != null)
        session.user.userRole = token.userRole as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
