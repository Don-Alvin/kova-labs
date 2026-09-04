import type { Metadata } from "next";
import { EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "What KovaLab collects, why, who else sees it, and how to ask us to delete it. In plain language.",
};

const LAST_UPDATED = "2 September 2026";

export default function PrivacyPage() {
  return (
    <section>
      <div className="shell max-w-[720px] px-6 py-16 md:px-12 md:py-24">
        <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.04em] sm:text-5xl">
          Privacy policy
        </h1>
        <p className="mt-4 text-sm text-text-muted">
          Last updated: {LAST_UPDATED}
        </p>

        <div className="mt-12 flex flex-col gap-10 leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold">The short version</h2>
            <p className="mt-4 text-text-muted">
              We collect very little. We do not sell anything about you to
              anyone. If you want us to delete what we hold, email us and we
              will.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">What we collect</h2>
            <p className="mt-4 text-text-muted">
              If you book a call, we get your name, email address, and whatever
              you write in the booking form. If you email or message us on
              WhatsApp, we have that conversation. If you subscribe to the
              newsletter, we hold your email address.
            </p>
            <p className="mt-4 text-text-muted">
              If you accept cookies, we also collect anonymous information about
              how the site is used: which pages get visited, roughly where in
              the world visitors are, and what kind of device they use. We
              cannot identify you personally from this.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Why we collect it</h2>
            <p className="mt-4 text-text-muted">
              To reply to you, to run the project if you become a client, and to
              understand which parts of this site are useful so we can improve
              them. That is the whole list.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Who else sees it</h2>
            <p className="mt-4 text-text-muted">
              We use a small number of outside services, and each one sees only
              the part it needs:
            </p>
            <ul className="mt-4 flex flex-col gap-3 text-text-muted">
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-[5px] w-[5px] shrink-0 bg-accent" />
                <span>
                  <span className="text-text">Cal.com</span> handles booking, so
                  it receives what you enter when scheduling a call.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-[5px] w-[5px] shrink-0 bg-accent" />
                <span>
                  <span className="text-text">Mailchimp</span> sends the
                  newsletter, so it holds your email address if you subscribed.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-[5px] w-[5px] shrink-0 bg-accent" />
                <span>
                  <span className="text-text">Google Analytics</span> gives us
                  anonymous usage statistics, and only loads if you accept
                  cookies.
                </span>
              </li>
              <li className="flex gap-3">
                <span aria-hidden="true" className="mt-2 h-[5px] w-[5px] shrink-0 bg-accent" />
                <span>
                  <span className="text-text">Vercel</span> hosts the site and
                  processes requests to it.
                </span>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Cookies</h2>
            <p className="mt-4 text-text-muted">
              We ask before setting any analytics cookie. If you decline,
              Google Analytics does not load at all, and nothing about your
              visit is measured. Your choice is stored in your own browser so we
              do not ask again on every page.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Getting your data removed</h2>
            <p className="mt-4 text-text-muted">
              Email{" "}
              <a
                href={`mailto:${EMAIL}`}
                className="text-text underline underline-offset-4 transition-colors hover:text-accent-text"
              >
                {EMAIL}
              </a>{" "}
              and ask. Tell us what you want removed and we will confirm once it
              is done. You do not need to give a reason.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Changes to this policy</h2>
            <p className="mt-4 text-text-muted">
              If we change how any of this works, we will update this page and
              change the date at the top.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
