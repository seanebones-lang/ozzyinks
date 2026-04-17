import { NEXTELEVEN_URL } from "@/lib/constants";

type Variant = "footer" | "chat";

export function NextelevenSignature({ variant }: { variant: Variant }) {
  const label = variant === "footer" ? "Made by Nexteleven" : "Powered by Nexteleven";
  return (
    <a
      href={NEXTELEVEN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="text-xs text-muted hover:text-accent transition underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pink)]"
      aria-label={`${label} — opens Nexteleven Studios`}
    >
      {label}
    </a>
  );
}
