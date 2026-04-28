import type { Metadata } from "next";
import Image from "next/image";
import { format } from "date-fns";
import { PortableTextContent } from "@/components/content/PortableText";
import { fetchGuestSpots, fetchSpecialEvents } from "@/lib/sanity/fetch";
import { isSanityConfigured } from "@/lib/sanity/env";

export const metadata: Metadata = {
  title: "Guest spots & events",
  description: "Upcoming guest spots and special events with Ozzy Fox.",
};

export const revalidate = 60;

function formatRange(start: string, end?: string | null) {
  const s = new Date(start);
  if (!end) return format(s, "MMM d, yyyy");
  const e = new Date(end);
  if (format(s, "yyyy-MM") === format(e, "yyyy-MM")) {
    return `${format(s, "MMM d")} – ${format(e, "d, yyyy")}`;
  }
  return `${format(s, "MMM d, yyyy")} – ${format(e, "MMM d, yyyy")}`;
}

export default async function SchedulePage() {
  const [spots, events] = await Promise.all([fetchGuestSpots(), fetchSpecialEvents()]);
  const spotsEmpty = !spots?.length;
  const eventsEmpty = !events?.length;

  return (
    <div className="mx-auto min-w-0 max-w-6xl px-3 py-12 sm:px-4 sm:py-16">
      <header className="mb-12 max-w-2xl min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">On the road</p>
        <h1 className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
          Guest spots & special events
        </h1>
        <p className="mt-3 text-sm text-muted">
          Where to find Ozzy next — guest residencies, conventions, and one-off events.
        </p>
      </header>

      <section id="guest-spots" className="mb-16 scroll-mt-28">
        <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white">Guest spots</h2>
        {spotsEmpty ? (
          <p className="mt-4 rounded-2xl border border-white/10 bg-panel p-6 text-sm text-muted">
            {isSanityConfigured()
              ? "No guest spots listed. Add “Guest spot” documents in Sanity."
              : "Connect Sanity to manage guest spots."}
          </p>
        ) : (
          <ul className="mt-6 grid gap-6 lg:grid-cols-2">
            {spots!.map((spot) => (
              <li
                key={spot.id}
                className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-panel sm:flex-row"
              >
                {spot.imageUrl ? (
                  <div className="relative aspect-[4/3] w-full shrink-0 sm:max-w-[220px] sm:aspect-auto sm:min-h-[200px]">
                    <Image src={spot.imageUrl} alt="" fill className="object-cover" sizes="(max-width:640px) 100vw, 220px" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="font-[family-name:var(--font-syne)] text-lg font-semibold text-white">{spot.shopName}</h3>
                  <p className="text-sm text-[var(--pink)]">
                    {[spot.city, spot.region, spot.country].filter(Boolean).join(", ")}
                  </p>
                  <p className="text-sm text-muted">{formatRange(spot.startDate, spot.endDate)}</p>
                  {spot.notes ? <p className="text-sm leading-relaxed text-white/85">{spot.notes}</p> : null}
                  {spot.bookingUrl ? (
                    <a
                      href={spot.bookingUrl}
                      className="mt-auto inline-flex min-h-11 max-w-fit items-center rounded-full border border-white/20 px-4 text-sm font-medium text-white transition hover:border-[var(--pink)] hover:text-[var(--pink)]"
                      rel="noreferrer noopener"
                      target="_blank"
                    >
                      Book with host
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="special-events" className="scroll-mt-28">
        <h2 className="font-[family-name:var(--font-syne)] text-2xl font-bold text-white">Special events</h2>
        {eventsEmpty ? (
          <p className="mt-4 rounded-2xl border border-white/10 bg-panel p-6 text-sm text-muted">
            {isSanityConfigured()
              ? "No events yet. Add “Special event” entries in Sanity."
              : "Connect Sanity to list events."}
          </p>
        ) : (
          <ul className="mt-6 space-y-8">
            {events!.map((ev) => (
              <li key={ev.id} className="rounded-2xl border border-white/10 bg-panel p-5 sm:p-8">
                <div className="flex flex-col gap-6 lg:flex-row">
                  {ev.imageUrl ? (
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl border border-white/10 lg:max-w-md">
                      <Image src={ev.imageUrl} alt="" fill className="object-cover" sizes="(max-width:1024px) 100vw, 448px" />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-[family-name:var(--font-syne)] text-xl font-semibold text-white">{ev.title}</h3>
                    <p className="mt-2 text-sm text-[var(--pink)]">
                      {format(new Date(ev.eventStart), "EEE, MMM d, yyyy · p")}
                      {ev.eventEnd ? ` – ${format(new Date(ev.eventEnd), "p")}` : ""}
                    </p>
                    {ev.location ? <p className="mt-1 text-sm text-muted">{ev.location}</p> : null}
                    {ev.summary ? <p className="mt-4 text-sm leading-relaxed text-white/90">{ev.summary}</p> : null}
                    <div className="mt-4 max-w-none">
                      <PortableTextContent value={ev.body} />
                    </div>
                    {ev.ticketUrl ? (
                      <a
                        href={ev.ticketUrl}
                        className="mt-4 inline-flex min-h-11 items-center rounded-full bg-[var(--pink)] px-5 text-sm font-medium text-black transition hover:brightness-110"
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        Details / tickets
                      </a>
                    ) : null}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
