"use client";
import React from "react";
import { useState, useEffect } from "react";
import router from "next/router";
import AuthSession from "./AuthSession";
import Footer from "./../components/ui/Footer";
import Top from "./../components/ui/Top";
import { Provider as ReduxProvider } from "react-redux";
import GoogleAnalytics from "../components/admin/GoogleAnalytics";
import { store } from "../store";
import Image from "next/image";
import "./../public/css/fonts.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 첫방문여부
    if (!sessionStorage.getItem("notFirstVisit")) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("notFirstVisit", "true");
      }, 4000);
    } else {
      setLoading(false);
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
      <body
        style={{
          fontFamily: "Pretendard-Regular",
          backgroundImage:
            'url("https://cdn.lazyrockets.com/homepage/360abb10007541a9b4a3e9f04f7a9343_crumbled-paper-1.jpg")',
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Image src="/image/logo.webp" alt="logo" width={500} height={500} />
          </div>
        )}
        {!loading && (
          <ReduxProvider store={store}>
            <AuthSession>
              <Top />
              <div className="mx-auto max-w-4xl">{children}</div>
              <Footer />
            </AuthSession>
          </ReduxProvider>
        )}
      </body>
    </html>
  );
}
