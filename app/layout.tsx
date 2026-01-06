import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planet Eden",
  description: "A clean, secure, scalable foundation ready for on-chain integration",
};

import { Navigation } from "@/components/Navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-dark-bg text-dark-text antialiased">
        <Navigation />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
