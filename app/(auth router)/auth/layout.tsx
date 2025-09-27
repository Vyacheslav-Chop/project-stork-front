import "modern-normalize";
import "../../globals.css";
import { Lato, Comfortaa } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["100", "300", "400", "700", "900"], variable: "--font-lato" });
const comfortaa = Comfortaa({ subsets: ["latin"], weight: ["500", "700"], variable: "--font-comfortaa" });

export default function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;

}>) {
  return (
    <html lang="uk">
      <body className={`${lato.variable} ${comfortaa.variable}`}>
        

          {children}
        
         
      </body>
    </html>
  );
}
