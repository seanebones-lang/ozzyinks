import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { notFound } from "next/navigation";
import { PortableTextContent } from "@/components/content/PortableText";
import { fetchJournalPost } from "@/lib/sanity/fetch";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchJournalPost(slug);
  if (!post) return { title: "Journal" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchJournalPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto min-w-0 max-w-3xl px-3 py-12 sm:px-4 sm:py-16">
      <Link href="/journal" className="text-sm font-medium text-[var(--pink)] hover:underline">
        ← Journal
      </Link>
      <header className="mt-6 min-w-0">
        <time className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--pink)]">
          {format(new Date(post.publishedAt), "MMMM d, yyyy")}
        </time>
        <h1 className="mt-3 break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
          {post.title}
        </h1>
        {post.excerpt ? <p className="mt-4 text-sm leading-relaxed text-muted">{post.excerpt}</p> : null}
      </header>
      {post.heroUrl ? (
        <div className="card-ink-frame relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10">
          <Image src={post.heroUrl} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 768px" priority />
        </div>
      ) : null}
      <div className="prose-invert mt-10 max-w-none">
        <PortableTextContent value={post.body} />
      </div>
    </article>
  );
}
