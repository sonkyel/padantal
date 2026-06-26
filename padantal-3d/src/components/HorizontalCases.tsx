"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useT } from "@/i18n/lang";

export function HorizontalCases() {
  const { cases } = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [horizontal, setHorizontal] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 1024px)").matches;
    setHorizontal(!reduce && wide);
  }, []);

  useEffect(() => {
    if (!horizontal) return;
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    let raf = 0;
    let cur = 0;
    const loop = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(Math.max(-rect.top / total, 0), 1) : 0;
      const dist = track.scrollWidth - window.innerWidth;
      const target = -p * dist;
      cur += (target - cur) * 0.12;
      track.style.transform = `translate3d(${cur}px,0,0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [horizontal]);

  const Header = (
    <div className="flex items-end justify-between">
      <div>
        <span className="label">[ {cases.eyebrow} ]</span>
        <h2 className="mt-4 text-[clamp(2.2rem,6vw,5rem)] font-bold leading-[0.9]">{cases.title}</h2>
      </div>
      <span className="label-muted hidden md:block">(01—0{cases.items.length})</span>
    </div>
  );

  const Card = (c: (typeof cases.items)[number], i: number) => (
    <article className="card flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image src={c.image} alt={c.title} fill sizes="(max-width:1024px) 100vw, 40vw" className="object-cover" />
        <span className="label absolute left-5 top-5 rounded-full bg-base/70 px-3 py-1.5 backdrop-blur-md">{c.badge}</span>
      </div>
      <div className="flex flex-1 flex-col p-7">
        <span className="label-muted">0{i + 1} — {c.location}</span>
        <h3 className="mt-3 text-[1.5rem] font-bold leading-tight">{c.title}</h3>
        <p className="mt-3 text-[0.98rem] text-muted">{c.lead}</p>
        <div className="mt-auto flex items-center gap-4 border-t border-line pt-5">
          <span className="font-display text-[2.6rem] font-bold leading-none text-acc">{c.result.big}</span>
          <p className="text-[0.92rem] text-muted">{c.result.text}</p>
        </div>
      </div>
    </article>
  );

  if (!horizontal) {
    return (
      <section id="casos" className="px-6 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1500px]">
          {Header}
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {cases.items.map((c, i) => <div key={c.title}>{Card(c, i)}</div>)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} id="casos" style={{ height: `${cases.items.length * 80 + 40}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1500px] px-10">{Header}</div>
        <div ref={trackRef} className="mt-10 flex gap-8 px-10 will-change-transform">
          {cases.items.map((c, i) => (
            <div key={c.title} className="h-[58vh] w-[44vw] shrink-0">{Card(c, i)}</div>
          ))}
          <div className="flex w-[30vw] shrink-0 items-center">
            <a href="#contacto" className="label flex items-center gap-2 hover:text-cream">→ {/* CTA */}</a>
          </div>
        </div>
      </div>
    </section>
  );
}
