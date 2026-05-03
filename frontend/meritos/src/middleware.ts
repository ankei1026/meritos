import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Extract the role and token from cookies
  const token = request.cookies.get('meritos_token')?.value
  const role = request.cookies.get('meritos_role')?.value
  const { pathname } = request.nextUrl

  // 2. Define the Mapping of Dashboard Paths to Required Roles
  const roleMapping: Record<string, string> = {
    '/dash/student': 'student',
    '/dash/founder': 'founder',
    '/dash/researcher': 'researcher',
    '/dash/investor': 'investor',
    '/dash/corporation': 'corporation',
    '/dash/government': 'government',
    '/dash/admin': 'admin',
  }

  // 3. Protection Logic for any path starting with /dash
  if (pathname.startsWith('/dash')) {
    
    // IF NOT LOGGED IN: Redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Demo mode: allow switching between all dashboard variants.
    if (token === 'demo-token-123') {
      return NextResponse.next()
    }

    // IF LOGGED IN BUT TRYING TO ACCESS WRONG ROLE DASHBOARD:
    // Check if the current path matches the user's role
    const currentPathEntry = Object.entries(roleMapping).find(([path]) =>
      pathname === path || pathname.startsWith(`${path}/`)
    )

    if (currentPathEntry) {
      const [path, requiredRole] = currentPathEntry
      
      if (role !== requiredRole) {
        // Keep unauthorized users inside dashboard hub instead of bouncing to a role route.
        return NextResponse.redirect(new URL('/dash', request.url))
      }
    }
  }

  // 4. Keep auth pages reachable even when a session exists.
  // This supports role switching / new sign-up flows from the landing page.

  return NextResponse.next()
}

// 5. Configure the Middleware to only run on dashboard routes for performance
export const config = {
  matcher: ['/dash/:path*', '/login', '/signup', '/'],
}