// middleware.js (or middleware.ts for TypeScript)

import { NextResponse } from 'next/server';

export async function middleware(req) {
  const authHeader = req.headers.get('authorization');

  // If no Authorization header or invalid format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json({ message: 'Unauthorized: No token provided' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  console.log(token.data)

//   // Replace this with your token validation logic (e.g., JWT validation)
//   if (token !== 'your-secret-token') {
//     return NextResponse.json({ message: 'Forbidden: Invalid token' }, { status: 403 });
//   }

  // If the token is valid, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/chat'], // Apply this middleware only to specific routes
};
