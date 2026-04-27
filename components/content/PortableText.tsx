import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import Link from "next/link";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 font-[family-name:var(--font-syne)] text-2xl font-bold text-white first:mt-0">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 font-[family-name:var(--font-syne)] text-xl font-semibold text-white first:mt-0">{children}</h3>
    ),
    normal: ({ children }) => <p className="mt-4 text-sm leading-relaxed text-white/90 first:mt-0">{children}</p>,
  },
  marks: {
    link: ({ value, children }) => {
      const href = value?.href as string | undefined;
      if (!href) return <span>{children}</span>;
      const external = /^https?:\/\//.test(href);
      if (external) {
        return (
          <a href={href} className="text-[var(--pink)] underline-offset-4 hover:underline" rel="noreferrer noopener" target="_blank">
            {children}
          </a>
        );
      }
      return (
        <Link href={href} className="text-[var(--pink)] underline-offset-4 hover:underline">
          {children}
        </Link>
      );
    },
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic text-white/95">{children}</em>,
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/90">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-white/90">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

type Props = { value: PortableTextBlock[] | null | undefined };

export function PortableTextContent({ value }: Props) {
  if (!value?.length) return null;
  return <PortableText value={value} components={components} />;
}
