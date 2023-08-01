import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import baseConst from './data/const'

// If the incoming request has the "beta" cookie
// then we'll rewrite the request to /beta
export async function middleware(request: NextRequest) {
  const { cookies, nextUrl } = <any>request
  if (cookies && cookies?.get('token')) {
    const token = cookies?.get('token')

    //cookie is exist //check cookie
    const response = await fetch(baseConst.apiUrl + 'user/', {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const { status } = response
    if (status == 200) {
      if (['/login/', '/register/'].includes(nextUrl.pathname)) {
        const home = new URL('/', request.url)

        return NextResponse.redirect(home)
      }
      return NextResponse.next()
    }
  }
  if (['/login/', '/register/'].includes(nextUrl.pathname) === false) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }
}

// Supports both a single value or an array of matches

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images|favicon.png|api).*)']
}
