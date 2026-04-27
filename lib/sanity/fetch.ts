import type { PortableTextBlock } from "@portabletext/types";
import { sanityClient } from "./client";
import { isSanityConfigured } from "./env";
import { urlForImage } from "./image";
import type { PortfolioItem } from "@/lib/portfolio-data";
import {
  customArtworkQuery,
  guestSpotsQuery,
  immediateOpeningsQuery,
  journalBySlugQuery,
  journalListQuery,
  portfolioQuery,
  specialEventsQuery,
} from "./queries";

type PortfolioRow = {
  _id: string;
  title: string;
  style: string;
  placement?: string | null;
  healed?: boolean | null;
  image: unknown;
};

export async function fetchPortfolioItems(): Promise<PortfolioItem[] | null> {
  if (!isSanityConfigured()) return null;
  const rows = await sanityClient.fetch<PortfolioRow[]>(portfolioQuery);
  return rows
    .map((row) => {
      const img = urlForImage(row.image as Parameters<typeof urlForImage>[0]);
      const src = img?.width(1600).quality(85).url();
      if (!src) return null;
      return {
        id: row._id,
        title: row.title,
        style: row.style,
        placement: row.placement || "",
        healed: Boolean(row.healed),
        src,
      } satisfies PortfolioItem;
    })
    .filter(Boolean) as PortfolioItem[];
}

export type CustomArtworkCard = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  priceLabel: string | null;
  inquiryLink: string | null;
  imageUrl: string;
};

export async function fetchCustomArtwork(): Promise<CustomArtworkCard[] | null> {
  if (!isSanityConfigured()) return null;
  const rows = await sanityClient.fetch<
    {
      _id: string;
      title: string;
      slug: string | null;
      description?: string | null;
      priceLabel?: string | null;
      inquiryLink?: string | null;
      image: unknown;
    }[]
  >(customArtworkQuery);
  return rows
    .map((row) => {
      const img = urlForImage(row.image as Parameters<typeof urlForImage>[0]);
      const imageUrl = img?.width(1400).quality(85).url();
      if (!imageUrl) return null;
      return {
        id: row._id,
        title: row.title,
        slug: row.slug ?? null,
        description: row.description ?? null,
        priceLabel: row.priceLabel ?? null,
        inquiryLink: row.inquiryLink ?? null,
        imageUrl,
      };
    })
    .filter(Boolean) as CustomArtworkCard[];
}

export type JournalListItem = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string | null;
  heroUrl: string | null;
};

export async function fetchJournalList(): Promise<JournalListItem[] | null> {
  if (!isSanityConfigured()) return null;
  const rows = await sanityClient.fetch<
    {
      _id: string;
      title: string;
      slug: string;
      publishedAt: string;
      excerpt?: string | null;
      heroImage: unknown;
    }[]
  >(journalListQuery);
  return rows.map((row) => {
    const hero = urlForImage(row.heroImage as Parameters<typeof urlForImage>[0]);
    return {
      id: row._id,
      title: row.title,
      slug: row.slug,
      publishedAt: row.publishedAt,
      excerpt: row.excerpt ?? null,
      heroUrl: hero?.width(1200).quality(85).url() ?? null,
    };
  });
}

export type JournalPost = {
  id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt: string | null;
  heroUrl: string | null;
  body: PortableTextBlock[] | null;
};

export async function fetchJournalPost(slug: string): Promise<JournalPost | null> {
  if (!isSanityConfigured()) return null;
  const row = await sanityClient.fetch<
    | {
        _id: string;
        title: string;
        slug: string;
        publishedAt: string;
        excerpt?: string | null;
        heroImage: unknown;
        body: PortableTextBlock[] | null;
      }
    | null
  >(journalBySlugQuery, { slug });
  if (!row) return null;
  const hero = urlForImage(row.heroImage as Parameters<typeof urlForImage>[0]);
  return {
    id: row._id,
    title: row.title,
    slug: row.slug,
    publishedAt: row.publishedAt,
    excerpt: row.excerpt ?? null,
    heroUrl: hero?.width(1600).quality(85).url() ?? null,
    body: row.body ?? null,
  };
}

export type GuestSpotCard = {
  id: string;
  shopName: string;
  city: string;
  region: string | null;
  country: string | null;
  startDate: string;
  endDate: string | null;
  notes: string | null;
  bookingUrl: string | null;
  imageUrl: string | null;
};

export async function fetchGuestSpots(): Promise<GuestSpotCard[] | null> {
  if (!isSanityConfigured()) return null;
  const rows = await sanityClient.fetch<
    {
      _id: string;
      shopName: string;
      city: string;
      region?: string | null;
      country?: string | null;
      startDate: string;
      endDate?: string | null;
      notes?: string | null;
      bookingUrl?: string | null;
      image: unknown;
    }[]
  >(guestSpotsQuery);
  return rows.map((row) => {
    const img = urlForImage(row.image as Parameters<typeof urlForImage>[0]);
    return {
      id: row._id,
      shopName: row.shopName,
      city: row.city,
      region: row.region ?? null,
      country: row.country ?? null,
      startDate: row.startDate,
      endDate: row.endDate ?? null,
      notes: row.notes ?? null,
      bookingUrl: row.bookingUrl ?? null,
      imageUrl: img?.width(1200).quality(85).url() ?? null,
    };
  });
}

export type ImmediateOpeningCard = {
  id: string;
  title: string;
  sessionDate: string | null;
  blurb: string | null;
};

export async function fetchImmediateOpenings(): Promise<ImmediateOpeningCard[] | null> {
  if (!isSanityConfigured()) return null;
  return sanityClient.fetch<ImmediateOpeningCard[]>(immediateOpeningsQuery);
}

export type SpecialEventCard = {
  id: string;
  title: string;
  eventStart: string;
  eventEnd: string | null;
  location: string | null;
  summary: string | null;
  body: PortableTextBlock[] | null;
  ticketUrl: string | null;
  imageUrl: string | null;
};

export async function fetchSpecialEvents(): Promise<SpecialEventCard[] | null> {
  if (!isSanityConfigured()) return null;
  const rows = await sanityClient.fetch<
    {
      _id: string;
      title: string;
      eventStart: string;
      eventEnd?: string | null;
      location?: string | null;
      summary?: string | null;
      body: PortableTextBlock[] | null;
      ticketUrl?: string | null;
      image: unknown;
    }[]
  >(specialEventsQuery);
  return rows.map((row) => {
    const img = urlForImage(row.image as Parameters<typeof urlForImage>[0]);
    return {
      id: row._id,
      title: row.title,
      eventStart: row.eventStart,
      eventEnd: row.eventEnd ?? null,
      location: row.location ?? null,
      summary: row.summary ?? null,
      body: row.body ?? null,
      ticketUrl: row.ticketUrl ?? null,
      imageUrl: img?.width(1400).quality(85).url() ?? null,
    };
  });
}
