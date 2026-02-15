import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.get('isLoggedIn')?.value === 'true'
  const pathname = request.nextUrl.pathname

  // السماح بالوصول لصفحة تسجيل الدخول دائماً
  if (pathname === '/login') {
    return NextResponse.next()
  }

  // حماية صفحة المحادثة والأدمن
  if ((pathname === '/chat' || pathname === '/admin') && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/chat', '/admin', '/login'],
}
