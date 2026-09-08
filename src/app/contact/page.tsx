import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import { CalInline } from "@/components/layout/CalInline";
import { EMAIL, SOCIALS, WHATSAPP_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Book a free call with KovaLab, or reach us on WhatsApp and email. Based in Nairobi, working across East Africa.",
});

export default function ContactPage() {
  return (
    <section className="ground-dark relative -mt-24">
      <div className="shell relative z-10 px-6 pb-16 pt-40 md:px-12 md:pb-24 md:pt-48">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-5xl">
          Let&apos;s talk about your project
        </h1>
        <p className="mt-8 max-w-[58ch] font-light leading-relaxed text-text-light/70">
          Book a time below, or reach out however suits you. The first call is
          free and there is no commitment attached to it.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_320px] lg:gap-16">
          <div className="border border-border-dark bg-dark-card p-2">
            <CalInline />
          </div>

          {/* Paper on the dark ground, the same treatment as the hero's
              contact card, carried over as the whole sidebar here. */}
          <aside className="flex flex-col gap-8 bg-bg p-6 text-left shadow-[var(--shadow-lift)]">
            <div>
              <h2 className="text-xs font-light tracking-wide text-text-muted">
                Email
              </h2>
              <a
                href={`mailto:${EMAIL}`}
                className="mt-3 block text-sm text-text transition-colors hover:text-accent-text"
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
                className="mt-3 block text-sm text-text transition-colors hover:text-accent-text"
              >
                Chat with us
              </a>
            </div>

            <div>
              <h2 className="text-xs font-light tracking-wide text-text-muted">
                Location
              </h2>
              <p className="mt-3 text-sm text-text">Nairobi, Kenya</p>
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
