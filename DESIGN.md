# Design

## Theme

Oceánico-futurista, cinematográfico y oscuro por defecto. La interfaz simula descender por
el mar: de la superficie luminosa al azul abisal. Superficie principal oscura (azul marino
profundo) que deja respirar al 3D; el "lujo" está en la precisión, el espacio y la luz, no
en el ruido. Modo oscuro como decisión (un visitante profesional evaluando, en escena
nocturna-oceánica), no por defecto estético.

Estrategia de color: **Committed** — el azul marino profundo domina 50–70% de la superficie;
acentos de luz (cian/aguamarina) y un único acento cálido (sol del horizonte) usados con
moderación. Identidad heredada del sitio actual; se preserva y se profundiza.

## Color Palette

Tokens en hex (heredados) con equivalente OKLCH de referencia. Verificar contraste AA.

- **bg / abismo**: `#0B1729` — fondo base (oklch 0.21 0.04 250)
- **surface / navy-800**: `#0F172A` — paneles, secciones (oklch 0.23 0.05 255)
- **surface-2 / navy-700**: `#152238` — tarjetas/elevación
- **ink**: `#F2F6FB` — texto principal sobre oscuro (contraste ≥ 12:1)
- **muted**: `#9DB2C9` — texto secundario sobre oscuro (≥ 4.5:1; NO bajar de aquí)
- **brand / ocean**: `#0EA5E9` — azul océano, color de marca y CTA
- **brand-deep**: `#0369A1` — variante CTA hover / profundidad
- **accent / aqua**: `#22D3EE` — luz cian para destellos, líneas, foco (uso ≤10%)
- **sun**: `#F5B358` — único acento cálido (horizonte/atardecer), muy puntual
- **line**: `rgba(226,232,240,.12)` sobre oscuro; `#E2E8F0` en zonas claras

Reglas: el acento aqua y el sol son puntuales, nunca rellenos grandes. Texto gris solo en
el rango `muted`+ sobre oscuro. Prohibido degradado morado/azul tipo SaaS.

## Typography

Pareja por contraste (geométrica display + humanista texto), ya en uso:

- **Display / headings**: `Lexend` (700–800). letter-spacing display ≥ -0.03em (no más
  apretado). Clamp máx del H1 ≈ 5rem. `text-wrap: balance` en h1–h3.
- **Body / UI**: `Source Sans 3` (400–600). Longitud de línea 65–75ch. `text-wrap: pretty`
  en prosa larga.
- Jerarquía por peso y tamaño, no por color. Sin segunda geométrica que compita con Lexend.

## Components

- **Botones**: pill; primario relleno ocean, hover brand-deep; fantasma con borde 1px sobre
  oscuro. Foco visible (anillo aqua). Sin "ghost-card" (no borde 1px + sombra ancha juntos).
- **Navbar**: flotante, translúcida con blur sutil (uso intencional, no glassmorphism
  decorativo), logo Padantal (vela) en blanco.
- **Overlays de sección**: texto sobre la escena 3D dentro de una columna legible; nunca
  depender del 3D para leerse. Garantizar 4.5:1 con velo de profundidad cuando haga falta.
- **Tarjetas**: radio 12–16px (no 24px+). Evitar rejillas de tarjetas idénticas repetidas;
  variar ritmo. Sin barras laterales de color como acento.
- **Logos de socios**: presentados en superficie clara contenida, monocromo/contención
  uniforme.

## Motion

- Biblioteca: **Lenis** (scroll suave) + **R3F/drei** (cámara ligada al scroll) +
  **Framer Motion** (overlays 2D). Easing ease-out exponencial (quart/expo); sin bounce.
- El recorrido es la animación principal: la cámara desciende por la escena oceánica a
  medida que se hace scroll, revelando cada eslabón (captura → industria → mercados).
- Materiales premium permitidos: blur, niebla volumétrica, bloom suave en luces/sol,
  mask/clip-path para transiciones entre tramos.
- **prefers-reduced-motion**: sin recorrido animado; escena estática (o póster) + crossfade.
  En móvil, versión ligera/estática por defecto (estrategia de rendimiento equilibrada).

## Layout

- Secciones a pantalla completa ancladas al recorrido; contenido en contenedor máx ~1180px.
- Flex para 1D, Grid para 2D. Rejilla responsiva sin breakpoints:
  `repeat(auto-fit, minmax(280px, 1fr))` donde aplique.
- Escala z-index semántica (base → escena3D → overlay → navbar → modal → toast).
- Espaciado generoso y variado para ritmo; el vacío es parte del lujo.
