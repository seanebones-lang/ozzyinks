import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Frequently asked questions about booking, deposits, and sessions with Ozzy Fox.",
};

const faqs = [
  {
    q: "How do I book?",
    a: "Use the Book page to submit your project details. Ozzy reviews requests and follows up with next steps for approved work.",
  },
  {
    q: "Why is there a $100 deposit?",
    a: "The deposit locks your slot and serious project intent. It applies toward your final session total.",
  },
  {
    q: "Can I reschedule?",
    a: "Yes — give at least 48 hours’ notice when possible so your deposit can move to a new date.",
  },
  {
    q: "How does pricing work?",
    a: "Pricing depends on size, placement, detail, and time. Submit references and dimensions in your booking request for the most accurate guidance.",
  },
  {
    q: "What is Fox Concierge?",
    a: "It’s the site’s AI assistant for FAQs and booking guidance. It doesn’t replace Ozzy for final creative decisions.",
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto min-w-0 max-w-3xl px-3 py-12 sm:px-4 sm:py-16">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--pink)]">Help</p>
      <h1 className="break-words font-[family-name:var(--font-syne)] text-3xl font-bold min-[400px]:text-4xl sm:text-5xl">
        FAQ
      </h1>
      <dl className="mt-8 space-y-8 sm:mt-10">
        {faqs.map((item) => (
          <div key={item.q} className="min-w-0">
            <dt className="break-words font-[family-name:var(--font-syne)] text-lg font-semibold text-white">{item.q}</dt>
            <dd className="mt-2 text-sm leading-relaxed text-muted">{item.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
