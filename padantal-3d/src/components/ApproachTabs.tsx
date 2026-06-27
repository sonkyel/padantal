"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useT } from "@/i18n/lang";

type TabId = "servicios" | "cadena" | "sostenibilidad" | "calidad";

const HASH_TO_TAB: Record<string, TabId> = {
  "#servicios": "servicios",
  "#cadena": "cadena",
  "#sostenibilidad": "sostenibilidad",
  "#calidad": "calidad",
  "#pilares": "calidad",
};

export function ApproachTabs() {
  const t = useT();
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<TabId>("servicios");
  const sectionRef = useRef<HTMLElement>(null);

  // Deep-linking: activar pestaña según el hash (inicial + cambios)
  useEffect(() => {
    const apply = () => {
      const mapped = HASH_TO_TAB[window.location.hash];
      if (mapped) setTab(mapped);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const tabs: { id: TabId; label: string }[] = [
    { id: "servicios", label: t.approach.tabs.servicios },
    { id: "cadena", label: t.approach.tabs.cadena },
    { id: "sostenibilidad", label: t.approach.tabs.sostenibilidad },
    { id: "calidad", label: t.approach.tabs.calidad },
  ];

  return (
    <section ref={sectionRef} id="enfoque" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
      <div className="absolute inset-0 -z-10">
        <img src="/assets/img/bg/enfoque.jpg" alt="" aria-hidden="true" className="h-full w-full object-cover opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,.78),rgba(10,10,11,.5)_45%,rgba(10,10,11,.9))]" />
      </div>
      {/* anclas invisibles para deep-link desde el nav */}
      <span id="servicios" className="absolute -top-24" />
      <span id="cadena" className="absolute -top-24" />
      <span id="sostenibilidad" className="absolute -top-24" />
      <span id="calidad" className="absolute -top-24" />
      <span id="pilares" className="absolute -top-24" />

      <div className="mx-auto max-w-[1500px]">
        <div className="flex items-end justify-between">
          <div>
            <span className="label">[ {t.approach.eyebrow} ]</span>
            <h2 className="mt-4 text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.92]">{t.approach.title}</h2>
          </div>
        </div>

        {/* Barra de pestañas */}
        <div className="mt-10 flex justify-start gap-2 overflow-x-auto border-y border-line py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              type="button"
              onClick={() => setTab(tb.id)}
              aria-selected={tab === tb.id}
              className={`relative shrink-0 rounded-full px-5 py-2.5 text-[0.95rem] font-medium transition-colors duration-300 ${
                tab === tb.id ? "text-[#0a0a0b]" : "text-muted hover:text-cream"
              }`}
            >
              {tab === tb.id && (
                <motion.span layoutId="tabpill" className="absolute inset-0 -z-10 rounded-full bg-cream" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              {tb.label}
            </button>
          ))}
        </div>

        {/* Panel */}
        <div className="mt-12 min-h-[360px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            >
              {tab === "servicios" && <ServiciosPanel t={t} />}
              {tab === "cadena" && <CadenaPanel t={t} />}
              {tab === "sostenibilidad" && <SostenibilidadPanel t={t} />}
              {tab === "calidad" && <CalidadPanel t={t} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

type T = ReturnType<typeof useT>;

function ServiciosPanel({ t }: { t: T }) {
  return (
    <>
      <p className="mx-auto max-w-[760px] text-center text-[1.1rem] text-muted">{t.services.intro}</p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {t.services.items.map((s, i) => (
          <article key={s.title} className="group h-full rounded-2xl card p-8 transition-[transform,border-color] duration-400 hover:-translate-y-1 hover:border-acc/40">
            <span className="font-display text-[0.95rem] font-semibold text-acc">0{i + 1}</span>
            <h3 className="mt-3 text-[1.4rem] font-semibold">{s.title}</h3>
            <p className="mt-3 text-[1rem] text-muted">{s.desc}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function CadenaPanel({ t }: { t: T }) {
  return (
    <>
      <p className="mx-auto max-w-[760px] text-center text-[1.1rem] text-muted">{t.chainHead.intro}</p>
      <div className="relative mt-12">
        <div className="node-line absolute left-0 right-0 top-7 hidden md:block" />
        <div className="grid gap-8 md:grid-cols-4">
          {t.chain.map((c, i) => (
            <div key={c.t} className="relative text-center md:text-left">
              <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-acc/40 bg-base md:mx-0">
                <span className="font-display text-[1.05rem] font-semibold text-acc">{i + 1}</span>
              </div>
              <h3 className="mt-5 text-[1.15rem] font-semibold">{c.t}</h3>
              <p className="mt-2 text-[0.95rem] text-muted">{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function SostenibilidadPanel({ t }: { t: T }) {
  return (
    <>
      <p className="mx-auto max-w-[760px] text-center text-[1.1rem] text-muted">{t.sustainability.intro}</p>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {t.sustainability.items.map((it) => (
          <div key={it.title} className="card h-full rounded-2xl p-7">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-acc/40 text-acc">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} className="h-5 w-5"><path d="M5 21c0-7 4-12 14-13 0 9-5 13-11 13-1.5 0-3-.4-3-.4M7 19c2-4 5-6 9-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
            <h3 className="mt-4 text-[1.15rem] font-semibold">{it.title}</h3>
            <p className="mt-2 text-[0.95rem] text-muted">{it.desc}</p>
          </div>
        ))}
      </div>
    </>
  );
}

function CalidadPanel({ t }: { t: T }) {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <h3 className="text-[1.5rem] font-semibold">{t.quality.title}</h3>
        <p className="mt-4 max-w-[44ch] text-[1.02rem] text-muted">{t.quality.intro}</p>
        <div className="mt-6 space-y-4">
          {t.quality.items.map((q) => (
            <div key={q.k} className="card rounded-2xl p-5">
              <div className="text-[0.74rem] uppercase tracking-[0.14em] text-acc">{q.k}</div>
              <div className="mt-1.5 text-[1.02rem] text-cream">{q.v}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="grid gap-4">
        {t.pillars.items.map((p) => (
          <div key={p.n} className="card rounded-2xl p-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-[1.6rem] font-semibold text-acc">{p.n}</span>
              <h4 className="text-[1.15rem] font-semibold">{p.title}</h4>
            </div>
            <ul className="mt-3 space-y-2">
              {p.points.map((pt, j) => (
                <li key={j} className="flex gap-3 text-[0.94rem] text-muted">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="mt-1 h-[15px] w-[15px] shrink-0 text-acc"><path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
