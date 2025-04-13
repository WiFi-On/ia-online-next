import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get('refresh_token')?.value;

  const protectedPaths = ['/leads', '/create', '/profile'];
  const isProtectedPath = protectedPaths.some((path) => req.nextUrl.pathname.startsWith(path));

  // Если путь не защищён — просто пропускаем
  if (!isProtectedPath) {
    return NextResponse.next();
  }

  // Если защищён, но нет refresh_token — редирект на /login
  if (!refreshToken) {
    console.log('нет токена, редирект');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  console.log('токен есть, путь защищён — можно пробовать обновлять или пускать');
  return NextResponse.next();
}
