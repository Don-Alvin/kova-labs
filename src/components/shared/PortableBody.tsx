import Image from "next/image";
import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { urlFor } from "@/lib/sanity/client";

type TableCell = { _key?: string; value?: PortableTextBlock[] };
type TableRow = { _key?: string; cells?: TableCell[] };
type PortableTextTable = { headerRows?: number; rows?: TableRow[] };

const tableCellComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <>{children}</>,
  },
};

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="font-light leading-relaxed text-text-muted">{children}</p>
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
        target={value?.href?.startsWith("/") ? undefined : "_blank"}
        rel={value?.href?.startsWith("/") ? undefined : "noopener noreferrer"}
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
    table: ({ value }) => {
      const table = value as PortableTextTable;
      const rows = Array.isArray(table.rows) ? table.rows : [];
      const headerRows = Math.max(
        0,
        Math.min(Number.isFinite(table.headerRows) ? table.headerRows : 0, rows.length)
      );
      const renderCells = (row: TableRow, header: boolean) =>
        (row.cells ?? []).map((cell, cellIndex) => {
          const content = cell.value?.length ? (
            <PortableText value={cell.value} components={tableCellComponents} />
          ) : null;

          return header ? (
            <th
              key={cell._key ?? cellIndex}
              scope="col"
              className="border border-border bg-bg-warm px-4 py-3 text-left text-sm font-semibold text-text"
            >
              {content}
            </th>
          ) : (
            <td
              key={cell._key ?? cellIndex}
              className="border border-border px-4 py-3 align-top text-sm text-text-muted"
            >
              {content}
            </td>
          );
        });

      if (!rows.length) return null;

      return (
        <div className="my-8 overflow-x-auto">
          <table className="w-full min-w-max border-collapse text-left">
            {headerRows > 0 ? (
              <thead>
                {rows.slice(0, headerRows).map((row, rowIndex) => (
                  <tr key={row._key ?? rowIndex}>{renderCells(row, true)}</tr>
                ))}
              </thead>
            ) : null}
            <tbody>
              {rows.slice(headerRows).map((row, rowIndex) => (
                <tr key={row._key ?? headerRows + rowIndex}>{renderCells(row, false)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },
  },
};

export const PortableBody = ({ value }: { value: PortableTextBlock[] }) => (
  <div className="flex flex-col gap-5">
    <PortableText value={value} components={components} />
  </div>
);
