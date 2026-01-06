"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WalletConnect } from "./WalletConnect";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Discover" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "/story", label: "Story" },
    { href: "/roadmap", label: "Roadmap" },
    { href: "/vision", label: "Vision" },
  ];

  return (
    <nav className="border-b border-dark-border bg-dark-surface/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="text-xl font-bold text-dark-accent">
              Planet Eden
            </Link>
            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? "text-dark-accent bg-dark-surfaceHover"
                      : "text-dark-textMuted hover:text-dark-text hover:bg-dark-surfaceHover"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <WalletConnect />
          </div>
        </div>
      </div>
    </nav>
  );
}
