import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import { PadantalLogo } from "@/components/PadantalLogo";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Reveal } from "@/components/Reveal";
import { HeroScrollVideo } from "@/components/HeroScrollVideo";
import {
  about,
  services,
  pillars,
  societies,
  cases,
  conclusion,
  contact,
  company,
  legal,
  heroCards,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteNav />

      <main id="inicio">
        {/* ===================== HERO ===================== */}
        <HeroScrollVideo />

        {/* KPIs en móvil (en escritorio van como tarjetas glass del hero) */}
        <div className="grid grid-cols-3 gap-3 px-6 py-8 lg:hidden">
          {heroCards.map((c) => (
            <div key={c.label} className="glass rounded-2xl p-4 text-center">
              <div className="font-display text-[1.5rem] leading-none text-white">{c.value}</div>
              <div className="mt-1.5 text-[0.72rem] leading-tight text-muted">{c.label}</div>
            </div>
          ))}
        </div>

        {/* ===================== QUIÉNES SOMOS ===================== */}
        <Section id="nosotros">
          <div className="grid items-center gap-14 lg:grid-cols-[.92fr_1.08fr]">
            <Reveal className="order-2 lg:order-1">
              <div className="glass overflow-hidden rounded-3xl p-1.5">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.4rem]">
                  <Image src="/assets/img/harbour.jpg" alt="Flota pesquera en puerto" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                </div>
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <span className="eyebrow">{about.eyebrow}</span>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)] font-medium">{about.title}</h2>
              <div className="mt-6 space-y-4 text-[1.05rem] leading-relaxed text-muted">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {about.know.map((k) => (
                  <div key={k.term} className="glass rounded-2xl p-5">
                    <b className="font-display text-[1.15rem] font-semibold text-amber-bright">{k.term}</b>
                    <p className="mt-1 text-[0.92rem] text-muted">{k.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ===================== QUÉ HACEMOS ===================== */}
        <Section id="servicios" tint>
          <Reveal>
            <SectionHead eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="group h-full transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                <div className="bezel h-full transition-shadow duration-500 group-hover:shadow-[0_30px_70px_-26px_rgba(245,166,35,0.4)]">
                  <div className="bezel-core p-8">
                    <span className="font-display text-[0.95rem] font-semibold text-amber">0{i + 1}</span>
                    <h3 className="mt-3 text-[1.45rem]">{s.title}</h3>
                    <p className="mt-3 text-[1rem] leading-relaxed text-muted">{s.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===================== 3 PILARES ===================== */}
        <Section id="pilares">
          <Reveal>
            <SectionHead title={pillars.title} intro={pillars.intro} center />
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {pillars.items.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08} className="h-full">
                <div className="bezel h-full">
                  <div className="bezel-core p-8">
                    <div className="font-display text-[2.6rem] leading-none text-amber-bright">{p.n}</div>
                    <h3 className="mt-4 text-[1.35rem]">{p.title}</h3>
                    <ul className="mt-5 space-y-3">
                      {p.points.map((pt, j) => (
                        <li key={j} className="flex gap-3 text-[0.98rem] leading-relaxed text-muted">
                          <Check />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===================== CASOS DE ÉXITO ===================== */}
        <Section id="casos" tint>
          <Reveal>
            <SectionHead eyebrow={cases.eyebrow} title={cases.title} intro={cases.intro} center />
          </Reveal>
          <div className="mt-16 space-y-16 md:space-y-24">
            {cases.items.map((c, i) => (
              <Reveal key={c.title}>
                <article className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="glass overflow-hidden rounded-3xl p-1.5">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem]">
                      <Image src={c.image} alt={c.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  </div>
                  <div>
                    <span className="eyebrow">{c.badge}</span>
                    <h3 className="mt-4 text-[clamp(1.6rem,3vw,2.4rem)] font-medium">{c.title}</h3>
                    <p className="mt-2 text-[0.92rem] font-medium uppercase tracking-[0.12em] text-faint">{c.location}</p>
                    <p className="mt-5 text-[1.05rem] leading-relaxed text-muted">{c.lead}</p>
                    <ul className="mt-5 space-y-3">
                      {c.points.map((pt, j) => (
                        <li key={j} className="flex gap-3 text-[0.98rem] leading-relaxed text-muted">
                          <Check />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex items-center gap-5 rounded-2xl glass glow-amber px-6 py-5">
                      <span className="font-display text-[2.4rem] font-semibold leading-none text-amber-bright">{c.result.big}</span>
                      <p className="text-[0.98rem] leading-snug text-white/85">{c.result.text}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===================== SOCIEDADES ===================== */}
        <Section id="socios">
          <Reveal>
            <SectionHead title={societies.title} intro={societies.intro} center />
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {societies.logos.map((l, i) => (
              <Reveal key={l.alt} delay={i * 0.05} className="h-full">
                <figure className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-white px-5 pb-4 pt-6">
                  <span className="relative flex h-12 items-center justify-center">
                    <Image src={l.src} alt={l.alt} width={150} height={48} style={{ width: "auto", height: "auto" }} className="max-h-12 max-w-[130px] object-contain" />
                  </span>
                  <figcaption className="text-center text-[0.74rem] font-medium tracking-wide text-slate-500">{l.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {societies.orps.map((o) => (
              <div key={o.b} className="glass rounded-2xl px-5 py-4 text-center">
                <b className="block font-display text-[1.1rem] font-semibold text-amber-bright">{o.b}</b>
                <span className="text-[0.82rem] text-muted">{o.s}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ===================== LA COMPAÑÍA ===================== */}
        <Section id="compania" tint>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_.9fr]">
            <Reveal>
              <span className="eyebrow">{company.eyebrow}</span>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3rem)] font-medium">{company.title}</h2>
              <p className="mt-6 max-w-[560px] text-[1.05rem] leading-relaxed text-muted">{company.intro}</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {company.facts.map((f) => (
                  <div key={f.k} className="glass rounded-2xl p-5">
                    <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-amber">{f.k}</div>
                    <div className="mt-1.5 text-[1.02rem] text-white/90">{f.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass glow-amber rounded-3xl p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-bright to-amber-deep font-display text-2xl font-semibold text-[#1a1206]">
                    DV
                  </span>
                  <div>
                    <div className="font-display text-[1.3rem] font-semibold text-white">{company.founder.name}</div>
                    <div className="text-[0.9rem] text-amber-bright">{company.founder.role}</div>
                  </div>
                </div>
                <p className="mt-6 text-[1.02rem] leading-relaxed text-muted">{company.founder.note}</p>
                <div className="mt-6 border-t border-white/10 pt-5">
                  <div className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-faint">Conoce el proyecto</div>
                  <a href="#contacto" className="mt-3 inline-flex items-center gap-2 font-medium text-amber-bright hover:text-amber-bright/80">
                    Hablar con Padantal <Arrow />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ===================== CONCLUSIÓN / CTA ===================== */}
        <section id="contacto" className="relative overflow-hidden px-6 py-28 md:py-40">
          <div className="amber-orb left-1/2 top-0 h-[36rem] w-[36rem] -translate-x-1/2 opacity-40" />
          <Reveal className="relative mx-auto max-w-[860px] text-center">
            <span className="eyebrow">{conclusion.eyebrow}</span>
            <h2 className="mt-6 text-[clamp(2.2rem,5vw,3.8rem)] font-medium">
              {conclusion.titleLead}{" "}
              <span className="text-amber-bright">{conclusion.titleAccent}</span>.
            </h2>
            <p className="mx-auto mt-7 max-w-[640px] text-[1.15rem] leading-relaxed text-muted">{conclusion.lead}</p>
            <div className="mx-auto mt-10 flex max-w-[640px] flex-wrap justify-center gap-x-12 gap-y-6 text-left">
              {conclusion.duo.map((d) => (
                <div key={d.term} className="max-w-[260px]">
                  <b className="font-display text-[1.2rem] font-semibold text-amber-bright">{d.term}</b>
                  <p className="mt-1 text-[0.96rem] text-muted">{d.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${contact.email}`} className="btn btn-primary">
                Contactar con Padantal
                <span className="ic"><Arrow /></span>
              </a>
              <a href="#inicio" className="btn btn-ghost">Volver al inicio</a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ===================== FOOTER (con datos legales) ===================== */}
      <footer className="border-t border-white/10 bg-surface/60 px-6 py-14">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="text-ink">
              <PadantalLogo />
            </a>
            <p className="mt-4 max-w-[320px] text-[0.92rem] leading-relaxed text-muted">
              Socio estratégico global del sector pesquero. Know-how técnico y know-who internacional para liderar, activar y transformar proyectos complejos.
            </p>
          </div>
          <div>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-faint">Navegación</div>
            <ul className="mt-4 space-y-2 text-[0.95rem] text-muted">
              <li><a href="#nosotros" className="hover:text-amber-bright">Quiénes somos</a></li>
              <li><a href="#servicios" className="hover:text-amber-bright">Qué hacemos</a></li>
              <li><a href="#casos" className="hover:text-amber-bright">Casos de éxito</a></li>
              <li><a href="#contacto" className="hover:text-amber-bright">Contacto</a></li>
            </ul>
          </div>
          <div>
            <div className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-faint">{legal.name}</div>
            <ul className="mt-4 space-y-2 text-[0.92rem] text-muted">
              <li><a href={`mailto:${contact.email}`} className="hover:text-amber-bright">{contact.email}</a></li>
              <li>{legal.address}</li>
              <li>NIF {legal.nif}</li>
              <li>{legal.registry}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1280px] flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-[0.84rem] text-faint">
          <span>© {new Date().getFullYear()} {legal.name}. Todos los derechos reservados.</span>
          <span>Know-how · Know-who · Ejecución real</span>
        </div>
      </footer>
    </>
  );
}

/* -------------------- Helpers -------------------- */

function Section({ id, children, tint }: { id: string; children: React.ReactNode; tint?: boolean }) {
  return (
    <section id={id} className={`relative px-6 py-24 md:py-32 ${tint ? "bg-surface/40" : ""}`}>
      <div className="mx-auto max-w-[1280px]">{children}</div>
    </section>
  );
}

function SectionHead({ eyebrow, title, intro, center }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`max-w-[720px] ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`text-[clamp(2rem,4.2vw,3.4rem)] ${eyebrow ? "mt-5" : ""}`}>{title}</h2>
      {intro && <p className="mt-5 text-[1.12rem] leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[18px] w-[18px]">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="mt-1 h-[17px] w-[17px] shrink-0 text-amber">
      <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
