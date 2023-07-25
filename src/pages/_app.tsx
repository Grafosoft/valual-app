import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from 'next-auth/react'
import React from "react";
import { NavbarLogin } from "../../components/navbar/Navbar";
import {ThemeProvider as NextThemesProvider} from "next-themes";


export default function App({ Component, 
  pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    
    <NextUIProvider>
    <NextThemesProvider attribute="class" defaultTheme="system"  
        ><SessionProvider session={session}>
      <NavbarLogin />
      
      <Component {...pageProps} /></SessionProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
