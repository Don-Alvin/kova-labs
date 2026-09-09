"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/Logo";
import { NAV_LINKS, SOCIALS } from "@/lib/site";
import { MobileNav } from "./MobileNav";

// These two pages open on a light ground rather than a dark hero, so the
// navbar can't fade to transparent at the top without losing text contrast.
const SOLID_NAV_PATHS = ["/privacy", "/quote"];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const pathname = usePathname();
  const forceSolid = SOLID_NAV_PATHS.includes(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Transparent over the hero at the top of the page, so the navbar
          reads as part of it rather than a separate bar. The glass container
          fades in once scrolled past the hero, or immediately on pages that
          open on a light ground. */}
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled || forceSolid ? "glass-nav" : ""
        } ${scrolled ? "glass-nav-raised" : ""}`}
      >
        <div className="shell flex items-center justify-between gap-8 px-4 py-5 md:grid md:grid-cols-[1fr_auto_1fr] md:px-6">
          <Link
            href="/"
            aria-label="KovaLab home"
            className="shrink-0 justify-self-start transition-transform duration-300 hover:scale-105"
          >
            <Logo variant="dark" priority />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
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
            })}
          </nav>

          <div className="hidden items-center justify-self-end gap-4 md:flex">
            <ul className="flex items-center gap-2">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center border border-glass-dark-border text-text-light/70 transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d={social.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>

            <Link
              href="/quote"
              className="shrink-0 bg-accent px-4 py-2 text-sm font-medium text-dark transition-transform duration-300 hover:scale-105"
            >
              Get a quote
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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

      <MobileNav open={menuOpen} onClose={closeMenu} />
    </>
  );
};
