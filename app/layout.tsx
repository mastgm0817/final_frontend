import Provider from "./provider";
import Top from "../components/Top";
import Footer from "../components/Footer";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <Top />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}