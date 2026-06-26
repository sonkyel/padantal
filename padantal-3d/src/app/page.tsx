import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import { PadantalLogo } from "@/components/PadantalLogo";
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
      <div className="grain" aria-hidden="true" />
      <SmoothScroll />
      <SiteNav />

      <main id="inicio">
        {/* ===================== HERO (Editorial Split) ===================== */}
        <section className="relative px-6 pb-20 pt-32 md:pb-28 md:pt-40">
          <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
            <div>
              <span className="eyebrow">{hero.eyebrow}</span>
              <h1 className="mt-6 text-[clamp(2.8rem,6.4vw,5.6rem)] font-medium leading-[0.98] tracking-[-0.03em]">
                {hero.titleLead}{" "}
                <span className="italic text-ocean">{hero.titleAccent}</span>
              </h1>
              <p className="mt-7 max-w-[520px] text-[1.1rem] leading-relaxed text-muted">
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

            <Reveal className="bezel">
              <div className="bezel-core relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/assets/img/hero.jpg"
                  alt="Embarcación pesquera industrial en mar abierto al atardecer"
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(14,27,41,.55)_100%)]" />
              </div>
            </Reveal>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-[1200px] grid-cols-2 gap-x-8 gap-y-8 border-t border-ink/10 pt-10 md:grid-cols-4">
            {hero.stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-[clamp(2.2rem,3.6vw,3rem)] font-medium leading-none text-ink">
                  {s.value}
                  <span className="ml-1 text-[0.5em] font-normal text-ocean">{s.unit}</span>
                </div>
                <div className="mt-2 text-[0.9rem] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ===================== QUIÉNES SOMOS ===================== */}
        <section id="nosotros" className="px-6 py-24 md:py-36">
          <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-[.92fr_1.08fr]">
            <Reveal className="bezel order-2 lg:order-1">
              <div className="bezel-core relative aspect-[5/4] overflow-hidden">
                <Image src="/assets/img/harbour.jpg" alt="Flota pesquera en puerto" fill sizes="(max-width:1024px) 100vw, 45vw" className="object-cover" />
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
                  <div key={k.term} className="rounded-2xl bg-surface p-5 shadow-[0_20px_44px_-30px_rgba(19,33,47,.4)] ring-1 ring-ink/[0.06]">
                    <b className="font-display text-[1.15rem] font-semibold text-ocean">{k.term}</b>
                    <p className="mt-1 text-[0.92rem] text-muted">{k.desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===================== QUÉ HACEMOS (bento) ===================== */}
        <section id="servicios" className="bg-paper-2 px-6 py-24 md:py-36">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <SectionHead eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
            </Reveal>
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
              {services.items.map((s, i) => (
                <Reveal
                  key={s.title}
                  delay={i * 0.06}
                  className={i < 2 ? "lg:col-span-6" : "lg:col-span-6"}
                >
                  <article className="group h-full rounded-[1.6rem] bg-surface p-8 shadow-[0_30px_60px_-34px_rgba(19,33,47,.35)] ring-1 ring-ink/[0.06] transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-1">
                    <span className="font-display text-[0.95rem] font-semibold text-faint">0{i + 1}</span>
                    <h3 className="mt-3 text-[1.45rem] font-medium">{s.title}</h3>
                    <p className="mt-3 text-[1rem] leading-relaxed text-muted">{s.desc}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== 3 PILARES ===================== */}
        <section id="pilares" className="px-6 py-24 md:py-36">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <SectionHead eyebrow={pillars.eyebrow} title={pillars.title} intro={pillars.intro} center />
            </Reveal>
            <div className="mt-14 grid gap-5 lg:grid-cols-3">
              {pillars.items.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.08}>
                  <div className="bezel h-full">
                    <div className="bezel-core h-full p-8">
                      <div className="font-display text-[2.6rem] font-medium leading-none text-ocean/90">{p.n}</div>
                      <h3 className="mt-4 text-[1.35rem] font-medium">{p.title}</h3>
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
          </div>
        </section>

        {/* ===================== SOCIEDADES ===================== */}
        <section id="socios" className="bg-paper-2 px-6 py-24 md:py-36">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <SectionHead eyebrow={societies.eyebrow} title={societies.title} intro={societies.intro} />
            </Reveal>
            <div className="mt-14 grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
              <Reveal className="bezel">
                <div className="bezel-core relative flex min-h-[340px] items-end overflow-hidden p-8">
                  <Image src="/assets/img/fleet.jpg" alt="Flota comercial de pesca" fill sizes="(max-width:1024px) 100vw, 32vw" className="object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(14,27,41,.9)_100%)]" />
                  <PadantalLogo withWordmark={false} className="relative text-white/95 [&_svg]:h-12" />
                </div>
              </Reveal>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {societies.logos.map((l, i) => (
                  <Reveal key={l.alt} delay={i * 0.05} className="h-full">
                    <figure className="flex h-full flex-col items-center justify-center gap-3 rounded-[1.4rem] bg-surface px-5 pb-4 pt-6 shadow-[0_24px_50px_-34px_rgba(19,33,47,.4)] ring-1 ring-ink/[0.05]">
                      <span className="relative flex h-14 items-center justify-center">
                        <Image src={l.src} alt={l.alt} width={170} height={56} style={{ width: "auto", height: "auto" }} className="max-h-14 max-w-[150px] object-contain" />
                      </span>
                      <figcaption className="text-center text-[0.74rem] font-medium tracking-wide text-faint">{l.caption}</figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {societies.orps.map((o) => (
                <div key={o.b} className="rounded-2xl bg-surface px-5 py-4 text-center ring-1 ring-ink/[0.06]">
                  <b className="block font-display text-[1.1rem] font-semibold text-ocean">{o.b}</b>
                  <span className="text-[0.82rem] text-muted">{o.s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CASOS DE ÉXITO ===================== */}
        <section id="casos" className="px-6 py-24 md:py-36">
          <div className="mx-auto max-w-[1200px]">
            <Reveal>
              <SectionHead eyebrow={cases.eyebrow} title={cases.title} intro={cases.intro} center />
            </Reveal>
            <div className="mt-16 space-y-20 md:space-y-28">
              {cases.items.map((c, i) => (
                <Reveal key={c.title}>
                  <article className={`grid items-center gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
                    <div className="bezel">
                      <div className="bezel-core relative aspect-[4/3] overflow-hidden">
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
                      <div className="mt-7 flex items-center gap-5 rounded-2xl bg-ink px-6 py-5 text-white">
                        <span className="font-display text-[2.4rem] font-medium leading-none text-[#7fd0f0]">{c.result.big}</span>
                        <p className="text-[0.98rem] leading-snug text-white/85">{c.result.text}</p>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== CONCLUSIÓN / CTA (sección oscura) ===================== */}
        <section id="contacto" className="on-dark relative px-6 py-28 md:py-40">
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_75%_0%,#14283a,#0e1b29_60%)]" />
          <Reveal className="relative mx-auto max-w-[860px] text-center">
            <span className="eyebrow">{conclusion.eyebrow}</span>
            <h2 className="mt-6 text-[clamp(2.2rem,5vw,3.8rem)] font-medium text-white">
              {conclusion.titleLead}{" "}
              <span className="italic text-[#7fd0f0]">{conclusion.titleAccent}</span>.
            </h2>
            <p className="mx-auto mt-7 max-w-[640px] text-[1.15rem] leading-relaxed text-white/75">
              {conclusion.lead}
            </p>
            <div className="mx-auto mt-10 flex max-w-[640px] flex-wrap justify-center gap-x-12 gap-y-6 text-left">
              {conclusion.duo.map((d) => (
                <div key={d.term} className="max-w-[260px]">
                  <b className="font-display text-[1.2rem] font-semibold text-[#7fd0f0]">{d.term}</b>
                  <p className="mt-1 text-[0.96rem] text-white/70">{d.desc}</p>
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

      <footer className="bg-paper px-6 py-12">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-8 text-faint">
          <a href="#inicio" className="text-ink">
            <PadantalLogo />
          </a>
          <p className="text-[0.86rem]">© {new Date().getFullYear()} Padantal SL · Know-how · Know-who · Ejecución real</p>
        </div>
      </footer>
    </>
  );
}

/* -------------------- Helpers -------------------- */

function SectionHead({ eyebrow, title, intro, center }: { eyebrow: string; title: string; intro?: string; center?: boolean }) {
  return (
    <div className={`max-w-[720px] ${center ? "mx-auto text-center" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="mt-5 text-[clamp(2rem,4.2vw,3.4rem)] font-medium">{title}</h2>
      {intro && <p className="mt-5 text-[1.12rem] leading-relaxed text-muted">{intro}</p>}
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Check() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="mt-1 h-[17px] w-[17px] shrink-0 text-ocean">
      <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
