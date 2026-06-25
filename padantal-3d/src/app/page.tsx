import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import { PadantalLogo } from "@/components/PadantalLogo";
import { ImmersiveBackground } from "@/components/ImmersiveBackground";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Reveal } from "@/components/Reveal";
import {
  hero,
  about,
  services,
  pillars,
  societies,
  cases,
  conclusion,
  contact,
} from "@/content/site";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ImmersiveBackground />
      <SiteNav />

      <main id="inicio" className="relative">
        {/* ---------------- HERO (escena abierta) ---------------- */}
        <section className="relative flex min-h-screen items-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_30%_45%,rgba(6,16,31,.55),transparent_60%)]" />
          <div className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-36">
            <div className="max-w-[760px]">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 className="mt-5 text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold drop-shadow-[0_2px_30px_rgba(0,0,0,.5)]">
                {hero.titleLead} <span className="text-aqua">{hero.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-[600px] text-[clamp(1.05rem,2vw,1.28rem)] text-ink/90 drop-shadow-[0_1px_12px_rgba(0,0,0,.6)]">
                {hero.lead}
              </p>
              <div className="mt-9 flex flex-wrap gap-3.5">
                <a href={hero.ctaPrimary.href} className="btn-primary">
                  {hero.ctaPrimary.label}
                  <Arrow />
                </a>
                <a href={hero.ctaSecondary.href} className="btn-ghost">
                  {hero.ctaSecondary.label}
                </a>
              </div>

              <dl className="mt-16 flex flex-wrap gap-x-10 gap-y-6">
                {hero.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold">
                      {s.value} <span className="text-aqua">{s.unit}</span>
                    </dt>
                    <dd className="text-[0.92rem] text-ink/70">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <ScrollCue />
        </section>

        {/* ---------------- QUIÉNES SOMOS ---------------- */}
        <Section id="nosotros">
          <Reveal>
            <Panel className="grid items-center gap-12 p-8 md:p-12 lg:grid-cols-[1.05fr_.95fr]">
              <div>
                <Eyebrow>{about.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold">{about.title}</h2>
                <div className="mt-6 space-y-4 text-[1.05rem] text-ink/85">
                  {about.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-3.5">
                  {about.know.map((k) => (
                    <div key={k.term} className="min-w-[150px] flex-1 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                      <b className="font-display text-aqua">{k.term}</b>
                      <p className="mt-1 text-[0.9rem] text-ink/65">{k.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative min-h-[360px] overflow-hidden rounded-2xl border border-white/10">
                <Image src="/assets/img/harbour.jpg" alt="Flota pesquera en puerto" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(8,18,33,.85)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <h3 className="text-xl font-bold">Presencia y ejecución global</h3>
                  <p className="mt-1.5 text-[0.95rem] text-ink/80">De la captura a la exportación, cada eslabón con estándares internacionales.</p>
                </div>
              </div>
            </Panel>
          </Reveal>
        </Section>

        {/* ---------------- QUÉ HACEMOS ---------------- */}
        <Section id="servicios">
          <Reveal>
            <SectionHead eyebrow={services.eyebrow} title={services.title} intro={services.intro} center />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.06} className="rounded-2xl border border-white/10 bg-navy-900/55 p-8 backdrop-blur-md transition-colors duration-300 hover:border-aqua/40">
                <h3 className="text-[1.22rem] font-bold">{s.title}</h3>
                <p className="mt-2.5 text-ink/70">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------------- 3 PILARES ---------------- */}
        <Section id="pilares">
          <Reveal>
            <SectionHead eyebrow={pillars.eyebrow} title={pillars.title} intro={pillars.intro} center />
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {pillars.items.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08} className="rounded-2xl border border-white/10 bg-navy-900/55 p-8 backdrop-blur-md transition-colors duration-300 hover:border-aqua/40">
                <div className="font-display text-4xl font-extrabold text-aqua">{p.n}</div>
                <h3 className="mt-3.5 text-[1.26rem] font-bold">{p.title}</h3>
                <ul className="mt-4 space-y-3">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-[0.98rem] text-ink/80">
                      <Check />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------------- SOCIEDADES ---------------- */}
        <Section id="socios">
          <Reveal>
            <Panel className="grid items-stretch gap-8 p-8 md:p-10 lg:grid-cols-[.82fr_1.18fr]">
              <aside className="relative flex min-h-[360px] items-end overflow-hidden rounded-2xl border border-white/10 p-8">
                <Image src="/assets/img/fleet.jpg" alt="Flota comercial de pesca" fill sizes="(max-width:1024px) 100vw, 35vw" className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,23,41,.5)_0%,rgba(11,23,41,.6)_50%,rgba(11,23,41,.92)_100%)]" />
                <div className="relative">
                  <Eyebrow>{societies.eyebrow}</Eyebrow>
                  <h2 className="mt-4 text-[clamp(1.6rem,2.4vw,2.1rem)] font-bold">{societies.title}</h2>
                  <p className="mt-3 max-w-[340px] text-ink/80">{societies.intro}</p>
                  <PadantalLogo withWordmark={false} className="mt-6 text-ink/90 [&_svg]:h-11" />
                </div>
              </aside>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {societies.logos.map((l) => (
                  <figure key={l.alt} className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white px-5 pb-4 pt-6">
                    <span className="relative flex h-14 w-[78%] items-center justify-center">
                      <Image src={l.src} alt={l.alt} width={170} height={56} style={{ width: "auto", height: "auto" }} className="max-h-14 max-w-[78%] object-contain" />
                    </span>
                    <figcaption className="text-center font-display text-[0.78rem] font-medium text-slate-500">{l.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </Panel>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {societies.orps.map((o) => (
              <div key={o.b} className="rounded-xl border border-white/10 bg-navy-900/55 p-5 text-center backdrop-blur-md">
                <b className="block font-display text-[1.12rem] text-aqua">{o.b}</b>
                <span className="text-[0.84rem] text-ink/65">{o.s}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------- CASOS DE ÉXITO ---------------- */}
        <Section id="casos">
          <Reveal>
            <SectionHead eyebrow={cases.eyebrow} title={cases.title} intro={cases.intro} center />
          </Reveal>
          <div className="mt-12 space-y-6">
            {cases.items.map((c) => (
              <Reveal key={c.title} className="overflow-hidden rounded-3xl border border-white/10 bg-navy-900/55 backdrop-blur-md">
                <div className="grid md:grid-cols-[300px_1fr]">
                  <div className="relative flex flex-col justify-between gap-6 overflow-hidden p-8">
                    <Image src={c.image} alt={c.title} fill sizes="300px" className="object-cover" />
                    <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,18,33,.72)_0%,rgba(8,18,33,.82)_60%,rgba(8,18,33,.93)_100%)]" />
                    <span className="relative w-max rounded-full border border-aqua/30 bg-aqua/10 px-3.5 py-1.5 font-display text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-aqua">
                      {c.badge}
                    </span>
                    <div className="relative">
                      <h3 className="text-[1.3rem] font-bold">{c.title}</h3>
                      <p className="mt-3 text-[0.9rem] text-ink/70">{c.location}</p>
                    </div>
                  </div>
                  <div className="p-8">
                    <p className="text-[1.02rem] text-ink/85">{c.lead}</p>
                    <ul className="mb-6 mt-5 space-y-3">
                      {c.points.map((pt, i) => (
                        <li key={i} className="flex gap-3 text-[0.98rem] text-ink/80">
                          <Check />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center gap-5 rounded-2xl border border-aqua/20 bg-aqua/10 px-6 py-4">
                      <span className="font-display text-[2.1rem] font-extrabold leading-none text-aqua">{c.result.big}</span>
                      <p className="text-[0.98rem] font-medium text-ink/90">{c.result.text}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ---------------- CONCLUSIÓN / CONTACTO (clímax: la captura) ---------------- */}
        <Section id="contacto">
          <Reveal>
            <Panel className="mx-auto max-w-[820px] p-10 text-center md:p-14">
              <Eyebrow center>{conclusion.eyebrow}</Eyebrow>
              <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold">
                {conclusion.titleLead} <span className="text-aqua">{conclusion.titleAccent}</span>.
              </h2>
              <p className="mt-6 text-[1.15rem] text-ink/85">{conclusion.lead}</p>
              <div className="mt-10 flex flex-wrap justify-center gap-8 text-left">
                {conclusion.duo.map((d) => (
                  <div key={d.term} className="max-w-[260px]">
                    <b className="font-display text-aqua">{d.term}</b>
                    <p className="mt-1 text-[0.96rem] text-ink/70">{d.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-11 flex flex-wrap justify-center gap-3.5">
                <a href={`mailto:${contact.email}`} className="btn-primary">
                  Contactar con Padantal
                  <Arrow />
                </a>
                <a href="#inicio" className="btn-ghost">Volver al inicio</a>
              </div>
            </Panel>
          </Reveal>
        </Section>
      </main>

      <footer className="relative">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 px-6 py-10 text-ink/60">
          <a href="#inicio" className="text-ink">
            <PadantalLogo />
          </a>
          <p className="text-[0.86rem]">© {new Date().getFullYear()} Padantal SL · Know-how · Know-who · Ejecución real</p>
        </div>
      </footer>
    </>
  );
}

/* -------------------- Helpers de UI -------------------- */

function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1180px] px-6">{children}</div>
    </section>
  );
}

function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl border border-white/10 bg-navy-900/55 shadow-2xl shadow-black/40 backdrop-blur-md ${className}`}>
      {children}
    </div>
  );
}

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 font-display text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-aqua ${center ? "justify-center" : ""}`}>
      <span className="h-0.5 w-6 rounded bg-aqua" />
      {children}
    </span>
  );
}

function SectionHead({ eyebrow, title, intro, center }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`max-w-[680px] ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold drop-shadow-[0_2px_20px_rgba(0,0,0,.4)]">{title}</h2>
      {intro && <p className="mt-4 text-[1.12rem] text-ink/75">{intro}</p>}
    </div>
  );
}

function ScrollCue() {
  return (
    <div className="pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[0.72rem] uppercase tracking-[0.2em] text-ink/55">
      <span className="relative h-9 w-[22px] rounded-full border-2 border-white/40">
        <span className="absolute left-1/2 top-[7px] h-[7px] w-[3px] -translate-x-1/2 rounded bg-white motion-safe:animate-[scrollcue_1.6s_infinite]" />
      </span>
      Desciende
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="h-[18px] w-[18px]">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check({ className = "text-aqua" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} className={`mt-1 h-[18px] w-[18px] shrink-0 ${className}`}>
      <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
