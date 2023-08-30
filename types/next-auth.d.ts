import NextAuth from "next-auth";
import { DateTime } from "next-auth/providers/kakao";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      userRole: string;
    };
  }
}
