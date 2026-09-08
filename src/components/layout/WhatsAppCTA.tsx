"use client";

import type { ReactNode } from "react";
import { waLink } from "@/lib/site";
import { trackEvent } from "@/lib/analytics";

type WhatsAppCTAProps = {
  message: string;
  /** Identifies where this CTA lives, for the whatsapp_click event. */
  context: string;
  children: ReactNode;
  className?: string;
};

/**
 * The primary conversion action across the site: opens WhatsApp with a
 * context-appropriate prefilled message, so the visitor arrives in chat with
 * their intent already spelled out.
 */
export const WhatsAppCTA = ({
  message,
  context,
  children,
  className,
}: WhatsAppCTAProps) => (
  <a
    href={waLink(message)}
    target="_blank"
    rel="noopener noreferrer"
    className={className}
    onClick={() => trackEvent("whatsapp_click", { context })}
  >
    {children}
  </a>
);
