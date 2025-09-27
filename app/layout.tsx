import "modern-normalize";
import "./globals.css";
import { Lato, Comfortaa } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import HeaderWrapper from "./HeaderWrapper";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  variable: "--font-lato",
});

const comfortaa = Comfortaa({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-comfortaa",
});

export const metadata: Metadata = {
  title: "Leleka",
  description: "Зручний онлайн-трекер для майбутніх мам",
  openGraph: {
    title: "Leleka",
    description: "Зручний онлайн-трекер для майбутніх мам",
    url: "https://Leleka.app",
    images: "",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <Header />
            <Breadcrumbs />
            <aside>{sidebar}</aside>

            <main>{children}</main>
            {modal}
            <HeaderWrapper />

            <main>
              <Breadcrumbs />
              <div>{children}</div>
            </main>
            {modal}
          </AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </TanStackProvider>
      </body>
    </html>
  );
}
