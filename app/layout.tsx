"use client";
import React from "react";
import Provider from "./provider";
import Top from "../components/Top";
import Footer from "../components/Footer";
import { Provider as ReduxProvider } from "react-redux";
import { SessionProvider } from "next-auth/react";

import { store } from "../store";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider store={store}>
          <SessionProvider>
            <div className="mx-auto max-w-4xl">
              <Top />
              {children}
              <Footer />
            </div>
          </SessionProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
