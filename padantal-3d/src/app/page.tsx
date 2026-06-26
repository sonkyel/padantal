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

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <SiteNav />

      <main id="inicio">
        {/* ===================== HERO ===================== */}
        <HeroScrollVideo />

        {/* ===================== STATS (fila editorial) ===================== */}
        <section className="border-b border-obsidian/10 px-6 py-16">
          <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {hero.stats.map((s) => (
              <Reveal key={s.label}>
                <div className="text-[clamp(2.4rem,4vw,3.4rem)] font-extralight leading-none tracking-[-0.04em]">
                  {s.value}
                  <span className="ml-1 text-[0.42em] font-normal text-muted">{s.unit}</span>
                </div>
                <div className="mt-3 text-[0.92rem] text-muted">{s.label}</div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===================== QUIÉNES SOMOS ===================== */}
        <Section id="nosotros">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <Reveal className="order-2 lg:order-1">
              <Photo src="/assets/img/harbour.jpg" alt="Flota pesquera en puerto" ratio="aspect-[5/4]" />
            </Reveal>
            <Reveal className="order-1 lg:order-2">
              <span className="eyebrow">{about.eyebrow}</span>
              <h2 className="mt-5 text-[clamp(2rem,4.4vw,3.6rem)]">{about.title}</h2>
              <div className="mt-7 max-w-[44ch] space-y-4 text-[1.02rem] text-muted">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-9 flex flex-wrap gap-3">
                {about.know.map((k) => (
                  <div key={k.term} className="rounded-[30px] border border-obsidian/15 px-6 py-4">
                    <b className="font-medium">{k.term}</b>
                    <span className="ml-2 text-[0.9rem] text-muted">{k.desc}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ===================== QUÉ HACEMOS ===================== */}
        <Section id="servicios" divide>
          <Reveal>
            <SectionHead eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
          </Reveal>
          <div className="mt-16 grid gap-px overflow-hidden rounded-[30px] border border-obsidian/12 bg-obsidian/12 md:grid-cols-2">
            {services.items.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05} className="bg-paper p-9 transition-colors duration-300 hover:bg-obsidian/[0.02]">
                <span className="text-[0.85rem] text-faint">0{i + 1}</span>
                <h3 className="mt-3 text-[1.5rem] font-normal tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-3 max-w-[42ch] text-[1rem] text-muted">{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===================== 3 PILARES ===================== */}
        <Section id="pilares" divide>
          <Reveal>
            <SectionHead title={pillars.title} intro={pillars.intro} center />
          </Reveal>
          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            {pillars.items.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.07}>
                <div className="text-[2.4rem] font-extralight leading-none tracking-[-0.05em] text-obsidian/30">{p.n}</div>
                <h3 className="mt-4 text-[1.4rem] font-normal tracking-[-0.03em]">{p.title}</h3>
                <ul className="mt-5 space-y-3">
                  {p.points.map((pt, j) => (
                    <li key={j} className="flex gap-3 text-[0.98rem] text-muted">
                      <Dot />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===================== CASOS DE ÉXITO ===================== */}
        <Section id="casos" divide>
          <Reveal>
            <SectionHead eyebrow={cases.eyebrow} title={cases.title} intro={cases.intro} />
          </Reveal>
          <div className="mt-16 space-y-20 md:space-y-28">
            {cases.items.map((c, i) => (
              <Reveal key={c.title}>
                <article className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                  <Photo src={c.image} alt={c.title} ratio="aspect-[4/3]" />
                  <div>
                    <span className="eyebrow">{c.badge}</span>
                    <h3 className="mt-4 text-[clamp(1.7rem,3vw,2.6rem)] font-light tracking-[-0.035em]">{c.title}</h3>
                    <p className="mt-2 text-[0.82rem] uppercase tracking-[0.14em] text-faint">{c.location}</p>
                    <p className="mt-6 max-w-[46ch] text-[1.02rem] text-muted">{c.lead}</p>
                    <ul className="mt-5 space-y-3">
                      {c.points.map((pt, j) => (
                        <li key={j} className="flex gap-3 text-[0.98rem] text-muted">
                          <Dot />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 flex items-baseline gap-4 border-t border-obsidian/12 pt-6">
                      <span className="text-[3rem] font-extralight leading-none tracking-[-0.05em]">{c.result.big}</span>
                      <p className="max-w-[34ch] text-[0.96rem] text-muted">{c.result.text}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Section>

        {/* ===================== SOCIEDADES (banda de tinte) ===================== */}
        <section id="socios" className="bg-tint/35 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <SectionHead title={societies.title} intro={societies.intro} center />
            </Reveal>
            <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {societies.logos.map((l, i) => (
                <Reveal key={l.alt} delay={i * 0.05} className="h-full">
                  <figure className="flex h-full flex-col items-center justify-center gap-3 rounded-[30px] bg-paper px-6 pb-5 pt-8">
                    <span className="relative flex h-12 items-center justify-center">
                      <Image src={l.src} alt={l.alt} width={150} height={48} style={{ width: "auto", height: "auto" }} className="max-h-12 max-w-[130px] object-contain" />
                    </span>
                    <figcaption className="text-center text-[0.74rem] text-faint">{l.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {societies.orps.map((o) => (
                <span key={o.b} className="pill bg-paper">
                  <b className="font-medium">{o.b}</b>
                  <span className="text-muted">· {o.s}</span>
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== LA COMPAÑÍA ===================== */}
        <Section id="compania" divide>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_.85fr]">
            <Reveal>
              <span className="eyebrow">{company.eyebrow}</span>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.2rem)]">{company.title}</h2>
              <p className="mt-6 max-w-[48ch] text-[1.02rem] text-muted">{company.intro}</p>
              <div className="mt-9 grid grid-cols-2 gap-x-8 gap-y-6">
                {company.facts.map((f) => (
                  <div key={f.k} className="border-t border-obsidian/12 pt-3">
                    <div className="text-[0.72rem] uppercase tracking-[0.14em] text-faint">{f.k}</div>
                    <div className="mt-1 text-[1.02rem]">{f.v}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-[30px] border border-obsidian/15 p-9">
                <div className="flex items-center gap-4">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-obsidian text-[1.05rem] font-normal">DV</span>
                  <div>
                    <div className="text-[1.25rem] font-normal tracking-[-0.02em]">{company.founder.name}</div>
                    <div className="text-[0.9rem] text-muted">{company.founder.role}</div>
                  </div>
                </div>
                <p className="mt-6 text-[1rem] text-muted">{company.founder.note}</p>
                <a href="#contacto" className="mt-6 inline-flex items-center gap-2 text-[0.95rem] text-obsidian underline-offset-4 hover:underline">
                  Hablar con Padantal <Arrow />
                </a>
              </div>
            </Reveal>
          </div>
        </Section>

        {/* ===================== CONCLUSIÓN / CTA ===================== */}
        <section id="contacto" className="border-t border-obsidian/10 px-6 py-28 md:py-40">
          <Reveal className="mx-auto max-w-[860px] text-center">
            <span className="eyebrow">{conclusion.eyebrow}</span>
            <h2 className="display mt-6 text-[clamp(2.4rem,6vw,5rem)]">
              {conclusion.titleLead} {conclusion.titleAccent}.
            </h2>
            <p className="mx-auto mt-7 max-w-[52ch] text-[1.08rem] text-muted">{conclusion.lead}</p>
            <div className="mx-auto mt-10 flex max-w-[640px] flex-wrap justify-center gap-x-12 gap-y-6 text-left">
              {conclusion.duo.map((d) => (
                <div key={d.term} className="max-w-[260px]">
                  <b className="font-medium">{d.term}</b>
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
      <footer className="border-t border-obsidian/15 px-6 py-14">
        <div className="mx-auto grid max-w-[1200px] gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#inicio" className="text-navy">
              <PadantalLogo />
            </a>
            <p className="mt-4 max-w-[320px] text-[0.92rem] text-muted">
              Socio estratégico global del sector pesquero. Know-how técnico y know-who internacional para liderar, activar y transformar proyectos complejos.
            </p>
          </div>
          <div>
            <div className="eyebrow">Navegación</div>
            <ul className="mt-4 space-y-2 text-[0.95rem] text-muted">
              <li><a href="#nosotros" className="hover:text-obsidian">Quiénes somos</a></li>
              <li><a href="#servicios" className="hover:text-obsidian">Qué hacemos</a></li>
              <li><a href="#casos" className="hover:text-obsidian">Casos de éxito</a></li>
              <li><a href="#contacto" className="hover:text-obsidian">Contacto</a></li>
            </ul>
          </div>
          <div>
            <div className="eyebrow">{legal.name}</div>
            <ul className="mt-4 space-y-2 text-[0.92rem] text-muted">
              <li><a href={`mailto:${contact.email}`} className="hover:text-obsidian">{contact.email}</a></li>
              <li>{legal.address}</li>
              <li>NIF {legal.nif}</li>
              <li>{legal.registry}</li>
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-[1200px] flex-wrap items-center justify-between gap-3 border-t border-obsidian/10 pt-6 text-[0.84rem] text-faint">
          <span>© {new Date().getFullYear()} {legal.name}. Todos los derechos reservados.</span>
          <span>Know-how · Know-who · Ejecución real</span>
        </div>
      </footer>
    </>
  );
}

/* -------------------- Helpers -------------------- */

function Section({ id, children, divide }: { id: string; children: React.ReactNode; divide?: boolean }) {
  return (
    <section id={id} className={`px-6 py-24 md:py-32 ${divide ? "border-t border-obsidian/10" : ""}`}>
      <div className="mx-auto max-w-[1200px]">{children}</div>
    </section>
  );
}

function SectionHead({ eyebrow, title, intro, center }: { eyebrow?: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`max-w-[760px] ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className={`text-[clamp(2rem,4.6vw,3.6rem)] ${eyebrow ? "mt-5" : ""}`}>{title}</h2>
      {intro && <p className="mt-5 text-[1.1rem] text-muted">{intro}</p>}
    </div>
  );
}

function Photo({ src, alt, ratio }: { src: string; alt: string; ratio: string }) {
  return (
    <div className={`relative ${ratio} overflow-hidden rounded-[30px]`}>
      <Image src={src} alt={alt} fill sizes="(max-width:1024px) 100vw, 50vw" className="object-cover" />
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-[16px] w-[16px]">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dot() {
  return <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-obsidian" />;
}
