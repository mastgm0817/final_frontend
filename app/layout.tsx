"use client";
import React from "react";
import AuthSession from "./AuthSession";
import MenuListCompotision from "./../components/MenuDrop";
import Footer from "../components/Footer";
import { Provider as ReduxProvider } from "react-redux";
import GoogleAnalytics from "../components/GoogleAnalytics";
import { store } from "../store";
import {useState, useEffect} from 'react';
import router from "next/router";
import Image from "next/image";
// import Top from "../components/Top";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 첫방문여부
    if (!sessionStorage.getItem('notFirstVisit')) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem('notFirstVisit', 'true');
      }, 4000);
    }
  }, []);
  

  useEffect(() => {
    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    window.addEventListener("beforeunload", startLoading);
    router.events.on("routeChangeStart", startLoading);
    router.events.on("routeChangeComplete", stopLoading);
    router.events.on("routeChangeError", stopLoading);

    return () => {
      window.removeEventListener("beforeunload", startLoading);
      router.events.off("routeChangeStart", startLoading);
      router.events.off("routeChangeComplete", stopLoading);
      router.events.off("routeChangeError", stopLoading);
    };
  }, []);

  
  return (
    <html lang="en">
      {/* <GoogleAnalytics trackingId="G-FDVK366KNX" /> */}
      <body>
        {loading && 
          <div style={{
            display: 'flex',
            justifyContent: 'center',  
            alignItems: 'center',    
            height: '100vh'}}>
            <Image src="/image/logo.webp" alt="logo" width={500} height={500} />
          </div>}
        {!loading && <ReduxProvider store={store}>
          <AuthSession>
            {/* <Top /> */}
            <MenuListCompotision />
            <div className="mx-auto max-w-4xl">{children}</div>
            <Footer />
          </AuthSession>
        </ReduxProvider>}
      </body>
    </html>
  );
}
