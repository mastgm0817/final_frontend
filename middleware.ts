import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
// import { getSession } from "next-auth/react";
// import { getServerSession } from "next-auth/next";

export default withAuth(async function middleware(request: NextRequest) {
 
});


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
