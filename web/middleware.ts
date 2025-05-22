import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  if (
    currentPath.includes('/_next/') ||
    currentPath.includes('/vambeIcon.svg')
  ) {
    return NextResponse.next();
  }

  if (currentPath !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}
