import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = new URL(req.url);
  const token = req.cookies.get("accessTokenMoodyAI")?.value;

  const publicRoutes = ["/login", "/register"];
  
  if (publicRoutes.includes(pathname)) {
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
        headers: {
          "Content-Type": "application/json",
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
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const refreshData = await refreshRes.json();

      if (refreshRes.ok) {
        // forward Set-Cookie headers to client
        const response = NextResponse.next();
        response.cookies.set("accessTokenMoodyAI", refreshData.accessToken, {
          httpOnly: true,
          sameSite: 'strict',
          path: '/'
        });
        response.cookies.set("refreshTokenMoodyAI", refreshData.refreshToken, {
          httpOnly: true,
          sameSite: 'strict',
          path: '/'
        });

        
        return response;
      }
    }

    return NextResponse.redirect(new URL("/login", req.url));
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}