import "modern-normalize";
import "./globals.css";
import { Lato, Comfortaa } from "next/font/google";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import HeaderWrapper from "./HeaderWrapper";
import BreadcrumbsWrapper from "./BreadcrumbsWrapper";
import css from "./page.module.css";

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
  title: "Лелека — онлайн-трекер для майбутніх мам",
  icons: {
    icon: "/icons/favicon.ico",
    apple: "/icons/apple-touch-icon.png",
  },
  description:
    "Ведіть щоденник вагітності, відстежуйте завдання та насолоджуйтесь шляхом до материнства разом із Лелекою.",
  keywords: [
    "вагітність",
    "щоденник вагітності",
    "трекер вагітності",
    "онлайн для мам",
    "майбутні мами",
  ],
  openGraph: {
    title: "Лелека — онлайн-трекер для майбутніх мам",
    description:
      "Зручний інструмент для відстеження вагітності, завдань і щоденних нотаток.",
    url: "https://project-stork-front.vercel.app",
    siteName: "Лелека",
    images: [
      {
        url: "/image/meta_main.png",
        width: 1200,
        height: 630,
        alt: "Лелека — онлайн-трекер для майбутніх мам",
      },
    ],
    type: "website",
    locale: "uk_UA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Лелека — онлайн-трекер для майбутніх мам",
    description:
      "Щоденник вагітності з корисними завданнями та нагадуваннями для майбутніх мам.",
    images: ["/image/meta_main.png"],
  },
};

export default function RootLayout({
  children,
  sidebar,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
  sidebar: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        <TanStackProvider>
          <AuthProvider>
            <div>
              <HeaderWrapper />
            </div>
            <div className={css.appLayout}>
              <aside className={css.sidebar}>{sidebar}</aside>

              <main>
                <BreadcrumbsWrapper />
                <div>{children}</div>
              </main>
            </div>
            {modal}
          </AuthProvider>
          <Toaster position="top-center" reverseOrder={false} />
        </TanStackProvider>
      </body>
    </html>
  );
}
