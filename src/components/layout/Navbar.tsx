"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/site";
import { calTrigger } from "@/lib/cal";
import { MobileNav } from "./MobileNav";

const LEFT_LINKS = NAV_LINKS.slice(0, 2);
const RIGHT_LINKS = NAV_LINKS.slice(2);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLink = (link: (typeof NAV_LINKS)[number]) => {
    const active = pathname.startsWith(link.href);
    return (
      <Link
        key={link.label}
        href={link.href}
        aria-current={active ? "page" : undefined}
        className={`px-4 py-2 text-sm transition-colors duration-300 ${
          active
            ? "bg-text-light/15 font-medium text-text-light"
            : "font-normal text-text-light/80 hover:bg-text-light/10 hover:text-text-light"
        }`}
      >
        {link.label}
      </Link>
    );
  };

  return (
    <>
      {/* Floats over the content rather than sitting in the flow, so the hero
          reads full height behind it. The bar stays dark on every ground: it is
          one navbar, not a different one per page. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-40 px-4 pt-4 md:px-8 md:pt-6">
        <div
          className={`glass-nav shell pointer-events-auto flex items-center justify-between gap-8 px-4 py-3 transition-shadow duration-300 md:grid md:grid-cols-[1fr_auto_1fr] md:px-6 ${
            scrolled ? "glass-nav-raised" : ""
          }`}
        >
          <Link
            href="/"
            aria-label="KovaLab home"
            className="shrink-0 md:hidden"
          >
            <Logo variant="dark" priority />
          </Link>

          <nav className="hidden items-center gap-1 justify-self-start md:flex">
            {LEFT_LINKS.map(navLink)}
          </nav>

          <Link
            href="/"
            aria-label="KovaLab home"
            className="hidden transition-transform duration-300 hover:scale-105 md:block"
          >
            <Logo variant="dark" height={40} priority />
          </Link>

          <div className="hidden items-center justify-self-end gap-4 md:flex">
            <nav className="flex items-center gap-1">
              {RIGHT_LINKS.map(navLink)}
            </nav>

            <button
              type="button"
              {...calTrigger()}
              className="bg-text-light px-6 py-3 text-sm font-medium text-dark transition-all duration-300 hover:scale-105 hover:bg-accent"
            >
              Start a project
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="p-2 text-text-light md:hidden"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </div>
      </header>

      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};
