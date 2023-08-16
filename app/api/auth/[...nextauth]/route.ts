import NextAuth from "next-auth";
import { User } from "next-auth"; // 기본 User 타입 임포트
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";

type CustomUser = User & {
  accessToken?: string; // accessToken 속성 추가
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
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // 서버에 요청을 보내 사용자 인증
        console.log(credentials);
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
              provider: "credentials", // 여기에 적절한 프로바이더 값을 설정해야 합니다.
              nickName: credentials.nickName,
              email: credentials.email,
              password: credentials.password, // 필요한 경우 비밀번호도 포함
            }),
          }
        );

        const user = await res.json();
        console.log(user);

        // 토큰이 유효하면 사용자 반환
        if (user) {
          console.log("user 값 반환" + user);
          return user;
        }

        // 인증 실패시 null 반환
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/api/auth/error",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
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
                provider: account.provider,
                nickName: user.name,
                email: user.email,
              }),
            }
          );

          if (loginRes.ok) {
            const data = await loginRes.json();
            console.log(data.token);
            (user as CustomUser).accessToken = data.token; // 사용자 정의 User 객체에 accessToken을 설정합니다.
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
                  provider: account.provider,
                  nickName: user.name,
                  email: user.email,
                  profileImage: user.image,
                }),
              }
            );

            return "http://localhost:3000";
            // return "http://localhost:3000/signup"; // 리다이렉트 URL 반환
          }
          console.log("이거나오면 안됨");
          return loginRes.ok;
        } catch (error) {
          console.error("토큰 발급실패");
          return false;
        }
      }
      return false; // 로그인 실패
    },

    async jwt({ token, user }: { token: any; user?: CustomUser }) {
      if (user) {
        token.accessToken = user.accessToken;
        return token;
      }
      return token;
    },

    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.id = token.accessToken as string;
      // console.log("token", token);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
