"use client";

import { hero } from "@/content/site";

const SRC = "/assets/video/atunero.mp4";
const POSTER = "/assets/video/poster.jpg";

/**
 * Hero corporativo: vídeo del atunero (4K) en autoplay-loop a sangre, nítido,
 * con velo navy ligero y titular + CTAs. Fallback a póster en reduce-motion.
 */
export function HeroScrollVideo() {
  return (
    <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
      <video
        src={SRC}
        poster={POSTER}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
      />
      {/* Fallback estático para reduce-motion */}
      <img src={POSTER} alt="" aria-hidden="true" className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block" />

      {/* Velos navy ligeros para contraste */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,40,.5)_0%,rgba(8,20,40,.12)_40%,rgba(8,20,40,.78)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,40,.66)_0%,transparent_58%)]" />

      {/* Contenido */}
      <div className="relative flex h-full items-center">
        <div className="mx-auto w-full max-w-[1280px] px-6">
          <div className="max-w-[680px]">
            <span className="eyebrow">{hero.eyebrow}</span>
            <h1 className="mt-5 text-[clamp(2.6rem,6.4vw,5.4rem)] font-semibold leading-[1.02] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,.5)]">
              {hero.titleLead} <span className="text-cyan-bright">{hero.titleAccent}</span>
            </h1>
            <p className="mt-6 max-w-[520px] text-[1.1rem] leading-relaxed text-white/90">
              {hero.lead}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={hero.ctaPrimary.href} className="btn btn-primary">
                {hero.ctaPrimary.label}
                <Arrow />
              </a>
              <a href={hero.ctaSecondary.href} className="btn btn-ghost">
                {hero.ctaSecondary.label}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div className="pointer-events-none absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-white/55 md:flex">
        <span className="relative h-9 w-[22px] rounded-full border-2 border-white/40">
          <span className="absolute left-1/2 top-[7px] h-[7px] w-[3px] -translate-x-1/2 rounded bg-white motion-safe:animate-[scrollcue_1.6s_infinite]" />
        </span>
        Descubre
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
