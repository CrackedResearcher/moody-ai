import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/((?!api|_next/static|favicon.ico).*)"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const token = req.cookies.get("accessTokenMoodyAI")?.value;

  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const verifyRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/verify-token`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Cookie: req.headers.get("Cookie") || "",
        },
        body: JSON.stringify({ token }),
      }
    );

    if (verifyRes.ok) return NextResponse.next();

    //  refresh logic
    if (verifyRes.status === 401) {
      const refreshRes = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/refresh`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Cookie: req.headers.get("Cookie") || "",
          },
        }
      );

      if (refreshRes.ok) {
        // forward Set-Cookie headers to client
        const response = NextResponse.next();
        const cookies = refreshRes.headers.get("set-cookie");
        
        if (cookies) {
          cookies.split(/,\s*/).forEach(cookie => {
            response.headers.append("Set-Cookie", cookie);
          });
        }
        
        return response;
      }
    }

    return NextResponse.redirect(new URL("/login", req.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}