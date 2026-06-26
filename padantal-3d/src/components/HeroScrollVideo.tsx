"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/content/site";

const SRC = "/assets/video/atunero.mp4";
const POSTER = "/assets/video/poster.jpg";

/**
 * Hero con vídeo "rascado" por scroll (scroll-scrubbing).
 * La sección mide ~220vh; dentro, un contenedor sticky a pantalla completa muestra el vídeo,
 * cuyo currentTime se mapea al progreso de scroll. Fallback a póster/loop en móvil o reduce-motion.
 */
export function HeroScrollVideo() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progress = useRef(0); // objetivo (0..1)
  const current = useRef(0); // suavizado
  const [scrub, setScrub] = useState(true); // true = scrubbing; false = fallback loop

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
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      progress.current = p;
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
    <section ref={sectionRef} className="relative h-[220vh]">
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

        {/* Velos de contraste */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,27,41,.35)_0%,rgba(14,27,41,.2)_40%,rgba(14,27,41,.78)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(14,27,41,.6)_0%,rgba(14,27,41,.15)_45%,transparent_75%)]" />

        {/* Overlay de contenido */}
        <div className="on-dark relative flex h-full items-center">
          <div className="mx-auto w-full max-w-[1200px] px-6">
            <div className="max-w-[720px]">
              <span className="eyebrow">{hero.eyebrow}</span>
              <h1 className="mt-6 text-[clamp(2.8rem,6.6vw,5.8rem)] font-medium leading-[0.98] text-white drop-shadow-[0_2px_30px_rgba(0,0,0,.5)]">
                {hero.titleLead}{" "}
                <span className="italic text-[#7fd0f0]">{hero.titleAccent}</span>
              </h1>
              <p className="mt-7 max-w-[560px] text-[1.12rem] leading-relaxed text-white/85 drop-shadow-[0_1px_16px_rgba(0,0,0,.6)]">
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
          </div>

          {/* Indicador de scroll */}
          <div className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.7rem] uppercase tracking-[0.2em] text-white/55">
            <span className="relative h-9 w-[22px] rounded-full border-2 border-white/40">
              <span className="absolute left-1/2 top-[7px] h-[7px] w-[3px] -translate-x-1/2 rounded bg-white motion-safe:animate-[scrollcue_1.6s_infinite]" />
            </span>
            Navega
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
