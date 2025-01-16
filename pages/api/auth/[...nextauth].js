import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000,  
      },
    }),
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", 
    maxAge: 30 * 24 * 60 * 60, 
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
       

      if (account && user) {
        token.accessToken = account.access_token;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token }) {
       
      if (session?.user && token) {
        session.user.id = token.userId;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
  debug: true,
  logger: {
    error: (code, ...message) => console.error(code, ...message),
    warn: (code, ...message) => console.warn(code, ...message),
    debug: (code, ...message) => console.debug(code, ...message),
  },
  events: {
    async signIn(message) {
      console.log("SignIn event:", message);
    },
    async session(message) {
      console.log("Session event:", message);
    },
    async signOut(message) {
      console.log("SignOut event:", message);
    },
  },
};

export default NextAuth(authOptions);
