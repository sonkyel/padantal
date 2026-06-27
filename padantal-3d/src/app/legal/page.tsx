"use client";

import { PadantalLogo } from "@/components/PadantalLogo";
import { useT } from "@/i18n/lang";

export default function LegalPage() {
  const { privacy } = useT();
  return (
    <main className="mx-auto max-w-[760px] px-6 py-28 md:py-36">
      <a href="/" className="text-cream" aria-label="Padantal SL">
        <PadantalLogo />
      </a>
      <h1 className="mt-12 text-[clamp(2rem,5vw,3.4rem)] font-bold leading-[0.95]">{privacy.title}</h1>
      <div className="mt-10 space-y-10">
        {privacy.sections.map((s) => (
          <section key={s.h}>
            <h2 className="label">{s.h}</h2>
            <p className="mt-3 text-[1.02rem] leading-relaxed text-muted">{s.p}</p>
          </section>
        ))}
      </div>
      <a href="/" className="mt-14 inline-flex items-center gap-2 text-[0.95rem] font-medium text-acc hover:text-cream">
        ← {privacy.back}
      </a>
    </main>
  );
}
