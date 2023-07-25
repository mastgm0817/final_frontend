import type { AppProps } from "next/app";
import { SessionProvider } from 'next-auth/react'

export default function App1({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
    </SessionProvider>
  );
}