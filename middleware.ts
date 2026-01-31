import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Allow access to login, onboarding pages, and public APIs
    if (
      path.startsWith('/login') ||
      path === '/parent/onboarding' ||
      path === '/api/parent/children'
    ) {
      return NextResponse.next()
    }

    // Protect parent routes (except onboarding and APIs)
    if (path.startsWith('/parent')) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url))
      }
      return NextResponse.next()
    }

    // Protect child routes
    if (path.startsWith('/child')) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url))
      }

      // RBAC Note: Parent-child ownership verification cannot be done here
      // because middleware runs in Edge runtime where Prisma is not available.
      //
      // Ownership verification is handled in:
      // 1. app/child/[childId]/layout.tsx - Server-side RBAC check
      // 2. GET /api/auth/verify-child-access - API endpoint for client-side checks
      //
      // The layout uses verifyParentOwnsChild() from lib/rbac.ts to ensure
      // the logged-in parent owns the child before rendering any child routes.

      return NextResponse.next()
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname

        // Public routes - always allow
        if (
          path === '/' ||
          path.startsWith('/login') ||
          path === '/parent/onboarding' ||
          path.startsWith('/styleguide') ||
          path.startsWith('/hud-demo') ||
          path.startsWith('/components-demo') ||
          path.startsWith('/privacy') ||
          path.startsWith('/api/auth') ||
          path === '/api/parent/children'
        ) {
          return true
        }

        // Protected routes - require token
        if (path.startsWith('/parent') || path.startsWith('/child')) {
          return !!token
        }

        // Default: allow
        return true
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
