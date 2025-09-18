import type { Metadata } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import AppContainer from "../../common/AppContainer";
import "./globals.css";

export const metadata: Metadata = {
  title: "T&T Group",
  description: "Điều khiển mô hình và quản lý bất động sản",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <MantineProvider>
          <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column"}}>
            <Header />
            <main style={{ flex: 1 }}>
              <AppContainer>{children}</AppContainer>
            </main>
            <Footer />
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
