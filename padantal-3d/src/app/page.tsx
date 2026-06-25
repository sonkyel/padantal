import Image from "next/image";
import { SiteNav } from "@/components/SiteNav";
import { PadantalLogo } from "@/components/PadantalLogo";
import { HeroBackground } from "@/components/HeroBackground";
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
      <SiteNav />
      <main id="inicio">
        {/* ---------------- HERO ----------------
            Fondo: escena 3D del océano (Water + Sky) con fallback estático. */}
        <section className="relative flex min-h-screen items-center overflow-hidden">
          <HeroBackground />

          <div className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-36">
            <div className="max-w-[760px]">
              <Eyebrow>{hero.eyebrow}</Eyebrow>
              <h1 className="mt-5 text-[clamp(2.6rem,6vw,4.8rem)] font-extrabold">
                {hero.titleLead}{" "}
                <span className="text-aqua">{hero.titleAccent}</span>
              </h1>
              <p className="mt-6 max-w-[600px] text-[clamp(1.05rem,2vw,1.28rem)] text-ink/85">
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

              <dl className="mt-16 flex flex-wrap gap-x-10 gap-y-6 border-t border-white/15 pt-8">
                {hero.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-[clamp(1.9rem,3.4vw,2.6rem)] font-bold">
                      {s.value} <span className="text-aqua">{s.unit}</span>
                    </dt>
                    <dd className="text-[0.92rem] text-muted">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* ---------------- QUIÉNES SOMOS ---------------- */}
        <section id="nosotros" className="bg-navy-900 py-24 md:py-28">
          <div className="mx-auto grid max-w-[1180px] items-center gap-16 px-6 lg:grid-cols-[1.05fr_.95fr]">
            <div>
              <Eyebrow>{about.eyebrow}</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.9rem,3.6vw,2.8rem)] font-bold">
                {about.title}
              </h2>
              <div className="mt-6 space-y-4 text-[1.05rem] text-ink/80">
                {about.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3.5">
                {about.know.map((k) => (
                  <div
                    key={k.term}
                    className="min-w-[150px] flex-1 rounded-2xl border border-line bg-navy-800 p-5"
                  >
                    <b className="font-display text-aqua">{k.term}</b>
                    <p className="mt-1 text-[0.9rem] text-muted">{k.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative min-h-[460px] overflow-hidden rounded-3xl shadow-2xl shadow-black/40">
              <Image
                src="/assets/img/harbour.jpg"
                alt="Flota pesquera en puerto"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,23,41,.25)_0%,rgba(11,23,41,.55)_55%,rgba(11,23,41,.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-9">
                <h3 className="text-2xl font-bold">Presencia y ejecución global</h3>
                <p className="mt-2 text-ink/80">
                  De la captura a la exportación: integramos cada eslabón de la cadena
                  pesquera con estándares internacionales.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- QUÉ HACEMOS ---------------- */}
        <section id="servicios" className="bg-abyss py-24 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal>
              <SectionHead eyebrow={services.eyebrow} title={services.title} intro={services.intro} />
            </Reveal>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {services.items.map((s) => (
                <article
                  key={s.title}
                  className="rounded-2xl border border-line bg-navy-800 p-9 transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-ocean/50"
                >
                  <h3 className="text-[1.24rem] font-bold">{s.title}</h3>
                  <p className="mt-2.5 text-muted">{s.desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- 3 PILARES ---------------- */}
        <section id="pilares" className="bg-navy-800 py-24 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal>
              <SectionHead eyebrow={pillars.eyebrow} title={pillars.title} intro={pillars.intro} center />
            </Reveal>
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {pillars.items.map((p, i) => (
                <Reveal
                  key={p.n}
                  delay={i * 0.08}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-sm transition-[transform,background-color] duration-300 hover:-translate-y-1.5 hover:bg-white/[0.07]"
                >
                  <div className="font-display text-4xl font-extrabold text-aqua">{p.n}</div>
                  <h3 className="mt-3.5 text-[1.28rem] font-bold">{p.title}</h3>
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
          </div>
        </section>

        {/* ---------------- SOCIEDADES ---------------- */}
        <section id="socios" className="bg-abyss py-24 md:py-28">
          <div className="mx-auto grid max-w-[1180px] items-stretch gap-8 px-6 lg:grid-cols-[.82fr_1.18fr]">
            <aside className="relative flex min-h-[440px] items-end overflow-hidden rounded-3xl p-10 shadow-2xl shadow-black/40">
              <Image
                src="/assets/img/fleet.jpg"
                alt="Flota comercial de pesca"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,23,41,.55)_0%,rgba(11,23,41,.62)_50%,rgba(11,23,41,.9)_100%)]" />
              <div className="relative">
                <Eyebrow>{societies.eyebrow}</Eyebrow>
                <h2 className="mt-4 text-[clamp(1.7rem,2.4vw,2.2rem)] font-bold">
                  {societies.title}
                </h2>
                <p className="mt-3.5 max-w-[340px] text-ink/80">{societies.intro}</p>
                <PadantalLogo withWordmark={false} className="mt-7 text-ink/90 [&_svg]:h-12" />
              </div>
            </aside>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {societies.logos.map((l) => (
                <figure
                  key={l.alt}
                  className="flex flex-col items-center justify-center gap-3.5 rounded-2xl border border-line bg-white px-5 pb-5 pt-7 shadow-sm transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="relative flex h-16 w-[78%] items-center justify-center">
                    <Image
                      src={l.src}
                      alt={l.alt}
                      width={180}
                      height={64}
                      className="max-h-16 w-auto object-contain"
                    />
                  </span>
                  <figcaption className="text-center font-display text-[0.8rem] font-medium text-slate-500">
                    {l.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[1180px] px-6">
            <p className="mb-5 text-center font-display font-medium text-muted">
              Operamos en pleno cumplimiento regulatorio ante las principales ORP&apos;s
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {societies.orps.map((o) => (
                <div key={o.b} className="rounded-xl border border-line bg-navy-800 p-5 text-center">
                  <b className="block font-display text-[1.15rem] text-ocean">{o.b}</b>
                  <span className="text-[0.86rem] text-muted">{o.s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CASOS DE ÉXITO ---------------- */}
        <section id="casos" className="bg-navy-900 py-24 md:py-28">
          <div className="mx-auto max-w-[1180px] px-6">
            <Reveal>
              <SectionHead eyebrow={cases.eyebrow} title={cases.title} intro={cases.intro} center />
            </Reveal>
            <div className="mt-14 space-y-7">
              {cases.items.map((c) => (
                <Reveal
                  key={c.title}
                  className="overflow-hidden rounded-3xl border border-line bg-navy-800 shadow-lg shadow-black/20"
                ><article>
                  <div className="grid md:grid-cols-[300px_1fr]">
                    <div className="relative flex flex-col justify-between gap-6 overflow-hidden p-9 text-ink">
                      <Image src={c.image} alt={c.title} fill sizes="300px" className="object-cover" />
                      <div className="absolute inset-0 bg-[linear-gradient(160deg,rgba(8,18,33,.78)_0%,rgba(8,18,33,.84)_60%,rgba(8,18,33,.93)_100%)]" />
                      <span className="relative w-max rounded-full border border-aqua/30 bg-aqua/10 px-3.5 py-1.5 font-display text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-aqua">
                        {c.badge}
                      </span>
                      <div className="relative">
                        <h3 className="text-[1.34rem] font-bold">{c.title}</h3>
                        <p className="mt-3 text-[0.9rem] text-ink/70">{c.location}</p>
                      </div>
                    </div>
                    <div className="p-9">
                      <p className="text-[1.02rem] text-ink/80">{c.lead}</p>
                      <ul className="mb-6 mt-5 space-y-3">
                        {c.points.map((pt, i) => (
                          <li key={i} className="flex gap-3 text-[0.98rem] text-ink/80">
                            <Check className="text-ocean" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-5 rounded-2xl border border-ocean/25 bg-ocean/10 px-6 py-4">
                        <span className="font-display text-[2.1rem] font-extrabold leading-none text-aqua">
                          {c.result.big}
                        </span>
                        <p className="text-[0.98rem] font-medium text-ink/90">{c.result.text}</p>
                      </div>
                    </div>
                  </div>
                </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- CONCLUSIÓN / CONTACTO ---------------- */}
        <section
          id="contacto"
          className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_80%_0%,#13314f,#0f172a_55%,#0b1729)] py-28 text-center"
        >
          <div className="mx-auto max-w-[760px] px-6">
            <Eyebrow center>{conclusion.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[clamp(2.1rem,4.6vw,3.4rem)] font-extrabold">
              {conclusion.titleLead}{" "}
              <span className="text-aqua">{conclusion.titleAccent}</span>.
            </h2>
            <p className="mt-6 text-[1.18rem] text-ink/85">{conclusion.lead}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-left">
              {conclusion.duo.map((d) => (
                <div key={d.term} className="max-w-[260px]">
                  <b className="font-display text-aqua">{d.term}</b>
                  <p className="mt-1 text-[0.96rem] text-muted">{d.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-11 flex flex-wrap justify-center gap-3.5">
              <a href={`mailto:${contact.email}`} className="btn-primary">
                Contactar con Padantal
                <Arrow />
              </a>
              <a href="#inicio" className="btn-ghost">
                Volver al inicio
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="bg-navy-900 py-14 text-muted">
        <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-4 border-t border-white/10 px-6 pt-10">
          <a href="#inicio" className="text-ink">
            <PadantalLogo />
          </a>
          <p className="text-[0.86rem]">
            © {new Date().getFullYear()} Padantal SL · Know-how · Know-who · Ejecución real
          </p>
        </div>
      </footer>
    </>
  );
}

/* -------------------- Helpers de UI -------------------- */

function Eyebrow({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-aqua ${
        center ? "justify-center" : ""
      }`}
    >
      <span className="h-0.5 w-6 rounded bg-aqua" />
      {children}
    </span>
  );
}

function SectionHead({
  eyebrow,
  title,
  intro,
  center,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  center?: boolean;
}) {
  return (
    <div className={`max-w-[680px] ${center ? "mx-auto text-center" : ""}`}>
      <Eyebrow center={center}>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-[clamp(2rem,4vw,3rem)] font-bold">{title}</h2>
      {intro && <p className="mt-4 text-[1.12rem] text-muted">{intro}</p>}
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
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      className={`mt-1 h-[18px] w-[18px] shrink-0 ${className}`}
    >
      <path d="M5 12l5 5L20 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
