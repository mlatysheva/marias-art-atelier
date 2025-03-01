import { NextRequest } from 'next/server';

const publicRoutes = ['/auth/login', '/auth/signup'];

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('Authentication')?.value;

  const isPublicRoute = publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  if(!auth && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};