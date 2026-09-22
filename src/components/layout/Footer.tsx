import Link from "next/link";
import { Logo } from "@/components/Logo";
import {
  EMAIL,
  FOOTER_COMPANY,
  FOOTER_SERVICES,
  SOCIALS,
  WHATSAPP_DISPLAY,
  WHATSAPP_URL,
} from "@/lib/site";

export const Footer = () => (
  <footer className="border-t border-border bg-bg">
    <div className="shell grid grid-cols-1 gap-12 px-6 py-16 md:grid-cols-2 md:px-12 md:py-24 lg:grid-cols-4">
      <div className="flex flex-col gap-4">
        <Logo variant="light" />
        <p className="text-xs font-light tracking-wide text-text-muted">
          Software solutions studio
        </p>
        <p className="max-w-[280px] text-sm font-light leading-relaxed text-text-muted">
          Helping businesses across East Africa get online with websites that
          actually work.
        </p>
      </div>

      <div>
        <h2 className="text-xs font-light tracking-wide text-text-muted">
          Services
        </h2>
        <ul className="mt-6 flex flex-col gap-3">
          {FOOTER_SERVICES.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm text-text transition-colors hover:text-accent-text"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xs font-light tracking-wide text-text-muted">
          Company
        </h2>
        <ul className="mt-6 flex flex-col gap-3">
          {FOOTER_COMPANY.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm text-text transition-colors hover:text-accent-text"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-xs font-light tracking-wide text-text-muted">
          Connect
        </h2>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-6 block text-sm text-text transition-colors hover:text-accent-text"
        >
          {EMAIL}
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-sm text-text transition-colors hover:text-accent-text"
        >
          {WHATSAPP_DISPLAY}
        </a>
        <ul className="mt-6 flex items-center gap-5">
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

    <div className="shell flex flex-col gap-2 border-t border-border px-6 py-6 text-xs text-text-muted md:flex-row md:items-center md:justify-between md:px-12">
      <p>&copy; {new Date().getFullYear()} KovaLab. All rights reserved.</p>
      <p>Nairobi, Kenya</p>
    </div>
  </footer>
);
