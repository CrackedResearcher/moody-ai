import { verifyServerToken } from "@/app/api/authActions/verify";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const { isAuthenticated } = await verifyServerToken();
        setIsAuthenticated(isAuthenticated);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  return { isAuthenticated, isLoading };
};