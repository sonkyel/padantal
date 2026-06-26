"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { hero, heroCards, societies } from "@/content/site";

const SRC = "/assets/video/atunero.mp4";
const POSTER = "/assets/video/poster.jpg";

/**
 * Hero dark premium: vídeo del atunero a sangre + tarjetas glass flotando (estilo dashboard).
 * El vídeo se "rasca" con el scroll (scroll-scrubbing). Fallback a póster/loop en móvil/reduce-motion.
 */
export function HeroScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useRef(0);
  const current = useRef(0);
  const [scrub, setScrub] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 767px)").matches;
    if (reduce || small) {
      setScrub(false);
      return;
    }
    const video = videoRef.current;
    if (!video) return;

    let duration = 0;
    const onMeta = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onMeta);
    if (video.readyState >= 1) onMeta();

    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      progress.current = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    let raf = 0;
    const loop = () => {
      current.current += (progress.current - current.current) * 0.1;
      if (duration > 0 && video.readyState >= 2) {
        const t = current.current * (duration - 0.05);
        if (Math.abs(video.currentTime - t) > 0.01) video.currentTime = t;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("loadedmetadata", onMeta);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[240vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Vídeo */}
        <video
          ref={videoRef}
          src={SRC}
          poster={POSTER}
          muted
          playsInline
          preload="auto"
          autoPlay={!scrub}
          loop={!scrub}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Gradados oscuros para contraste */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,15,22,.55)_0%,rgba(10,15,22,.25)_35%,rgba(10,15,22,.55)_70%,rgba(10,15,22,.96)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,15,22,.7)_0%,rgba(10,15,22,.2)_50%,rgba(10,15,22,.7)_100%)]" />
        {/* Glow ámbar ambiental */}
        <div className="amber-orb left-1/2 top-1/3 h-[40rem] w-[40rem] -translate-x-1/2 opacity-50" />

        {/* Contenido */}
        <div className="relative flex h-full flex-col">
          <div className="flex flex-1 items-center">
            <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 px-6 lg:grid-cols-[1fr_auto]">
              {/* Texto */}
              <div className="max-w-[680px]">
                <span className="eyebrow">{hero.eyebrow}</span>
                <h1 className="mt-6 text-[clamp(2.8rem,6.6vw,5.6rem)] font-medium leading-[0.98] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,.6)]">
                  {hero.titleLead}{" "}
                  <span className="bg-gradient-to-r from-amber-bright to-amber bg-clip-text text-transparent">
                    {hero.titleAccent}
                  </span>
                </h1>
                <p className="mt-7 max-w-[520px] text-[1.12rem] leading-relaxed text-white/85 drop-shadow-[0_1px_16px_rgba(0,0,0,.7)]">
                  {hero.lead}
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <a href={hero.ctaPrimary.href} className="btn btn-primary">
                    {hero.ctaPrimary.label}
                    <span className="ic"><Arrow /></span>
                  </a>
                  <a href={hero.ctaSecondary.href} className="btn btn-ghost">
                    {hero.ctaSecondary.label}
                  </a>
                </div>
              </div>

              {/* Tarjetas KPI glass (ocultas en móvil) */}
              <div className="hidden w-[300px] flex-col gap-4 lg:flex">
                {heroCards.map((c) => (
                  <div key={c.label} className="glass rounded-2xl p-5">
                    <div className="flex items-baseline justify-between">
                      <div className="font-display text-[2.1rem] font-semibold leading-none text-white">
                        {c.value}
                        {c.unit && <span className="ml-1 text-[0.5em] font-normal text-amber-bright">{c.unit}</span>}
                      </div>
                      <Spark />
                    </div>
                    <div className="mt-3 text-[0.92rem] text-white/80">{c.label}</div>
                    <div className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.12em] text-amber-bright/90">
                      {c.trend}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Franja "Sociedades / Trusted by" */}
          <div className="relative border-t border-white/10 bg-base/30 backdrop-blur-md">
            <div className="mx-auto flex max-w-[1280px] flex-wrap items-center gap-x-10 gap-y-4 px-6 py-5">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/45">
                Sociedades con participación activa
              </span>
              <div className="flex flex-1 flex-wrap items-center justify-between gap-x-8 gap-y-3">
                {societies.logos.map((l) => (
                  <Image
                    key={l.alt}
                    src={l.src}
                    alt={l.alt}
                    width={120}
                    height={30}
                    style={{ width: "auto", height: "auto" }}
                    className="max-h-7 max-w-[120px] object-contain opacity-70 brightness-0 invert transition-opacity duration-300 hover:opacity-100"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll */}
        <div className="pointer-events-none absolute bottom-24 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-white/55">
          <span className="relative h-9 w-[22px] rounded-full border-2 border-white/40">
            <span className="absolute left-1/2 top-[7px] h-[7px] w-[3px] -translate-x-1/2 rounded bg-white motion-safe:animate-[scrollcue_1.6s_infinite]" />
          </span>
          Navega
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

function Spark() {
  return (
    <svg viewBox="0 0 40 20" className="h-5 w-10 text-amber" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M1 16 L9 10 L16 13 L24 5 L32 8 L39 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
