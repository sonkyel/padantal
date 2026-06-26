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

        {/* Velo sólido mínimo solo en el tercio inferior (legibilidad, no atmósfera) */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(14,18,22,.72)_100%)]" />

        {/* Contenido en el tercio inferior */}
        <div className="on-photo absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[1440px] px-6 pb-16 md:pb-20">
            <span className="eyebrow text-white/80">{hero.eyebrow}</span>
            <h1 className="display mt-4 max-w-[15ch] text-[clamp(2.8rem,8vw,7rem)] text-white">
              {hero.titleLead} {hero.titleAccent}
            </h1>
            <p className="mt-5 max-w-[42ch] text-[1.02rem] leading-relaxed text-white/85">
              {hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
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

        {/* Indicador de scroll */}
        <div className="on-photo pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-2 text-[0.68rem] uppercase tracking-[0.2em] text-white/55 md:flex">
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
