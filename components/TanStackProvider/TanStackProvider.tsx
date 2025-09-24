"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

type TanStackProviderProps = {
  children: React.ReactNode;
};

const TanStackProvider = ({ children }: TanStackProviderProps) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanStackProvider;
