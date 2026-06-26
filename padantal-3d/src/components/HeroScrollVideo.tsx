"use client";

import { useT } from "@/i18n/lang";

const SRC = "/assets/video/atunero.mp4";
const POSTER = "/assets/video/poster.jpg";

/**
 * Hero boutique: vídeo 4K a sangre + titular GIGANTE que rompe el grid, índices mono.
 */
export function HeroScrollVideo() {
  const { hero } = useT();

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <video src={SRC} poster={POSTER} autoPlay loop muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden" />
      <img src={POSTER} alt="" aria-hidden="true" className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block" />

      {/* Velos */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,.55)_0%,rgba(10,10,11,.15)_38%,rgba(10,10,11,.92)_100%)]" />

      {/* Contenido */}
      <div className="relative flex flex-1 items-end">
        <div className="mx-auto w-full max-w-[1500px] px-6 pb-12 md:px-10 md:pb-16">
          <div className="flex items-center justify-between">
            <span className="label">[ {hero.eyebrow} ]</span>
            <span className="label-muted hidden md:block">(scroll)</span>
          </div>
          <h1 className="display mt-6 text-[clamp(3.2rem,12vw,11rem)] text-cream">
            {hero.titleLead}
            <br />
            <span className="text-acc">{hero.titleAccent}</span>
          </h1>
          <div className="mt-8 flex flex-col gap-7 border-t border-line pt-7 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[44ch] text-[1.05rem] leading-relaxed text-muted">{hero.lead}</p>
            <div className="flex shrink-0 flex-wrap items-center gap-3">
              <a href={hero.ctaPrimary.href} className="btn btn-primary">
                {hero.ctaPrimary.label}
                <Arrow />
              </a>
              <a href={hero.ctaSecondary.href} className="btn btn-ghost">{hero.ctaSecondary.label}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
