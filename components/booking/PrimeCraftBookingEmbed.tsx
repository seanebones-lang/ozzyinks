/** PrimeCraft hosted booking — https://primecraft.mothership-ai.com/p/ozzinks */
export const PRIMECRAFT_BOOKING_URL = "https://primecraft.mothership-ai.com/p/ozzinks";

export function PrimeCraftBookingEmbed() {
  return (
    <div className="mt-8 w-full overflow-hidden rounded-2xl border border-white/10 bg-panel shadow-[inset_0_0_0_1px_rgba(255,255,255,0.03)]">
      <iframe
        title="OzzInks booking — PrimeCraft"
        src={PRIMECRAFT_BOOKING_URL}
        className="block h-[min(88dvh,920px)] min-h-[560px] w-full sm:min-h-[640px]"
        allow="payment *; fullscreen; clipboard-read; clipboard-write; publickey-credentials-get *"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  );
}
