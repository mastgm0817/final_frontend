import Footer from "../src/components/Footer";
import Top from "../src/components/Top";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Top />

      <div>
        <main>{children}</main>
      </div>

      <Footer />
    </div>
  );
}
