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
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-obsidian/12 bg-paper/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4">
        <a href="#inicio" aria-label="Padantal SL inicio" className="text-navy">
          <PadantalLogo />
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[0.95rem] text-obsidian transition-opacity duration-200 hover:opacity-60"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a href={nav.cta.href} className="btn btn-primary">
            {nav.cta.label}
            <Arrow />
          </a>
        </div>

        <button
          type="button"
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-10 w-10 items-center justify-center md:hidden"
        >
          <span className={`absolute h-0.5 w-6 rounded bg-obsidian transition-all duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
          <span className={`absolute h-0.5 w-6 rounded bg-obsidian transition-all duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
        </button>
      </div>

      {/* Menú móvil */}
      <div
        className={`overflow-hidden border-t border-obsidian/10 bg-paper transition-all duration-400 md:hidden ${
          open ? "max-h-[420px] opacity-100" : "pointer-events-none max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1 p-4">
          {nav.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-[20px] px-4 py-3 text-obsidian transition-colors hover:bg-obsidian/5"
            >
              {l.label}
            </a>
          ))}
          <a href={nav.cta.href} onClick={() => setOpen(false)} className="btn btn-primary mt-2 justify-center">
            {nav.cta.label}
            <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
