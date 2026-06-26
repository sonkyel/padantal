"use client";

import { useEffect, useState } from "react";
import { PadantalLogo } from "./PadantalLogo";
import { useLang } from "@/i18n/lang";

export function SiteNav() {
  const { t, locale, setLocale } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const LangToggle = () => (
    <div className="flex items-center rounded-full border border-line p-0.5 text-[0.78rem] font-semibold">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            locale === l ? "bg-cyan text-[#04121f]" : "text-muted hover:text-ink"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-line bg-base/85 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-6 py-4">
        <a href="#inicio" aria-label="Padantal SL" className="text-ink">
          <PadantalLogo />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href} className="text-[0.92rem] font-medium text-muted transition-colors duration-200 hover:text-cyan-bright">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangToggle />
          <a href={t.nav.cta.href} className="btn btn-primary">
            {t.nav.cta.label}
            <Arrow />
          </a>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LangToggle />
          <button
            type="button"
            aria-label="Menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative flex h-10 w-10 items-center justify-center"
          >
            <span className={`absolute h-0.5 w-6 rounded bg-ink transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-6 rounded bg-ink transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-line bg-base/95 backdrop-blur-xl transition-all duration-400 md:hidden ${
          open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-4">
          {t.nav.links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 text-ink transition-colors hover:bg-white/5">
              {l.label}
            </a>
          ))}
          <a href={t.nav.cta.href} onClick={() => setOpen(false)} className="btn btn-primary mt-2 justify-center">
            {t.nav.cta.label}
            <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
