import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import { PadantalLogo } from "@/components/PadantalLogo";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Reveal } from "@/components/Reveal";
import { HeroScrollVideo } from "@/components/HeroScrollVideo";
import {
  hero,
  about,
  services,
  pillars,
  societies,
  cases,
  conclusion,
  contact,
  company,
  legal,
} from "@/content/site";

const chain = [
  { t: "Captura & operación", d: "Activación y gestión de flotas industriales." },
  { t: "Procesado & planta", d: "Integración de plantas y conserveras." },
  { t: "Logística", d: "Optimización de procesos y transporte." },
  { t: "Valor añadido & exportación", d: "Acceso directo a mercados internacionales." },
];

const regions = ["Omán", "Marruecos", "España", "Océano Índico", "Atlántico"];

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteNav />

      <main id="inicio">
        {/* ===================== HERO ===================== */}
        <HeroScrollVideo />

        {/* ===================== BARRA DE STATS ===================== */}
        <section className="relative z-10 -mt-px px-6">
          <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {hero.stats.map((s) => (
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

        {/* ===================== CADENA DE VALOR (nodos) ===================== */}
        <Section id="cadena">
          <Reveal>
            <SectionHead eyebrow="Cadena de valor" title="De la captura a la exportación" intro="Operamos en todos los eslabones del sector pesquero industrial." />
          </Reveal>
          <div className="relative mt-14">
            <div className="node-line absolute left-0 right-0 top-7 hidden md:block" />
            <div className="grid gap-8 md:grid-cols-4">
              {chain.map((c, i) => (
                <Reveal key={c.t} delay={i * 0.08} className="relative text-center md:text-left">
                  <div className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-cyan/40 bg-base md:mx-0">
                    <span className="font-display text-[1.05rem] font-semibold text-cyan-bright">{i + 1}</span>
                    <span className="absolute inset-0 rounded-full ring-1 ring-cyan/20 [animation:pulse-node_3s_ease-in-out_infinite]" />
                  </div>
                  <h3 className="mt-5 text-[1.15rem] font-semibold">{c.t}</h3>
                  <p className="mt-2 text-[0.95rem] text-muted">{c.d}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </Section>

        {/* ===================== QUIÉNES SOMOS ===================== */}
        <Section id="nosotros" tint>
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-2xl border border-line">
                <div className="relative aspect-[5/4]">
                  <Image src="/assets/img/harbour.jpg" alt="Flota pesquera en puerto" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                </div>
              </div>
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <span className="eyebrow">{about.eyebrow}</span>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold">{about.title}</h2>
              <div className="mt-6 space-y-4 text-[1.02rem] text-muted">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {about.know.map((k) => (
                  <div key={k.term} className="glass rounded-2xl p-5">
                    <b className="font-display font-semibold text-cyan-bright">{k.term}</b>
                    <p className="mt-1 text-[0.9rem] text-muted">{k.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ===================== QUÉ HACEMOS ===================== */}
        <Section id="servicios">
          <Reveal>
            <SectionHead eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="group h-full rounded-2xl glass p-8 transition-[transform,border-color] duration-400 hover:-translate-y-1 hover:border-cyan/40">
                <span className="font-display text-[0.95rem] font-semibold text-cyan">0{i + 1}</span>
                <h3 className="mt-3 text-[1.4rem] font-semibold">{s.title}</h3>
                <p className="mt-3 text-[1rem] text-muted">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===================== OPERACIÓN GLOBAL (mapa/arcos) ===================== */}
        <Section id="operacion" tint>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
            <Reveal>
              <span className="eyebrow">Operación global</span>
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,3rem)] font-semibold">Proyectos en más de 10 países</h2>
              <p className="mt-6 max-w-[46ch] text-[1.02rem] text-muted">
                Integramos barcos de distintos océanos bajo un marco legal y operativo impecable, con acceso directo a armadores, gobiernos, plantas y mercados.
              </p>
              <div className="mt-7 flex flex-wrap gap-2.5">
                {regions.map((r) => (
                  <span key={r} className="rounded-full border border-line bg-surface/60 px-4 py-2 text-[0.88rem]">{r}</span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <OperationsGlobe />
            </Reveal>
          </div>
        </Section>

        {/* ===================== 3 PILARES ===================== */}
        <Section id="pilares">
          <Reveal>
            <SectionHead eyebrow={pillars.eyebrow} title={pillars.title} intro={pillars.intro} center />
          </Reveal>
          <div className="mt-14 grid gap-5 lg:grid-cols-3">
            {pillars.items.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08} className="glass h-full rounded-2xl p-8">
                <div className="font-display text-[2.4rem] font-semibold leading-none text-cyan-bright">{p.n}</div>
                <h3 className="mt-4 text-[1.3rem] font-semibold">{p.title}</h3>
                <ul className="mt-5 space-y-3">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-[0.96rem] text-muted">
                      <Check />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
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
                <article className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <div className="overflow-hidden rounded-2xl border border-line">
                    <div className="relative aspect-[4/3]">
                      <Image src={c.image} alt={c.title} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
                    </div>
                  </div>
                  <div>
                    <span className="eyebrow">{c.badge}</span>
                    <h3 className="mt-4 text-[clamp(1.6rem,3vw,2.3rem)] font-semibold">{c.title}</h3>
                    <p className="mt-2 text-[0.82rem] uppercase tracking-[0.12em] text-faint">{c.location}</p>
                    <p className="mt-5 text-[1.02rem] text-muted">{c.lead}</p>
                    <ul className="mt-5 space-y-3">
                      {c.points.map((pt, j) => (
                        <li key={j} className="flex gap-3 text-[0.96rem] text-muted">
                          <Check />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-7 flex items-center gap-5 rounded-2xl glass glass-cyan px-6 py-5">
                      <span className="font-display text-[2.4rem] font-semibold leading-none text-cyan-bright">{c.result.big}</span>
                      <p className="text-[0.96rem] text-muted">{c.result.text}</p>
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
                <figure className="flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-white px-6 pb-5 pt-7">
                  <span className="relative flex h-12 items-center justify-center">
                    <Image src={l.src} alt={l.alt} width={150} height={48} style={{ width: "auto", height: "auto" }} className="max-h-12 max-w-[130px] object-contain" />
                  </span>
                  <figcaption className="text-center text-[0.74rem] text-slate-500">{l.caption}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {societies.orps.map((o) => (
              <div key={o.b} className="glass rounded-2xl px-5 py-4 text-center">
                <b className="block font-display font-semibold text-cyan-bright">{o.b}</b>
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
              <h2 className="mt-5 text-[clamp(1.9rem,4vw,2.9rem)] font-semibold">{company.title}</h2>
              <p className="mt-6 max-w-[50ch] text-[1.02rem] text-muted">{company.intro}</p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {company.facts.map((f) => (
                  <div key={f.k} className="glass rounded-2xl p-5">
                    <div className="text-[0.72rem] uppercase tracking-[0.14em] text-cyan">{f.k}</div>
                    <div className="mt-1.5 text-[1.02rem]">{f.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="glass glass-cyan rounded-2xl p-8">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-cyan/50 font-display text-[1.1rem] font-semibold text-cyan-bright">DV</span>
                  <div>
                    <div className="font-display text-[1.25rem] font-semibold">{company.founder.name}</div>
                    <div className="text-[0.9rem] text-cyan-bright">{company.founder.role}</div>
                  </div>
                </div>
                <p className="mt-6 text-[1rem] text-muted">{company.founder.note}</p>
                <a href="#contacto" className="mt-6 inline-flex items-center gap-2 text-[0.95rem] font-medium text-cyan-bright hover:text-cyan">
                  Hablar con Padantal <Arrow />
                </a>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ===================== CONCLUSIÓN / CTA ===================== */}
        <section id="contacto" className="relative overflow-hidden px-6 py-28 md:py-40">
          <div className="cyan-orb left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 opacity-50" />
          <Reveal className="relative mx-auto max-w-[860px] text-center">
            <span className="eyebrow center">{conclusion.eyebrow}</span>
            <h2 className="mt-6 text-[clamp(2.1rem,5vw,3.6rem)] font-semibold">
              {conclusion.titleLead} <span className="text-cyan-bright">{conclusion.titleAccent}</span>.
            </h2>
            <p className="mx-auto mt-7 max-w-[640px] text-[1.12rem] text-muted">{conclusion.lead}</p>
            <div className="mx-auto mt-10 flex max-w-[640px] flex-wrap justify-center gap-x-12 gap-y-6 text-left">
              {conclusion.duo.map((d) => (
                <div key={d.term} className="max-w-[260px]">
                  <b className="font-display font-semibold text-cyan-bright">{d.term}</b>
                  <p className="mt-1 text-[0.96rem] text-muted">{d.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              <a href={`mailto:${contact.email}`} className="btn btn-primary">
                Contactar con Padantal
                <Arrow />
              </a>
              <a href="#inicio" className="btn btn-ghost">Volver al inicio</a>
            </div>
          </Reveal>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="border-t border-line bg-surface/40 px-6 py-14">
        <div className="mx-auto grid max-w-[1280px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="text-ink"><PadantalLogo /></a>
            <p className="mt-4 max-w-[320px] text-[0.92rem] text-muted">
              Socio estratégico global del sector pesquero. Know-how técnico y know-who internacional para liderar, activar y transformar proyectos complejos.
            </p>
          </div>
          <div>
            <div className="eyebrow center">Navegación</div>
            <ul className="mt-4 space-y-2 text-[0.95rem] text-muted">
              <li><a href="#nosotros" className="hover:text-cyan-bright">Quiénes somos</a></li>
              <li><a href="#servicios" className="hover:text-cyan-bright">Qué hacemos</a></li>
              <li><a href="#casos" className="hover:text-cyan-bright">Casos de éxito</a></li>
              <li><a href="#contacto" className="hover:text-cyan-bright">Contacto</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow center">{legal.name}</div>
            <ul className="mt-4 space-y-2 text-[0.92rem] text-muted">
              <li><a href={`mailto:${contact.email}`} className="hover:text-cyan-bright">{contact.email}</a></li>
              <li>{legal.address}</li>
              <li>NIF {legal.nif}</li>
              <li>{legal.registry}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1280px] flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[0.84rem] text-faint">
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

function OperationsGlobe() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px]">
      <div className="cyan-orb inset-0 opacity-40" />
      <svg viewBox="0 0 400 400" className="relative h-full w-full">
        <defs>
          <radialGradient id="g" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#0e2b48" />
            <stop offset="100%" stopColor="#081428" />
          </radialGradient>
        </defs>
        <circle cx="200" cy="200" r="150" fill="url(#g)" stroke="rgba(56,189,248,.35)" strokeWidth="1" />
        {/* meridianos / paralelos */}
        {[40, 80, 120].map((r) => (
          <ellipse key={r} cx="200" cy="200" rx={r} ry="150" fill="none" stroke="rgba(120,180,230,.18)" strokeWidth="1" />
        ))}
        {[ -60, 0, 60 ].map((o) => (
          <line key={o} x1="50" y1={200 + o} x2="350" y2={200 + o} stroke="rgba(120,180,230,.14)" strokeWidth="1" />
        ))}
        {/* arcos entre nodos */}
        <path d="M150 150 Q200 80 250 170" fill="none" stroke="#38bdf8" strokeWidth="1.6" opacity=".9" />
        <path d="M250 170 Q230 240 175 250" fill="none" stroke="#67d6ff" strokeWidth="1.6" opacity=".9" />
        {/* nodos */}
        {[
          { x: 150, y: 150, l: "España" },
          { x: 250, y: 170, l: "Marruecos" },
          { x: 175, y: 250, l: "Omán" },
        ].map((n) => (
          <g key={n.l}>
            <circle cx={n.x} cy={n.y} r="9" fill="rgba(56,189,248,.18)" />
            <circle cx={n.x} cy={n.y} r="3.5" fill="#67d6ff" />
            <text x={n.x + 12} y={n.y + 4} fill="#cfe6fb" fontSize="12" fontFamily="sans-serif">{n.l}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-[16px] w-[16px]">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="mt-1 h-[16px] w-[16px] shrink-0 text-cyan">
      <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
