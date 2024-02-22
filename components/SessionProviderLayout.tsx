"use client";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export function SessionProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Suspense>{children}</Suspense>
    </SessionProvider>
  );
}
