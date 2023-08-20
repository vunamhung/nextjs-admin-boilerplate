import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { verifyAuth } from '@/utilities';

export async function middleware(request: NextRequest) {
  const verifiedToken = await verifyAuth(request).catch(console.error);

  if (!verifiedToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/products/:path*', '/orders/:path*', '/promotions/:path*', '/reviews/:path*', '/finance/:path*'],
};
