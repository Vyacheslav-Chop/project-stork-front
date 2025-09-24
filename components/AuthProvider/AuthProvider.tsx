"use client";

import { getUser } from "@/lib/api/apiClient";
import { useAuth } from "@/lib/store/authStore";
import { useEffect } from "react";
import toast from "react-hot-toast";

type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuth((state) => state.setUser);
  const clearIsAuthenticated = useAuth((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await getUser();

        if (!response.data) {
          clearIsAuthenticated();
          return;
        }

        setUser(response.data);
      } catch {
        clearIsAuthenticated();
        toast.error("Please login or sign up to continue.");
      }
    };
    fetchSession();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
