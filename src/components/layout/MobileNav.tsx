"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const panel = useRef<HTMLDialogElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const dialog = panel.current;
    if (!dialog || !open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    if (desktop.matches) {
      onClose();
      return;
    }
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>("button")?.focus();
    document.body.style.overflow = "hidden";
    const onResize = () => { if (desktop.matches) onClose(); };
    desktop.addEventListener("change", onResize);
    return () => {
      desktop.removeEventListener("change", onResize);
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [open, onClose]);

  return (
    <dialog
      id="mobile-menu"
      ref={panel}
      aria-label="Site menu"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )).filter((element) => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      className="mobile-menu fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none flex-col overflow-y-auto border-0 bg-accent p-0 text-dark"
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
    </dialog>
  );
};
