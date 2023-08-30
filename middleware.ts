import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
// import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";

export default withAuth(async function middleware(request: NextRequest) {
  // const sessionToken = request.cookies;
  // console.log("세션토큰:" + sessionToken);
  // const session = await getSession();
  // const session = await getServerSession();
  // if (request.nextUrl.pathname.startsWith("/admin")) {
  //   try {
  //     // Spring Boot 서버로 권한을 검증하기 위한 요청을 보냅니다.
  //     const response = await axios.post('http://localhost:8080/verify', {
  //       token: sessionToken
  //     });
  //     const { role } = response.data;
  //     // 권한이 'ADMIN'이 아니라면 홈으로 리다이렉트합니다.
  //     if (role !== 'ADMIN') {
  //       return NextResponse.redirect('/');
  //     }
  //   } catch (error) {
  //     // 에러 발생 시 홈으로 리다이렉트
  //     return NextResponse.redirect('/');
  //   }
  // }
  //   // return NextResponse.rewrite(new URL("/", request.url));
  //   if (session && session.user.userRole !== "ADMIN") {
  //     return NextResponse.rewrite(new URL("/", request.url));
  //   }
  // }
});

// export default withAuth(
//   function middleware(req: NextRequest) {}

// );

export const config = {
  matcher: [
    "/board/:path*",
    "/coupon/:path*",
    "/dateplan/:path*",
    "/price/:path*",
    "/payment/:path*",
    "/admin/:path*",
  ],
};
