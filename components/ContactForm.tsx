"use client";

import { useEffect, useState } from "react";
import { formEndpoint, site } from "@/lib/content";
import { cn } from "@/lib/cn";

/**
 * Modulo "Ti contattiamo noi". Le richieste arrivano via email a
 * hello@kontap.it tramite FormSubmit (nessun server da gestire).
 * Nota: al primo invio FormSubmit manda a hello@kontap.it una mail di
 * attivazione da confermare una sola volta.
 */

const INTERESTS = [
  { value: "1 targa", label: "1 targa" },
  { value: "3 targhe", label: "3 targhe" },
  { value: "Bundle Network (10+ targhe)", label: "Bundle Network (10+ targhe)", key: "network" },
  { value: "Kontap Base", label: "Kontap Base" },
  { value: "Kontap Grow", label: "Kontap Grow" },
  { value: "Kontap+", label: "Kontap+" },
  { value: "Altro", label: "Altro" },
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [interest, setInterest] = useState("");

  // Preselezione da link (es. "Richiedi preventivo" del Bundle Network)
  useEffect(() => {
    const key = new URLSearchParams(window.location.search).get("interesse");
    const match = INTERESTS.find((i) => i.key === key);
    if (match) setInterest(match.value);
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (data._honey) return; // bot
    setStatus("sending");
    try {
      const res = await fetch(formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...data,
          _subject: `Nuova richiesta dal sito Kontap — ${data.nome || "contatto"}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || String(json.success) !== "true") throw new Error("invio non riuscito");
      setStatus("sent");
      form.reset();
      setInterest("");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[1.75rem] bg-white p-5 shadow-[0_30px_70px_-40px_rgba(14,87,186,0.45)] ring-1 ring-[#0e57ba]/15 sm:p-8">

      <div className="relative">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-[#0e57ba]/70">Modulo contatti</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#0e57ba] sm:text-3xl">Compila il form, ti contattiamo noi.</h2>
        <p className="mt-2 text-[0.9rem] text-[#0e57ba]/70">Bastano pochi dati: ti richiamiamo o ti scriviamo noi.</p>
      </div>

      {status === "sent" ? (
        <div className="relative mt-6 rounded-2xl bg-[#0e57ba]/[0.06] p-5 text-center ring-1 ring-[#0e57ba]/20">
          <p className="text-lg font-semibold text-[#0e57ba]">Richiesta inviata ✓</p>
          <p className="mt-1 text-sm text-[#0e57ba]/75">Grazie! Ti contattiamo al più presto.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-sm font-medium text-[#0e57ba]">
            Invia un&apos;altra richiesta
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="relative mt-5 grid grid-cols-2 gap-2.5 sm:mt-6 sm:gap-4">
          <Field label="Nome e cognome" name="nome" required autoComplete="name" className="col-span-2 sm:col-span-1" />
          <Field label="Email" name="email" type="email" required autoComplete="email" className="col-span-2 sm:col-span-1" />
          <Field label="Telefono" name="telefono" type="tel" autoComplete="tel" inputMode="tel" />
          <Field label="Città" name="citta" autoComplete="address-level2" />
          <Field label="Nome attività" name="attivita" autoComplete="organization" />
          <label className="block min-w-0">
            <span className={LABEL}>Ti interessa</span>
            <select
              name="interesse"
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
              className={cn(INPUT, "appearance-none bg-no-repeat pr-10")}
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%230e57ba' stroke-width='2'><path d='m6 9 6 6 6-6'/></svg>")`,
                backgroundSize: "18px",
                backgroundPosition: "right 14px center",
              }}
            >
              <option value="">Seleziona…</option>
              {INTERESTS.map((i) => (
                <option key={i.value} value={i.value}>
                  {i.label}
                </option>
              ))}
            </select>
          </label>
          <label className="col-span-2 block">
            <span className={LABEL}>Messaggio</span>
            <textarea name="messaggio" rows={2} className={cn(INPUT, "h-auto resize-none py-3")} placeholder="Raccontaci della tua attività (facoltativo)" />
          </label>

          {/* honeypot anti-spam */}
          <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <label className="col-span-2 flex items-start gap-2.5 text-[0.75rem] leading-snug text-[#0e57ba]/70">
            <input type="checkbox" name="consenso" value="sì" required className="mt-0.5 h-4 w-4 shrink-0 accent-[#0e57ba]" />
            Acconsento al trattamento dei miei dati per essere ricontattato da Kontap.
          </label>

          <div className="col-span-2">
            <button
              type="submit"
              disabled={status === "sending"}
              className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cover bg-center text-[0.95rem] font-medium text-white shadow-[0_12px_28px_-12px_rgba(5,41,115,0.7)] transition-all duration-[250ms] hover:-translate-y-0.5 disabled:opacity-70"
              style={{ backgroundImage: "url(/backgrounds/kontap-blue.webp)", backgroundColor: "#052973" }}
            >
              {status === "sending" ? "Invio in corso…" : "Invia richiesta"}
            </button>
            {status === "error" && (
              <p className="mt-3 text-center text-sm text-[#0e57ba]/80" role="alert">
                Invio non riuscito. Scrivici a{" "}
                <a href={`mailto:${site.email}`} className="font-medium text-[#0e57ba] underline">
                  {site.email}
                </a>
                .
              </p>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

const LABEL = "mb-1 block pl-1 text-[0.7rem] font-semibold text-[#0e57ba]";
const INPUT =
  "block h-11 w-full rounded-xl sm:h-12 sm:rounded-2xl bg-[#f3f7fd] px-3.5 text-[0.95rem] text-[#0e57ba] ring-1 ring-[#0e57ba]/15 outline-none transition-shadow duration-200 placeholder:text-[#0e57ba]/40 focus:bg-white focus:ring-2 focus:ring-[#0e57ba]/50";

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  inputMode,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  className?: string;
}) {
  return (
    <label className={cn("block min-w-0", className)}>
      <span className={LABEL}>
        {label}
        {required && <span> *</span>}
      </span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} inputMode={inputMode} className={INPUT} />
    </label>
  );
}
