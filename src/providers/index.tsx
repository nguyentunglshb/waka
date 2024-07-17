"use client";

import { SessionProvider } from "next-auth/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import QueryProvider from "./query-provider";

const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SpeedInsights />
      <SessionProvider>
        <QueryProvider>{children}</QueryProvider>
      </SessionProvider>
    </>
  );
};

export default Provider;
