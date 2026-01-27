import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    // Allow access to login and onboarding pages
    if (path.startsWith('/login') || path === '/parent/onboarding') {
      return NextResponse.next()
    }

    // Protect parent routes (except onboarding)
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

      // TODO: Verify parent owns this child
      // Extract childId from path: /child/[childId]/...
      // const childId = path.split('/')[2]
      // const parentId = token.sub
      //
      // const child = await prisma.child.findFirst({
      //   where: {
      //     id: childId,
      //     parentId: parentId
      //   }
      // })
      //
      // if (!child) {
      //   return NextResponse.redirect(new URL('/parent/dashboard', req.url))
      // }

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
          path.startsWith('/api/auth')
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
