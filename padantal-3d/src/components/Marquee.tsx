"use client";

/** Marquee infinito (se duplica el contenido para bucle continuo). */
export function Marquee({
  items,
  duration = 28,
  className = "",
}: {
  items: React.ReactNode[];
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="marquee" style={{ ["--marquee-dur" as string]: `${duration}s` }}>
        {[0, 1].map((dup) => (
          <ul key={dup} className="flex shrink-0 items-center" aria-hidden={dup === 1}>
            {items.map((it, i) => (
              <li key={i} className="flex shrink-0 items-center">
                {it}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
