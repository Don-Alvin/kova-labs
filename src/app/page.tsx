"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Logo } from "@/components/Logo";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "254700000000";
const WHATSAPP_MESSAGE =
  "Hi, I'm interested in a website for my business";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  WHATSAPP_MESSAGE
)}`;

const SOCIALS = [
  {
    label: "X",
    href: "https://x.com/kovalab",
    path: "M13.6 10.6 21 2h-1.8l-6.4 7.5L7.6 2H2l7.8 11.3L2 22h1.8l6.8-7.9 5.4 7.9H22L13.6 10.6Zm-2.4 2.8-.8-1.1L4.4 3.3h2.7l5.1 7.3.8 1.1 6.6 9.4h-2.7l-5.4-7.7Z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/kovalab",
    path: "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.75-1.95C21.4 8.75 22 11 22 14v7h-4v-6.2c0-1.5-.03-3.4-2.1-3.4-2.1 0-2.4 1.6-2.4 3.3V21h-4V9Z",
  },
  {
    label: "GitHub",
    path: "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 12 2Z",
    href: "https://github.com/Don-Alvin",
  },
];

export default function ComingSoonPage() {
  const container = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(".entrance", { opacity: 1, scale: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".entrance-logo", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        delay: 0.3,
      })
        .to(
          ".entrance-headline",
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.35"
        )
        .to(".entrance-subtext", { opacity: 1, duration: 0.6 }, "-=0.3")
        .to(".entrance-contact", { opacity: 1, duration: 0.5 }, "-=0.25")
        .to(".entrance-social", { opacity: 1, duration: 0.4 }, "-=0.2");
    },
    { scope: container }
  );

  return (
    <main
      ref={container}
      className="bg-drift flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-16 text-center"
    >
      <Logo variant="dark" className="entrance entrance-logo" />

      <h1 className="entrance entrance-headline max-w-[600px] text-2xl font-bold tracking-tight text-[color:var(--text-light)] md:text-4xl">
        Something new is coming
      </h1>

      <p className="entrance entrance-subtext max-w-[480px] text-base leading-relaxed text-[color:var(--text-muted-dark)]">
        We&apos;re building a home for KovaLab. A software solutions studio helping
        businesses across East Africa get online.
      </p>

      <div className="entrance entrance-contact flex flex-col items-center gap-3 text-sm min-[400px]:flex-row min-[400px]:gap-4">
        <a
          href="mailto:hello@kovalab.co.ke"
          className="text-[color:var(--text-muted-dark)] transition-colors hover:text-[color:var(--text-light)]"
        >
          hello@kovalab.co.ke
        </a>
        <span
          aria-hidden="true"
          className="hidden h-1 w-1 bg-[color:var(--accent)] min-[400px]:block"
        />
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[color:var(--text-muted-dark)] transition-colors hover:text-[color:var(--text-light)]"
        >
          Chat with us
        </a>
      </div>

      <ul className="entrance entrance-social flex items-center gap-6">
        {SOCIALS.map((social) => (
          <li key={social.label}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="block text-[color:var(--text-muted-dark)] transition-colors hover:text-[color:var(--text-light)]"
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
    </main>
  );
}
