import { groq } from "next-sanity";

export const portfolioQuery = groq`
  *[_type == "portfolioItem"] | order(coalesce(sortOrder, 999) asc, _createdAt desc) {
    _id,
    title,
    style,
    placement,
    healed,
    image
  }
`;

export const customArtworkQuery = groq`
  *[_type == "customArtwork" && available == true] | order(coalesce(sortOrder, 999) asc, _createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    priceLabel,
    inquiryLink,
    image
  }
`;

export const journalListQuery = groq`
  *[_type == "journalPost" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    heroImage
  }
`;

export const journalBySlugQuery = groq`
  *[_type == "journalPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    heroImage,
    body
  }
`;

export const guestSpotsQuery = groq`
  *[_type == "guestSpot"] | order(coalesce(sortOrder, 999) asc, startDate desc) {
    _id,
    shopName,
    city,
    region,
    country,
    startDate,
    endDate,
    notes,
    bookingUrl,
    image
  }
`;

export const immediateOpeningsQuery = groq`
  *[_type == "immediateOpening" && active == true] | order(coalesce(sortOrder, 999) asc, _createdAt desc) {
    _id,
    title,
    sessionDate,
    blurb
  }
`;

export const specialEventsQuery = groq`
  *[_type == "specialEvent"] | order(coalesce(sortOrder, 999) asc, eventStart desc) {
    _id,
    title,
    eventStart,
    eventEnd,
    location,
    summary,
    body,
    ticketUrl,
    image
  }
`;
