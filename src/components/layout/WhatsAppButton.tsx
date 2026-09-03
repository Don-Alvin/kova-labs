"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { prefersReducedMotion } from "@/lib/animations";
import { WHATSAPP_URL } from "@/lib/site";

export const WhatsAppButton = () => {
  const link = useRef<HTMLAnchorElement>(null);

  useGSAP(() => {
    if (!link.current) return;

    if (prefersReducedMotion()) {
      gsap.set(link.current, { opacity: 1, y: 0 });
      return;
    }

    gsap.to(link.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: 2,
      ease: "power3.out",
      onComplete: () => {
        gsap.to(link.current, {
          scale: 1.08,
          duration: 0.35,
          repeat: -1,
          repeatDelay: 5,
          yoyo: true,
          ease: "power2.inOut",
        });
      },
    });
  }, []);

  return (
    <a
      ref={link}
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 translate-y-6 items-center justify-center bg-whatsapp text-dark opacity-0"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.47s1.06 2.86 1.21 3.06c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35ZM12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.32l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.19 4.23-9.41 9.42-9.41a9.36 9.36 0 0 1 9.41 9.42c0 5.19-4.23 9.42-9.42 9.42ZM20.520 3.49A11.76 11.76 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.59 5.93L.08 24l6.35-1.66a11.83 11.83 0 0 0 5.62 1.43h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.4-8.39Z" />
      </svg>
    </a>
  );
};
