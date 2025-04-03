"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next";
import { Suspense, useState } from "react";
import { AuthenticationProvider } from "@/provider/authentication-provider";
import { LoadingProvider } from "@/provider/LoaderProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserProvider } from "@/provider/User-Provider";
import { Toaster } from "sonner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>NomNom admin</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NuqsAdapter>
              <QueryClientProvider client={queryClient}>
                <LoadingProvider>
                  <AuthenticationProvider>
                    <UserProvider>
                      {children}
                      <Toaster />
                    </UserProvider>
                  </AuthenticationProvider>
                </LoadingProvider>
              </QueryClientProvider>
            </NuqsAdapter>
          </ThemeProvider>
        </Suspense>
      </body>
    </html>
  );
}
