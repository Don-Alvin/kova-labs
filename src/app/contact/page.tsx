import type { Metadata } from "next";
import { CalInline } from "@/components/layout/CalInline";
import { EMAIL, SOCIALS, WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a free call with KovaLab, or reach us on WhatsApp and email. Based in Nairobi, working across East Africa.",
};

export default function ContactPage() {
  return (
    <section>
      <div className="shell px-6 py-16 md:px-12 md:py-24">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
          Let&apos;s talk about your project
        </h1>
        <p className="mt-8 max-w-[58ch] font-light leading-relaxed text-text-muted">
          Book a time below, or reach out however suits you. The first call is
          free and there is no commitment attached to it.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="border border-border">
            <CalInline />
          </div>

          <aside className="flex flex-col gap-8">
            <div>
              <h2 className="text-xs font-light tracking-wide text-text-muted">
                Email
              </h2>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 block text-sm transition-colors hover:text-accent-text"
              >
                {EMAIL}
              </a>
            </div>

            <div>
              <h2 className="text-xs font-light tracking-wide text-text-muted">
                WhatsApp
              </h2>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm transition-colors hover:text-accent-text"
              >
                Chat with us
              </a>
            </div>

            <div>
              <h2 className="text-xs font-light tracking-wide text-text-muted">
                Location
              </h2>
              <p className="mt-3 text-sm">Nairobi, Kenya</p>
              <p className="mt-1 text-sm text-text-muted">
                Working with clients across East Africa, remotely.
              </p>
            </div>

            <div>
              <h2 className="text-xs font-light tracking-wide text-text-muted">
                Elsewhere
              </h2>
              <ul className="mt-4 flex items-center gap-5">
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
          </aside>
        </div>
      </div>
    </section>
  );
}
