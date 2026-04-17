"use client"

import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { CartProvider } from "@/context/cart-context";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Footer } from "@/components/layout/Footer";
import { Heartbeat } from "@/components/shared/Heartbeat";
import { usePathname } from "next/navigation";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPath = pathname?.startsWith('/admin');

  return (
    <html lang="en" className={`${inter.variable} font-sans scroll-smooth`}>
      <body className="min-h-screen bg-background antialiased flex flex-col">
        <CartProvider>
          <Heartbeat />
          {!isAdminPath && <AnnouncementBar />}
          {!isAdminPath && <Header />}
          <main className={isAdminPath ? "flex-1" : "flex-1 pb-20 md:pb-0"}>
            {children}
          </main>
          {!isAdminPath && <Footer />}
          {!isAdminPath && <BottomNav />}
        </CartProvider>
      </body>
    </html>
  );
}
