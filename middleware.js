import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  console.log("Middleware executing for path:", req.nextUrl.pathname);

  try {
    const token = await getToken({
      req,
      secret,
      secureCookie: process.env.NODE_ENV === "production",
      raw: false,
    });

    console.log("Token in middleware:", !!token);


    if (req.nextUrl.pathname.startsWith("/api/")) {
      if (!token) {
        console.log("No token found for API route");
        return NextResponse.json(
          { message: "Unauthorized: No token provided" },
          { status: 401 }
        );
      }


      const requestHeaders = new Headers(req.headers);
      requestHeaders.set("x-user-token", JSON.stringify(token));

      console.log("Added x-user-token to headers for:", req.nextUrl.pathname);

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export const config = {
  matcher: [
    "/api/chat",
    "/api/plan", // Ensure /api/plan is included
    // Add other protected routes here
  ],
};
