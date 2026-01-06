import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Planet Eden",
  description: "A clean, secure, scalable foundation ready for on-chain integration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
