import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 1. Extract the role and token from cookies
  const token = request.cookies.get('meritos_token')?.value
  const role = request.cookies.get('meritos_role')?.value
  const { pathname } = request.nextUrl

  // 2. Define the Mapping of Dashboard Paths to Required Roles
  const roleMapping: Record<string, string> = {
    '/dash/founder': 'founder_group',
    '/dash/student': 'student',
    '/dash/researcher': 'researcher',
    '/dash/corp': 'corporation',
    '/dash/investor': 'investor',
    '/dash/gov': 'government',
    '/dash/admin': 'admin',
  }

  // 3. Protection Logic for any path starting with /dash
  if (pathname.startsWith('/dash')) {
    
    // IF NOT LOGGED IN: Redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // IF LOGGED IN BUT TRYING TO ACCESS WRONG ROLE DASHBOARD:
    // Check if the current path matches the user's role
    const currentPathEntry = Object.entries(roleMapping).find(([path]) => 
      pathname.startsWith(path)
    )

    if (currentPathEntry) {
      const [path, requiredRole] = currentPathEntry
      
      if (role !== requiredRole) {
        // Redirect them back to their authorized dashboard
        const authorizedPath = Object.keys(roleMapping).find(
          key => roleMapping[key] === role
        ) || '/login'
        
        return NextResponse.redirect(new URL(authorizedPath, request.url))
      }
    }
  }

  // 4. Redirect logged-in users away from Login/Landing if they already have a session
  if ((pathname === '/login' || pathname === '/') && token && role) {
    const authorizedPath = Object.keys(roleMapping).find(
      key => roleMapping[key] === role
    )
    if (authorizedPath) {
      return NextResponse.redirect(new URL(authorizedPath, request.url))
    }
  }

  return NextResponse.next()
}

// 5. Configure the Middleware to only run on dashboard routes for performance
export const config = {
  matcher: ['/dash/:path*', '/login', '/'],
}