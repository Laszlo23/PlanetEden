import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Investors | Planet Eden",
  description: "Information for investors about Planet Eden",
  robots: "noindex, nofollow", // Prevent indexing of investor page
};

export default function InvestorsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
