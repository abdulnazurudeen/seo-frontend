import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// If the incoming request has the "beta" cookie
// then we'll rewrite the request to /beta
export function middleware(request: NextRequest) {
  const { cookies } = <any>request
  console.log('middlware', cookies?.get('token'), request.nextUrl.pathname)
  // Example function to validate auth
  if (cookies && cookies?.get('token')) {
    return NextResponse.next()
  }

  const loginUrl = new URL('/login', request.url)
  // loginUrl.searchParams.set('from', request.nextUrl.pathname)

  return NextResponse.redirect(loginUrl)
}

// Supports both a single value or an array of matches

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|favicon.png|api|login).*)']
}
