import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      httpOptions: {
        timeout: 10000, // Increase timeout to 10 seconds to avoid callback errors
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, user }) {
      if (session?.user && user) {
        session.user.id = user.id;
        session.user.email = user.email;
      }
      return session;
    },

    async signIn({ account, profile }) {
      if (account?.provider === "github") {
        console.log("GitHub sign-in attempt:", profile);
      }
      return true;
    },
    async error(error) {
      console.error("NextAuth error:", error);
      return error;
    },
  },
  debug: process.env.NODE_ENV === "development", // Enable debug logs in development
});
