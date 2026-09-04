"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export const NewsletterSignup = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: { message?: string } = await response.json();

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      setMessage(
        data.message ?? "Almost there. Check your inbox to confirm."
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("We could not reach the server. Please try again.");
    }
  };

  return (
    <section className="ground-dark relative">
      <div className="shell relative z-10 flex flex-col gap-8 px-6 py-20 md:px-12 md:py-24 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div>
          <h2 className="max-w-[42ch] text-2xl font-bold leading-[1.05] tracking-[-0.04em] text-text-light sm:text-3xl">
            Practical notes on getting your business online
          </h2>
          <p className="mt-4 max-w-[42ch] font-light leading-relaxed text-text-muted-dark">
            Occasional posts on websites, payments, and analytics for East
            African businesses. No spam, unsubscribe anytime.
          </p>
        </div>

        <form
          onSubmit={submit}
          className="flex w-full shrink-0 flex-col gap-3 lg:w-[400px]"
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="glass-dark w-full px-4 py-4 text-sm text-text-light placeholder:text-text-light/40"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 bg-accent px-6 py-4 text-sm font-medium text-dark transition-transform duration-300 hover:scale-105-light hover:text-dark disabled:opacity-60"
            >
              {status === "loading" ? "Sending" : "Subscribe"}
            </button>
          </div>

          {message ? (
            <p
              role="status"
              className={`text-sm ${
                status === "error" ? "text-accent" : "text-text-muted-dark"
              }`}
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
};
