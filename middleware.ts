// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define which routes require authentication
const protectedRoutes = ['/dashboard', '/profile', '/settings']
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('accessTokenMoodyAI')
  const pathname = request.nextUrl.pathname
  
  // If the user is not logged in and trying to access a protected route
  if (!currentUser && protectedRoutes.includes(pathname)) {
    const response = NextResponse.redirect(new URL('/login', request.url))
    
    // Add ?from= parameter to redirect back after login
    response.cookies.set({
      name: 'redirect_url',
      value: pathname,
      httpOnly: true,
      path: '/',
      maxAge: 60 * 5, // 5 minutes
    })
    
    return response
  }
  
  // If the user is logged in and trying to access auth routes (login/register)
  if (currentUser && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}