import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "DESARROLLO WEB NEA | Webs y sistemas que trabajan por tu negocio",
    template: "%s | DESARROLLO WEB NEA",
  },
  description:
    "Páginas web, catálogos digitales, sistemas de gestión y aplicaciones web para comercios, profesionales y empresas del NEA.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body
        className={`${inter.variable} ${sora.variable} font-body antialiased bg-tech-black text-slate-light`}
      >
        {children}
      </body>
    </html>
  );
}
