export function PadantalLogo({
  className = "",
  withWordmark = true,
}: {
  className?: string;
  withWordmark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 120 122" fill="currentColor" aria-hidden="true" className="h-8 w-auto">
        <path d="M68 4 C54 28 36 58 18 104 C42 96 68 96 90 91 C84 58 78 30 68 4 Z" />
        <path d="M26 110 C48 105 72 104 90 98 L96 104 C76 114 48 116 26 110 Z" />
      </svg>
      {withWordmark && (
        <span className="font-display text-[1.3rem] font-semibold tracking-tight">
          Padantal
        </span>
      )}
    </span>
  );
}
