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
import { HorizontalCases } from "@/components/HorizontalCases";
import { Marquee } from "@/components/Marquee";
import { Counter } from "@/components/Counter";
import { useT } from "@/i18n/lang";

export default function Home() {
  const t = useT();

  const marqueeItems = [...t.operations.regions, ...t.societies.orps.map((o) => o.b)].map((x) => (
    <span className="mx-7 flex items-center gap-7 text-[1.4rem] font-medium text-cream/70">
      {x}
      <span className="h-1.5 w-1.5 rounded-full bg-acc" />
    </span>
  ));

  return (
    <>
      <SmoothScroll />
      <SiteNav />

      <main id="inicio">
        <HeroScrollVideo />

        {/* Marquee de regiones / ORP */}
        <div className="border-y border-line bg-surface/40 py-4">
          <Marquee items={marqueeItems} duration={30} />
        </div>

        {/* Stats */}
        <Section>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {t.hero.stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.06}>
                <span className="label-muted">0{i + 1}</span>
                <div className="mt-3 font-display text-[clamp(2.6rem,5vw,4.2rem)] font-bold leading-none">
                  <Counter value={s.value} />
                  <span className="ml-1 text-[0.32em] font-medium text-acc">{s.unit}</span>
                </div>
                <div className="mt-2 text-[0.9rem] text-muted">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* Quiénes somos — asimétrico con fondo */}
        <section id="nosotros" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
          <div className="absolute inset-0 -z-10">
            <Image src="/assets/img/bg/nosotros.jpg" alt="" fill sizes="100vw" className="object-cover opacity-80" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,.85),rgba(10,10,11,.35)_45%,rgba(10,10,11,.92))]" />
          </div>
          <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <span className="label">[ {t.about.eyebrow} ]</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-[clamp(2.2rem,5.5vw,4.6rem)] font-bold leading-[0.95]">{t.about.title}</h2>
              <div className="mt-8 grid gap-6 md:grid-cols-2">
                {t.about.paragraphs.slice(0, 2).map((p, i) => <p key={i} className="text-[1.02rem] text-muted">{p}</p>)}
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                {t.about.know.map((k) => (
                  <div key={k.term} className="card rounded-2xl px-6 py-5">
                    <b className="font-display text-[1.1rem] font-bold text-acc">{k.term}</b>
                    <p className="mt-1 max-w-[28ch] text-[0.9rem] text-muted">{k.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Nuestro enfoque (pestañas) */}
        <ApproachTabs />

        {/* Operación global (globo 3D) */}
        <section id="operacion" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
          <div className="absolute inset-0 -z-10">
            <Image src="/assets/img/bg/operacion.jpg" alt="" fill sizes="100vw" className="object-cover opacity-70" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,11,.92),rgba(10,10,11,.55)_55%,rgba(10,10,11,.25))]" />
          </div>
          <div className="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-2">
            <Reveal>
              <span className="label">[ {t.operations.eyebrow} ]</span>
              <h2 className="mt-5 text-[clamp(2.2rem,5vw,4.4rem)] font-bold leading-[0.92]">{t.operations.title}</h2>
              <p className="mt-7 max-w-[44ch] text-[1.05rem] text-muted">{t.operations.intro}</p>
              <div className="mt-8 flex flex-wrap gap-2.5">
                {t.operations.regions.map((r) => <span key={r} className="label rounded-full border border-line px-4 py-2 text-cream">{r}</span>)}
              </div>
            </Reveal>
            <Reveal delay={0.1}><OperationsGlobe3D /></Reveal>
          </div>
        </section>

        {/* Casos de éxito — scroll horizontal */}
        <HorizontalCases />

        {/* Sociedades — marquee de logos */}
        <Section id="socios">
          <Reveal>
            <span className="label">[ {t.societies.eyebrow} ]</span>
            <h2 className="mt-4 max-w-[18ch] text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[0.95]">{t.societies.title}</h2>
          </Reveal>
          <div className="mt-12">
            <Marquee
              duration={34}
              items={t.societies.logos.map((l) => (
                <span className="mx-4 flex h-16 items-center rounded-xl bg-white px-6">
                  <Image src={l.src} alt={l.alt} width={150} height={44} style={{ width: "auto", height: "auto" }} className="max-h-10 max-w-[130px] object-contain" />
                </span>
              ))}
            />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {t.societies.orps.map((o) => (
              <div key={o.b} className="card rounded-2xl px-5 py-4"><b className="block font-display font-bold text-acc">{o.b}</b><span className="text-[0.82rem] text-muted">{o.s}</span></div>
            ))}
          </div>
        </Section>

        {/* La compañía */}
        <Section id="compania">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_.85fr]">
            <Reveal>
              <span className="label">[ {t.company.eyebrow} ]</span>
              <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.4rem)] font-bold leading-[0.95]">{t.company.title}</h2>
              <p className="mt-6 max-w-[50ch] text-[1.02rem] text-muted">{t.company.intro}</p>
              <div className="mt-8 grid grid-cols-2 gap-x-10 gap-y-6">
                {t.company.facts.map((f) => (
                  <div key={f.k} className="border-t border-line pt-3"><div className="label-muted">{f.k}</div><div className="mt-1.5 text-[1.02rem]">{f.v}</div></div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="card overflow-hidden rounded-2xl">
                <div className="flex items-center gap-5 p-6">
                  <Image src="/assets/img/daniel-vidal.jpg" alt={t.company.founder.name} width={88} height={88} className="h-20 w-20 shrink-0 rounded-2xl object-cover" />
                  <div>
                    <div className="font-display text-[1.3rem] font-bold leading-tight">{t.company.founder.name}</div>
                    <div className="label mt-1">{t.company.founder.role}</div>
                  </div>
                </div>
                <div className="border-t border-line p-6 pt-5">
                  <p className="text-[1rem] text-muted">{t.company.founder.note}</p>
                  <a href="#contacto" className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-medium text-acc hover:text-cream">{t.company.cta} <Arrow /></a>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* Contacto */}
        <section id="contacto" className="relative overflow-hidden px-6 py-24 md:px-10 md:py-32">
          <div className="absolute inset-0 -z-10">
            <Image src="/assets/img/bg/contacto.jpg" alt="" fill sizes="100vw" className="object-cover opacity-90" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,11,.7),rgba(10,10,11,.45)_50%,rgba(10,10,11,.85))]" />
          </div>
          <div className="mx-auto grid max-w-[1300px] gap-12 lg:grid-cols-[1fr_1.05fr]">
            <Reveal>
              <span className="label">[ {t.contact.eyebrow} ]</span>
              <h2 className="mt-5 text-[clamp(2.2rem,5.5vw,4.6rem)] font-bold leading-[0.92]">{t.contact.title}</h2>
              <p className="mt-6 max-w-[40ch] text-[1.05rem] text-muted">{t.contact.intro}</p>
              <ul className="mt-8 space-y-3 text-[0.98rem]">
                <li className="flex items-center gap-3"><Dot /><a href={`mailto:${t.contact.email}`} className="hover:text-acc">{t.contact.email}</a></li>
                <li className="flex items-center gap-3"><Dot /><span className="text-muted">{t.contact.coverage}</span></li>
                <li className="flex items-center gap-3"><Dot /><span className="text-muted">{t.contact.response}</span></li>
              </ul>
            </Reveal>
            <Reveal delay={0.1}><ContactForm /></Reveal>
          </div>
        </section>
      </main>

      <footer className="border-t border-line px-6 py-14 md:px-10">
        <div className="mx-auto grid max-w-[1500px] gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="text-cream"><PadantalLogo /></a>
            <p className="mt-4 max-w-[320px] text-[0.92rem] text-muted">{t.footer.tagline}</p>
          </div>
          <div>
            <div className="label-muted">{t.footer.nav}</div>
            <ul className="mt-4 space-y-2 text-[0.95rem] text-muted">{t.nav.links.map((l) => <li key={l.href}><a href={l.href} className="hover:text-acc">{l.label}</a></li>)}</ul>
          </div>
          <div>
            <div className="label-muted">{t.legal.name}</div>
            <ul className="mt-4 space-y-2 text-[0.92rem] text-muted">
              <li><a href={`mailto:${t.contact.email}`} className="hover:text-acc">{t.contact.email}</a></li>
              <li>{t.legal.address}</li>
              <li>NIF {t.legal.nif}</li>
              <li>{t.legal.registry}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1500px] flex-wrap items-center justify-between gap-3 border-t border-line pt-6 label-muted">
          <span>© {new Date().getFullYear()} {t.legal.name} — {t.footer.rights}</span>
          <span>Know-how · Know-who</span>
        </div>
      </footer>
    </>
  );
}

/* -------------------- Helpers -------------------- */

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-[1500px]">{children}</div>
    </section>
  );
}

function Arrow() {
  return (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[16px] w-[16px]"><path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg>);
}
function Dot() {
  return <span className="h-2 w-2 shrink-0 rounded-full bg-acc" />;
}
