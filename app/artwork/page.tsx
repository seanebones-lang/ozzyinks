import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { fetchCustomArtwork } from "@/lib/sanity/fetch";
import { isSanityConfigured } from "@/lib/sanity/env";

export const metadata: Metadata = {
  title: "Available custom artwork",
  description: "Original pieces and custom artwork available from Ozzy Fox.",
};

export const revalidate = 60;

export default async function ArtworkPage() {
  const items = await fetchCustomArtwork();
  const empty = !items?.length;

  return (
    <div className="mx-auto min-w-0 max-w-6xl px-3 py-12 sm:px-4 sm:py-16">
      <header className="mb-10 max-w-2xl min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Commissions</p>
        <h1 className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
          Available custom artwork
        </h1>
        <p className="mt-3 text-sm text-muted">
          Pieces open for purchase or as tattoo-ready references. Reach out from a listing or start a booking request.
        </p>
      </header>

      {empty ? (
        <div className="rounded-2xl border border-white/10 bg-panel p-8 text-sm text-muted">
          {isSanityConfigured()
            ? "No artwork is listed yet. Add entries in Sanity under “Available custom artwork”."
            : "Connect Sanity (see .env.example) to manage this section from the CMS."}
        </div>
      ) : (
        <div className="grid gap-6 min-[520px]:grid-cols-2 lg:grid-cols-3">
          {items!.map((item) => (
            <article
              key={item.id}
              className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel transition hover:border-[var(--pink)]/30"
            >
              <div className="card-ink-frame relative aspect-[4/5]">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width:520px) 100vw, (max-width:1024px) 50vw, 33vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h2 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-white">{item.title}</h2>
                {item.priceLabel ? <p className="text-sm text-[var(--pink)]">{item.priceLabel}</p> : null}
                {item.description ? <p className="text-sm text-muted">{item.description}</p> : null}
                <div className="mt-auto flex flex-wrap gap-2 pt-2">
                  {item.inquiryLink ? (
                    <a
                      href={item.inquiryLink}
                      className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/20 px-4 text-sm font-medium text-white transition hover:border-[var(--pink)] hover:text-[var(--pink)]"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      Inquire
                    </a>
                  ) : null}
                  <Link
                    href="/book"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--pink)] px-4 text-sm font-medium text-black transition hover:brightness-110"
                  >
                    Book related tattoo
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
