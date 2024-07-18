"use client";
import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


type Props = {
  children: React.ReactNode;
};

const TanstackProvider = ({ children }: Props) => {
  const [queryClient] = useState(()=>new QueryClient());

  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default TanstackProvider;
