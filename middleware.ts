import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
// import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log(req.nextauth.token);
  }
  //   ,
  //   {
  //     callbacks: {
  //       authorized: ({ token }) => token?.role === "Normal",
  //     },
  //   }
);

export const config = {
  matcher: [
    "/board/:path*",
    "/coupon/:path*",
    "/dateplan/:path*",
    "/price/:path*",
    "/payment/:path*",
    "/admin/:path*",
    "/inquiry/:path*",
  ],
};
