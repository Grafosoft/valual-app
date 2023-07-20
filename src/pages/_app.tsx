import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/React";
import { SessionProvider } from 'next-auth/react'
import React from "react";

export default function App({ Component, 
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
    <NextUIProvider>
      <Component {...pageProps} />
    </NextUIProvider></SessionProvider>
  );
}
