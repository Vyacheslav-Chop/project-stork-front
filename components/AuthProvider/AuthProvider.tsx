"use client";

import { getUser, refresh } from "@/lib/api/apiClient";
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
    const fetchUser = async () => {
      const isAuthenticated = await refresh();
      if (isAuthenticated) {
        const res = await getUser();
        if (res) setUser(res.data);
      } else {
        clearIsAuthenticated();
        toast.error('Будь ласка зареєструйтесь!');
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
