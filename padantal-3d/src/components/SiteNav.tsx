"use client";

import { useEffect, useState } from "react";
import { PadantalLogo } from "./PadantalLogo";
import { nav } from "@/content/site";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-[1280px] -translate-x-1/2">
      <div
        className={`flex items-center justify-between rounded-full py-2.5 pl-6 pr-2.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
          scrolled ? "glass-strong" : "border border-white/10 bg-white/[0.04] backdrop-blur-md"
        }`}
      >
        <a href="#inicio" aria-label="Padantal SL inicio" className="text-ink">
          <PadantalLogo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-4 py-2 text-[0.92rem] font-medium text-white/75 transition-colors duration-300 hover:bg-white/10 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <a href={nav.cta.href} className="btn btn-primary ml-2 !py-2 !pl-5 text-[0.9rem]">
            {nav.cta.label}
            <span className="ic"><Arrow /></span>
          </a>
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className={`absolute h-0.5 w-6 rounded bg-ink transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-6 rounded bg-ink transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      {/* Overlay móvil */}
      <div
        className={`mt-2 overflow-hidden rounded-3xl glass-strong transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] md:hidden ${
          open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-3">
          {nav.links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              className={`rounded-2xl px-4 py-3 text-white/90 transition-all duration-500 hover:bg-white/10 ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
            >
              {l.label}
            </a>
          ))}
          <a href={nav.cta.href} onClick={() => setOpen(false)} className="btn btn-primary mt-1 justify-center">
            {nav.cta.label}
            <span className="ic"><Arrow /></span>
          </a>
        </nav>
      </div>
    </header>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
