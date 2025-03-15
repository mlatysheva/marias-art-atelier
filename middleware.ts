import { NextRequest } from 'next/server';
import { publicRoutes } from './app/shared/constants/routes';
import authenticated from './app/auth/authenticated';


export async function middleware(request: NextRequest) {
  const isPublicRoute = publicRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route.path)
  );

  if(!(await authenticated()) && !isPublicRoute) {
    return Response.redirect(new URL('/auth/login', request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};