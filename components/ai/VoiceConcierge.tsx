"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle, Mic, Send, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NextelevenSignature } from "@/components/branding/NextelevenSignature";
import { trackEvent } from "@/lib/analytics";
import type { ChatMessage } from "@/types/chat";

type Recognition = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((ev: Event) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

export function VoiceConcierge() {
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recogRef = useRef<Recognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as {
      SpeechRecognition?: new () => Recognition;
      webkitSpeechRecognition?: new () => Recognition;
    };
    const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = "en-US";
    r.interimResults = true;
    r.continuous = false;
    r.onresult = (ev: Event) => {
      const e = ev as unknown as {
        resultIndex: number;
        results: ArrayLike<{ 0: { transcript: string } }>;
      };
      let text = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        text += e.results[i][0].transcript;
      }
      setTranscript(text);
    };
    r.onerror = () => setListening(false);
    r.onend = () => setListening(false);
    recogRef.current = r;
  }, []);

  const sendUserText = useCallback(
    async (raw: string) => {
      const userText = raw.trim();
      if (!userText) return;
      setLoading(true);
      setError(null);
      trackEvent("chatbot_message_sent");
      const nextMessages: ChatMessage[] = [...messages, { role: "user", content: userText }];
      setMessages(nextMessages);
      setInput("");
      setTranscript("");
      try {
        const res = await fetch("/api/ai/voice-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: nextMessages }),
        });
        const data = await res.json();
        if (!res.ok || !data.ok) throw new Error(data.message || "Assistant unavailable");
        const reply = data.reply as string;
        setMessages([...nextMessages, { role: "assistant", content: reply }]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
      } finally {
        setLoading(false);
      }
    },
    [messages],
  );

  function toggleListen() {
    const r = recogRef.current;
    if (!r) {
      setError("Voice input not supported in this browser — use text.");
      return;
    }
    if (listening) {
      r.stop();
      setListening(false);
      return;
    }
    setError(null);
    setTranscript("");
    try {
      r.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  }

  async function flushVoice() {
    const t = transcript.trim();
    if (!t) return;
    setListening(false);
    try {
      recogRef.current?.stop();
    } catch {
      /* ignore */
    }
    await sendUserText(t);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          trackEvent("chatbot_opened");
        }}
        className="fixed z-[90] flex h-14 w-14 min-h-[3.5rem] min-w-[3.5rem] items-center justify-center rounded-full border border-[var(--pink)]/50 bg-[#120612] text-[var(--pink)] shadow-[0_0_40px_rgba(255,45,166,0.35)] transition hover:brightness-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--pink)]"
        style={{
          bottom: "max(1.25rem, env(safe-area-inset-bottom, 0px))",
          right: "max(1.25rem, env(safe-area-inset-right, 0px))",
        }}
        aria-label="Open Fox Concierge chat"
      >
        <MessageCircle className="h-6 w-6" />
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-[95] flex items-end justify-end bg-black/60 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))] pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))] sm:items-center sm:justify-end sm:pt-[max(2rem,env(safe-area-inset-top))] sm:pr-[max(2rem,env(safe-area-inset-right))] sm:pb-[max(2rem,env(safe-area-inset-bottom))] sm:pl-[max(2rem,env(safe-area-inset-left))]"
          role="dialog"
          aria-modal="true"
          aria-label="Fox Concierge"
        >
          <div className="glass-panel neon-ring flex h-[min(640px,min(90dvh,calc(100svh-2rem)))] w-full max-w-md flex-col overflow-hidden rounded-2xl">
            <div className="flex min-w-0 items-center justify-between gap-2 border-b border-white/10 px-3 py-3 sm:px-4">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--pink)]">Fox Concierge</p>
                <p className="text-sm leading-snug text-white/90">Ask Ozzy’s studio assistant</p>
              </div>
              <button
                type="button"
                className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white"
                aria-label="Close chat"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm">
              {messages.length === 0 ? (
                <p className="text-muted">
                  Yo — I’m Fox Concierge for Ozzy. I can help with ideas, placement, prep, pricing ranges, booking steps,
                  and deposits. Want to start your tattoo request now?
                </p>
              ) : null}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-4 max-w-[85%] rounded-2xl bg-white/10 px-3 py-2 break-words text-white sm:ml-6"
                      : "mr-4 max-w-[95%] break-words text-white/90 sm:mr-6"
                  }
                >
                  {m.content}
                </div>
              ))}
              {listening ? <p className="text-xs text-muted">Listening… {transcript}</p> : null}
              {error ? <p className="text-xs text-red-400">{error}</p> : null}
              <div className="flex flex-wrap gap-2 pt-2">
                <Quick onClick={() => setInput("How do deposits work?")} label="Deposits" />
                <Quick onClick={() => setInput("What should I include in my booking request?")} label="Booking help" />
                <Link
                  href="/book"
                  onClick={() => trackEvent("chatbot_booking_handoff_clicked")}
                  className="text-xs font-semibold text-[var(--pink)] underline-offset-4 hover:underline"
                >
                  Open booking form
                </Link>
              </div>
            </div>
            <div className="border-t border-white/10 p-3">
              <div className="flex min-w-0 gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message…"
                  enterKeyHint="send"
                  className="form-control min-h-11 min-w-0 flex-1 rounded-xl border border-white/15 bg-black/40 px-3 py-3 text-white outline-none focus:border-[var(--pink)] md:py-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      void sendUserText(input);
                    }
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="aspect-square min-w-11 shrink-0 px-0"
                  onClick={toggleListen}
                  aria-pressed={listening}
                  aria-label={listening ? "Stop listening" : "Speak"}
                >
                  <Mic className="h-5 w-5" aria-hidden />
                </Button>
                <Button
                  type="button"
                  className="aspect-square min-w-11 shrink-0 px-0"
                  onClick={() => void sendUserText(input)}
                  disabled={loading}
                  aria-label="Send message"
                >
                  <Send className="h-5 w-5" aria-hidden />
                </Button>
              </div>
              {listening ? (
                <div className="mt-2 flex gap-2">
                  <Button type="button" size="sm" variant="ghost" className="flex-1" onClick={() => void flushVoice()}>
                    Send voice text
                  </Button>
                </div>
              ) : null}
              <div className="mt-3 flex justify-center">
                <NextelevenSignature variant="chat" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Quick({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="min-h-9 rounded-full border border-white/15 px-3 py-2 text-left text-xs font-medium text-white/90 hover:border-[var(--pink)]/60 sm:py-1.5"
    >
      {label}
    </button>
  );
}
