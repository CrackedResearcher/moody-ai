// components/ProtectedRoute.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  console.log(
    "the autntication hook ran and is givinthis ad rhe result: ",
    isAuthenticated,
    isLoading
  );

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 200 200"
              width="50"
              height="50"
            >
              <circle
                fill="none"
                strokeOpacity="1"
                stroke="#3C45FF"
                strokeWidth=".5"
                cx="100"
                cy="100"
                r="0"
              >
                <animate
                  attributeName="r"
                  calcMode="spline"
                  dur="1.5"
                  values="1;80"
                  keyTimes="0;1"
                  keySplines="0 .2 .5 1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="strokeWidth"
                  calcMode="spline"
                  dur="1.5"
                  values="0;25"
                  keyTimes="0;1"
                  keySplines="0 .2 .5 1"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="strokeOpacity"
                  calcMode="spline"
                  dur="1.5"
                  values="1;0"
                  keyTimes="0;1"
                  keySplines="0 .2 .5 1"
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
          </div>
          <p className="mt-1 font-mono font-bold">
            Hold on, we are taking you to MoodyAI.. in just a moment!
          </p>
        </div>
      </>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
