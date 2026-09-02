"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { NAV_LINKS, SOCIALS } from "@/lib/site";
import { calTrigger } from "@/lib/cal";

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
    <div className="fixed inset-0 z-50 md:hidden">
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 h-full w-full bg-dark/40"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="absolute right-0 top-0 flex h-full w-[85%] max-w-sm flex-col justify-between border-l border-border bg-bg p-6"
      >
        <div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="mobile-nav-item p-2 text-text-muted transition-colors hover:text-text"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                aria-hidden="true"
              >
                <path d="M5 5l14 14M19 5L5 19" />
              </svg>
            </button>
          </div>

          <nav className="mt-8 flex flex-col">
            {NAV_LINKS.map((link) => {
              const active = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={onClose}
                  className={`mobile-nav-item border-b border-border py-4 text-xl transition-colors ${
                    active
                      ? "font-medium text-text"
                      : "font-normal text-text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <button
            type="button"
            {...calTrigger()}
            className="mobile-nav-item mt-8 w-full bg-text px-6 py-4 text-sm font-medium text-text-light transition-colors hover:bg-accent"
          >
            Start a project
          </button>
        </div>

        <ul className="mobile-nav-item flex items-center gap-6 pt-8">
          {SOCIALS.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="block text-text-muted transition-colors hover:text-text"
              >
                <svg
                  width="18"
                  height="18"
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
      </div>
    </div>
  );
};
