import { useAuth } from "@/hooks/useAuth";
import React, { ComponentType } from "react";
import { useRouter } from 'next/router';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;