import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { urlFor } from "@/lib/sanity/client";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="leading-relaxed text-text-muted">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mt-12 text-2xl font-bold tracking-tight text-text">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 text-xl font-semibold text-text">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l border-accent pl-6 text-lg text-text">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="flex flex-col gap-3 text-text-muted">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="flex list-decimal flex-col gap-3 pl-5 text-text-muted">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="flex gap-3">
        <span aria-hidden="true" className="mt-2 h-[5px] w-[5px] shrink-0 bg-accent" />
        <span>{children}</span>
      </li>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-text underline underline-offset-4 transition-colors hover:text-accent-text"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-text">{children}</strong>
    ),
  },
  types: {
    image: ({ value }) => (
      <figure className="my-4">
        <div className="relative aspect-[16/9] w-full border border-border bg-bg-warm">
          <Image
            src={urlFor(value).width(1600).url()}
            alt={value?.alt ?? ""}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
          />
        </div>
        {value?.caption ? (
          <figcaption className="mt-3 text-xs text-text-muted">
            {value.caption}
          </figcaption>
        ) : null}
      </figure>
    ),
    codeBlock: ({ value }) => (
      <pre className="overflow-x-auto border border-border bg-bg-warm p-6 text-sm">
        <code>{value?.code}</code>
      </pre>
    ),
    videoEmbed: ({ value }) =>
      value?.url ? (
        <a
          href={value.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-border p-6 text-sm transition-colors hover:border-accent"
        >
          Watch the video
        </a>
      ) : null,
  },
};

export const PortableBody = ({ value }: { value: PortableTextBlock[] }) => (
  <div className="flex flex-col gap-5">
    <PortableText value={value} components={components} />
  </div>
);
