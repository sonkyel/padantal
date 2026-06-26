"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";

const SRC = "/assets/video/atunero.mp4";
const POSTER = "/assets/video/poster.jpg";

/**
 * Hero editorial: vídeo del atunero a sangre (el color vive dentro del marco) con titular
 * susurrado en el tercio inferior. El vídeo se "rasca" con el scroll (scroll-scrubbing).
 * Fallback a póster/loop en móvil o reduce-motion.
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
        <video
          ref={videoRef}
          src={SRC}
          poster={POSTER}
          muted
          playsInline
          preload="metadata"
          autoPlay={!scrub}
          loop={!scrub}
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Velos navy para contraste */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,20,40,.55)_0%,rgba(8,20,40,.2)_40%,rgba(8,20,40,.85)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,20,40,.72)_0%,transparent_60%)]" />

        {/* Contenido */}
        <div className="relative flex h-full items-center">
          <div className="mx-auto w-full max-w-[1280px] px-6">
            <div className="max-w-[680px]">
              <span className="eyebrow">{hero.eyebrow}</span>
              <h1 className="mt-5 text-[clamp(2.6rem,6.4vw,5.4rem)] font-semibold leading-[1.02] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,.5)]">
                {hero.titleLead} <span className="text-cyan-bright">{hero.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-[520px] text-[1.1rem] leading-relaxed text-white/85">
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
        <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-white/55 md:flex">
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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
