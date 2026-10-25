"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { exhibitionInfo } from "@/lib/exhibition";

const navItems = [
  { href: "/works", label: "Works" },
  { href: "/about", label: "About" },
  { href: "/visit", label: "Visit" },
];

export default function Header() {
  const pathname = usePathname();
  // The home page ("/") renders its own full-bleed header inside MainHero.
  if (pathname === "/") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {exhibitionInfo.title}
        </Link>
        <nav className="flex gap-6 text-sm">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:opacity-60">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
