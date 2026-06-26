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
    <div className="label flex items-center gap-1">
      {(["es", "en"] as const).map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-faint">/</span>}
          <button
            type="button"
            onClick={() => setLocale(l)}
            className={`uppercase transition-colors ${locale === l ? "text-cream" : "text-faint hover:text-cream"}`}
          >
            {l}
          </button>
        </span>
      ))}
    </div>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${scrolled ? "border-b border-line bg-base/80 backdrop-blur-xl" : ""}`}>
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-4 md:px-10">
        <a href="#inicio" aria-label="Padantal SL" className="text-cream">
          <PadantalLogo />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex">
          {t.nav.links.map((l, i) => (
            <a key={l.href} href={l.href} className="group flex items-center gap-1.5 text-[0.92rem] text-muted transition-colors hover:text-cream">
              <span className="label-muted text-[0.6rem] transition-colors group-hover:text-acc">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 md:flex">
          <LangToggle />
          <a href={t.nav.cta.href} className="btn btn-primary !py-2.5">
            {t.nav.cta.label}
            <Arrow />
          </a>
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <LangToggle />
          <button type="button" aria-label="Menú" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="relative flex h-10 w-10 items-center justify-center">
            <span className={`absolute h-0.5 w-6 rounded bg-cream transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute h-0.5 w-6 rounded bg-cream transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </button>
        </div>
      </div>

      <div className={`overflow-hidden border-t border-line bg-base/95 backdrop-blur-xl transition-all duration-400 md:hidden ${open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"}`}>
        <nav className="flex flex-col gap-1 p-5">
          {t.nav.links.map((l, i) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-4 py-3 text-cream transition-colors hover:bg-white/5">
              <span className="label-muted text-[0.62rem]">0{i + 1}</span>
              {l.label}
            </a>
          ))}
          <a href={t.nav.cta.href} onClick={() => setOpen(false)} className="btn btn-primary mt-3 justify-center">
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
