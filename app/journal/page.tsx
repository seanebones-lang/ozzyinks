import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { fetchJournalList } from "@/lib/sanity/fetch";
import { isSanityConfigured } from "@/lib/sanity/env";

export const metadata: Metadata = {
  title: "Journal",
  description: "Studio updates, process notes, and news from Ozzy Fox.",
};

export const revalidate = 60;

export default async function JournalPage() {
  const posts = await fetchJournalList();
  const empty = !posts?.length;

  return (
    <div className="mx-auto min-w-0 max-w-6xl px-3 py-12 sm:px-4 sm:py-16">
      <header className="mb-10 max-w-2xl min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Writing</p>
        <h1 className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
          Journal
        </h1>
        <p className="mt-3 text-sm text-muted">Behind-the-scenes, travel notes, and what&apos;s happening in the chair.</p>
      </header>

      {empty ? (
        <div className="rounded-2xl border border-white/10 bg-panel p-8 text-sm text-muted">
          {isSanityConfigured()
            ? "No posts yet. Publish a “Journal” document in Sanity to see it here."
            : "Connect Sanity to publish journal entries from the CMS."}
        </div>
      ) : (
        <ul className="grid gap-6 sm:grid-cols-2">
          {posts!.map((post) => (
            <li key={post.id}>
              <Link
                href={`/journal/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel transition hover:border-[var(--pink)]/35"
              >
                {post.heroUrl ? (
                  <div className="relative aspect-[16/10] w-full">
                    <Image
                      src={post.heroUrl}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width:640px) 100vw, 50vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <time className="text-xs font-medium uppercase tracking-wide text-[var(--pink)]">
                    {format(new Date(post.publishedAt), "MMM d, yyyy")}
                  </time>
                  <h2 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-white group-hover:text-[var(--pink)]">
                    {post.title}
                  </h2>
                  {post.excerpt ? <p className="text-sm text-muted line-clamp-3">{post.excerpt}</p> : null}
                  <span className="mt-auto pt-2 text-sm font-medium text-[var(--pink)]">Read →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
