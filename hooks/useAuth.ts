// hooks/useAuth.ts
'use client';

import { create } from 'zustand';
import { useEffect, useMemo } from 'react';

interface AuthStore {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  isLoading: true,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setLoading: (value) => set({ isLoading: value }),
}));

export function useAuth() {

    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isLoading = useAuthStore((state) => state.isLoading);
    const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
    const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const checkAuth = async () => {
        try {
          console.log("Starting auth check");
          const response = await fetch('/api/auth/check', {
            method: 'GET',
            credentials: 'include',
          });
          console.log("Response status:", response.status);
          console.log("Response ok:", response.ok);
          
          useAuthStore.setState({ 
            isAuthenticated: response.ok,
            isLoading: false,
          });
        } catch (error) {
          console.error("Auth check error:", error);
          useAuthStore.setState({ 
            isAuthenticated: false,
            isLoading: false,
          });
        }
      };

    console.log("----ending this api endpoint------");
    checkAuth();
  }, []);

  return {
    isAuthenticated,
    isLoading,
    setAuthenticated,
    setLoading,
  };
}