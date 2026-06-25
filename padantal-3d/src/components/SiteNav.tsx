"use client";

import { useEffect, useState } from "react";
import { PadantalLogo } from "./PadantalLogo";
import { nav } from "@/content/site";

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-[1180px] -translate-x-1/2 rounded-full border border-white/10 px-3 py-2.5 pl-5 backdrop-blur-md transition-colors duration-300 ${
        scrolled ? "bg-navy-900/90 shadow-lg shadow-black/20" : "bg-navy-900/50"
      }`}
    >
      <div className="flex items-center justify-between">
        <a href="#inicio" aria-label="Padantal SL inicio" className="text-ink">
          <PadantalLogo />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-full px-3.5 py-2 text-[0.92rem] font-medium text-ink/80 transition-colors hover:bg-white/10 hover:text-ink"
            >
              {l.label}
            </a>
          ))}
          <a
            href={nav.cta.href}
            className="ml-1.5 rounded-full bg-ocean px-5 py-2.5 text-[0.9rem] font-semibold text-white shadow-[0_8px_24px_-6px] shadow-ocean/60 transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-ocean-deep"
          >
            {nav.cta.label}
          </a>
        </nav>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
        >
          <span
            className={`h-0.5 w-6 rounded bg-ink transition-transform ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`h-0.5 w-6 rounded bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-0.5 w-6 rounded bg-ink transition-transform ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`mt-2 flex flex-col gap-1 overflow-hidden transition-all duration-300 md:hidden ${
          open ? "max-h-96 pt-2 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {nav.links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={() => setOpen(false)}
            className="rounded-2xl px-4 py-3 text-ink/85 transition-colors hover:bg-white/10"
          >
            {l.label}
          </a>
        ))}
        <a
          href={nav.cta.href}
          onClick={() => setOpen(false)}
          className="mt-1 rounded-full bg-ocean px-5 py-3 text-center font-semibold text-white"
        >
          {nav.cta.label}
        </a>
      </div>
    </header>
  );
}
