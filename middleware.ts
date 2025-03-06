import { NextRequest } from 'next/server';
import { AUTHENTICATION_COOKIE } from './app/auth/auth-cookie';
import { publicRoutes } from './app/shared/constants/routes';


export function middleware(request: NextRequest) {
  const auth = request.cookies.get(AUTHENTICATION_COOKIE)?.value;

  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route.path)
  );

  if(!auth && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};