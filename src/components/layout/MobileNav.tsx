"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight, X } from "lucide-react";
import {
  EMAIL,
  FOOTER_COMPANY,
  NAV_LINKS,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/site";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
};

export const MobileNav = ({ open, onClose }: MobileNavProps) => {
  const panel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    if (open) window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useGSAP(
    () => {
      if (!open || !panel.current) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        panel.current,
        { xPercent: 100 },
        { xPercent: 0, duration: 0.4 }
      ).fromTo(
        ".mobile-nav-item",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05 },
        "-=0.15"
      );
    },
    { dependencies: [open], scope: panel }
  );

  if (!open) return null;

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-accent text-dark md:hidden"
    >
      {/* The wordmark, blown up and rotated into a strip along the left
          edge: background typography rather than a framed logo, echoing
          the mark treatment used elsewhere on dark grounds. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 flex w-24 items-center justify-center overflow-hidden opacity-15 sm:w-32"
      >
        <span className="origin-center -rotate-90 whitespace-nowrap text-[8rem] font-extrabold leading-none tracking-tight sm:text-[10rem]">
          kovalab
        </span>
      </div>

      <div className="relative z-10 flex items-center justify-between px-6 pt-6 sm:px-10">
        <p className="mobile-nav-item text-xs font-light tracking-wide">
          Navigation
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="mobile-nav-item flex items-center gap-2 text-xs font-light tracking-wide"
        >
          Close
          <X size={16} strokeWidth={1.5} />
        </button>
      </div>

      <nav className="relative z-10 mt-10 flex flex-1 flex-col justify-center px-6 sm:px-10">
        {NAV_LINKS.map((link) => {
          const active = pathname.startsWith(link.href);
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={onClose}
              aria-current={active ? "page" : undefined}
              className="mobile-nav-item group flex items-center justify-between border-b border-dark/15 py-5"
            >
              <span className="text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl">
                {link.label}
              </span>
              <ArrowUpRight
                size={22}
                strokeWidth={1.5}
                className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          );
        })}
      </nav>

      <div className="relative z-10 flex flex-col gap-8 px-6 pb-8 sm:px-10">
        <div className="mobile-nav-item">
          <p className="text-xs font-light tracking-wide">Explore</p>
          <ul className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
            {FOOTER_COMPANY.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="text-sm underline underline-offset-4"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mobile-nav-item">
          <p className="text-xs font-light tracking-wide">Contact</p>
          <a href={`mailto:${EMAIL}`} className="mt-3 block text-sm">
            {EMAIL}
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-sm"
          >
            {WHATSAPP_DISPLAY}
          </a>
        </div>

        <div className="mobile-nav-item flex flex-col gap-1 border-t border-dark/15 pt-6 text-xs font-light sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <p>&copy; {new Date().getFullYear()} KovaLab. All rights reserved.</p>
          <p>Nairobi, Kenya</p>
        </div>
      </div>
    </div>
  );
};
