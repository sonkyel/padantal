"use client";

import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import { PadantalLogo } from "@/components/PadantalLogo";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Reveal } from "@/components/Reveal";
import { HeroScrollVideo } from "@/components/HeroScrollVideo";
import OperationsGlobe3D from "@/components/OperationsGlobe3D";
import { ApproachTabs } from "@/components/ApproachTabs";
import { ContactForm } from "@/components/ContactForm";
import { useT } from "@/i18n/lang";

export default function Home() {
  const t = useT();

  return (
    <>
      <SmoothScroll />
      <SiteNav />

      <main id="inicio">
        <HeroScrollVideo />

        {/* Barra de stats */}
        <section className="relative z-10 px-6">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {t.hero.stats.map((s) => (
              <div key={s.label} className="bg-surface/80 p-6 backdrop-blur-md">
                <div className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-semibold leading-none">
                  {s.value}
                  <span className="ml-1 text-[0.45em] font-medium text-cyan-bright">{s.unit}</span>
                </div>
                <div className="mt-2 text-[0.86rem] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Quiénes somos */}
        <Section id="nosotros" tint>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl border border-line"><div className="relative aspect-[5/4]"><Image src="/assets/img/harbour.jpg" alt={t.about.title} fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" /></div></div>
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <span className="eyebrow">{t.about.eyebrow}</span>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold">{t.about.title}</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] text-muted">{t.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}</div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {t.about.know.map((k) => (
                  <div key={k.term} className="glass rounded-2xl p-5"><b className="font-display font-semibold text-cyan-bright">{k.term}</b><p className="mt-1 text-[0.9rem] text-muted">{k.desc}</p></div>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Nuestro enfoque — módulo con pestañas */}
        <ApproachTabs />

        {/* Operación global (globo 3D) */}
        <Section id="operacion" tint>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <span className="eyebrow">{t.operations.eyebrow}</span>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold">{t.operations.title}</h2>
              <p className="mt-6 max-w-[46ch] text-[1.02rem] text-muted">{t.operations.intro}</p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {t.operations.regions.map((r) => <span key={r} className="rounded-full border border-line bg-surface/60 px-4 py-2 text-[0.88rem]">{r}</span>)}
              </div>
            </Reveal>
            <Reveal delay={0.1}><OperationsGlobe3D /></Reveal>
          </div>
        </Section>

        {/* Casos de éxito */}
        <Section id="casos" tint>
          <Reveal><SectionHead eyebrow={t.cases.eyebrow} title={t.cases.title} intro={t.cases.intro} center /></Reveal>
          <div className="mt-16 space-y-16 md:space-y-24">
            {t.cases.items.map((c, i) => (
              <Reveal key={c.title}>
                <article className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="overflow-hidden rounded-2xl border border-line"><div className="relative aspect-[4/3]"><Image src={c.image} alt={c.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" /></div></div>
                  <div>
                    <span className="eyebrow">{c.badge}</span>
                    <h3 className="mt-4 text-[clamp(1.6rem,3vw,2.3rem)] font-semibold">{c.title}</h3>
                    <p className="mt-2 text-[0.82rem] uppercase tracking-[0.12em] text-faint">{c.location}</p>
                    <p className="mt-5 text-[1.02rem] text-muted">{c.lead}</p>
                    <ul className="mt-5 space-y-3">{c.points.map((pt, j) => <li key={j} className="flex gap-3 text-[0.96rem] text-muted"><Check /><span>{pt}</span></li>)}</ul>
                    <div className="mt-7 flex items-center gap-5 rounded-2xl glass glass-cyan px-6 py-5"><span className="font-display text-[2.4rem] font-semibold leading-none text-cyan-bright">{c.result.big}</span><p className="text-[0.96rem] text-muted">{c.result.text}</p></div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Sociedades */}
        <Section id="socios">
          <Reveal><SectionHead title={t.societies.title} intro={t.societies.intro} center /></Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {t.societies.logos.map((l, i) => (
              <Reveal key={l.alt} delay={i * 0.05} className="h-full">
                <figure className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-white px-6 pb-5 pt-7">
                  <span className="relative flex h-12 items-center justify-center"><Image src={l.src} alt={l.alt} width={150} height={48} style={{ width: "auto", height: "auto" }} className="max-h-12 max-w-[130px] object-contain" /></span>
                  <figcaption className="text-center text-[0.74rem] text-slate-500">{l.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.societies.orps.map((o) => (
              <div key={o.b} className="glass rounded-2xl px-5 py-4 text-center"><b className="block font-display font-semibold text-cyan-bright">{o.b}</b><span className="text-[0.82rem] text-muted">{o.s}</span></div>
            ))}
          </div>
        </Section>

        {/* La compañía */}
        <Section id="compania" tint>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
            <Reveal>
              <span className="eyebrow">{t.company.eyebrow}</span>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold">{t.company.title}</h2>
              <p className="mt-6 max-w-[50ch] text-[1.02rem] text-muted">{t.company.intro}</p>
              <div className="mt-8 grid grid-cols-2 gap-4">{t.company.facts.map((f) => <div key={f.k} className="glass rounded-2xl p-5"><div className="text-[0.72rem] uppercase tracking-[0.14em] text-cyan">{f.k}</div><div className="mt-1.5 text-[1.02rem]">{f.v}</div></div>)}</div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass glass-cyan rounded-2xl p-8">
                <div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan/50 font-display text-[1.1rem] font-semibold text-cyan-bright">DV</span><div><div className="font-display text-[1.25rem] font-semibold">{t.company.founder.name}</div><div className="text-[0.9rem] text-cyan-bright">{t.company.founder.role}</div></div></div>
                <p className="mt-6 text-[1rem] text-muted">{t.company.founder.note}</p>
                <a href="#contacto" className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium text-cyan-bright hover:text-cyan">{t.company.cta} <Arrow /></a>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Contacto */}
        <section id="contacto" className="relative overflow-hidden px-6 py-24 md:py-32">
          <div className="cyan-orb left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 opacity-40" />
          <div className="relative mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-[.9fr_1.1fr]">
            <Reveal>
              <span className="eyebrow">{t.contact.eyebrow}</span>
              <h2 className="mt-5 text-[clamp(2rem,4.4vw,3rem)] font-semibold">{t.contact.title}</h2>
              <p className="mt-6 max-w-[42ch] text-[1.05rem] text-muted">{t.contact.intro}</p>
              <ul className="mt-8 space-y-4 text-[0.98rem]">
                <li className="flex items-center gap-3"><Dot /><a href={`mailto:${t.contact.email}`} className="hover:text-cyan-bright">{t.contact.email}</a></li>
                <li className="flex items-center gap-3"><Dot /><span className="text-muted">{t.contact.coverage}</span></li>
                <li className="flex items-center gap-3"><Dot /><span className="text-muted">{t.contact.response}</span></li>
              </ul>
            </Reveal>
            <Reveal delay={0.1}><ContactForm /></Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line bg-surface/40 px-6 py-14">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="text-ink"><PadantalLogo /></a>
            <p className="mt-4 max-w-[320px] text-[0.92rem] text-muted">{t.footer.tagline}</p>
          </div>
          <div>
            <div className="eyebrow center">{t.footer.nav}</div>
            <ul className="mt-4 space-y-2 text-[0.95rem] text-muted">{t.nav.links.map((l) => <li key={l.href}><a href={l.href} className="hover:text-cyan-bright">{l.label}</a></li>)}</ul>
          </div>
          <div>
            <div className="eyebrow center">{t.legal.name}</div>
            <ul className="mt-4 space-y-2 text-[0.92rem] text-muted">
              <li><a href={`mailto:${t.contact.email}`} className="hover:text-cyan-bright">{t.contact.email}</a></li>
              <li>{t.legal.address}</li>
              <li>NIF {t.legal.nif}</li>
              <li>{t.legal.registry}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1280px] flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[0.84rem] text-faint">
          <span>© {new Date().getFullYear()} {t.legal.name}. {t.footer.rights}</span>
          <span>Know-how · Know-who · {t.legal.name}</span>
        </div>
      </footer>
    </>
  );
}

/* -------------------- Helpers -------------------- */

function Section({ id, children, tint }: { id: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={`relative px-6 py-24 md:py-32 ${tint ? "bg-surface/30" : ""}`}>
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}

function SectionHead({ eyebrow, title, intro, center }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`max-w-[760px] ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className={`eyebrow ${center ? "center" : ""}`}>{eyebrow}</span>}
      <h2 className={`text-[clamp(2rem,4.4vw,3.4rem)] font-semibold ${eyebrow ? "mt-5" : ""}`}>{title}</h2>
      {intro && <p className="mt-5 text-[1.1rem] text-muted">{intro}</p>}
    </div>
  );
}

function Arrow() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[16px] w-[16px]"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function Check() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="mt-1 h-[16px] w-[16px] shrink-0 text-cyan"><path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function Dot() {
  return <span className="h-2 w-2 shrink-0 rounded-full bg-cyan" />;
}
