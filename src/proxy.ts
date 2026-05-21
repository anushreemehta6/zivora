// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token

//     if (token?.role !== "ADMIN") {
//       return NextResponse.redirect(new URL("/403", req.url))
//     }
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token
//     }
//   }
// )

// export const config = {
//   matcher: ["/api/admin/:path*"]
// }

// import { getToken } from "next-auth/jwt"
// import { withAuth } from "next-auth/middleware"
// import { NextResponse } from "next/server"

// export default withAuth(
//   function middleware(req) {
//     const token = req.nextauth.token

//     // ❌ Not logged in
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       )
//     }

//     // ❌ Not admin
//     if (token.role !== "ADMIN") {
//       return NextResponse.json(
//         { error: "Admin only" },
//         { status: 403 }
//       )
//     }
   
    
//     // ✅ Allow
//     return NextResponse.next()
    
//   },
//   {
//     callbacks: {
//       authorized: () => true 
//     }
//   }
// )

// export const config = {
//   matcher: ["/api/admin/:path*"]
// }



import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const { pathname } = req.nextUrl

    console.log("PATH:", pathname)
    console.log("TOKEN:", token)

    // ❌ Not logged in
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url))
    }

    // ❌ Not admin trying to access admin route
    if (pathname.startsWith("/admin") && token.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/", req.url))
    }
    // console.log("TOKEN:", token)

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: () => true
    }
  }
)

export const config = {
  matcher: ["/admin/:path*"]
}