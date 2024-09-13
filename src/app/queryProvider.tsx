"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* {process.env.NEXT_PUBLIC_ENV !== "production" ||
        "PRODUCTION" ||
        ("Production" &&  */}
      <ReactQueryDevtools initialIsOpen={false} />
      {/* )} */}
    </QueryClientProvider>
  );
};

export default ReactQueryProvider;
