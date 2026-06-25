# Padantal — Plan versión 3D "El viaje de Padantal"

Documento de arranque para la versión premium con animaciones 3D.
La web estática actual (`index.html`) se mantiene como respaldo en producción.

## Decisiones tomadas
- **Stack:** Next.js (App Router) + TypeScript, desplegado en Vercel.
- **3D:** `@react-three/fiber` + `@react-three/drei` (Three.js).
- **Scroll:** Lenis (scroll suave) + `ScrollControls`/`useScroll` de drei.
- **Overlays 2D:** Framer Motion. **Estilos:** Tailwind (paleta navy/océano + Lexend actuales).
- **Protagonista:** recorrido scroll-driven de la **cadena de valor** (captura → procesado → exportación), con cámara que viaja por una única escena.

## Skills instaladas para el diseño (se activan en sesión nueva)
- **impeccable** (v3.8.0) — diseño frontend de producción. Flujo: `/impeccable init` (crea PRODUCT.md/DESIGN.md) → subcomandos `craft`, `polish`, `audit`, `shape`.
- **emil-design-eng**, **review-animations** — microinteracciones y calidad de animación.
- Pack taste: **high-end-visual-design**, **redesign-existing-projects**, **brandkit**, **image-to-code**, etc.
- Base ya disponible: **ui-ux-pro-max**, **vercel:nextjs**, **vercel:performance-optimizer**, **vercel:deploy**.

## Mapa del recorrido (scroll)
0. Mar abierto (océano shader + barco) — "Construyendo la pesca del futuro"
1. Captura — red sube llena — Quiénes somos
2. Operación — cubierta — Qué hacemos (4 especialidades)
3. Procesado — planta/valor añadido — 3 pilares
4. Exportación — contenedor → globo de mercados — Casos de éxito + cobertura
5. Cierre — superficie + logo — Contacto/formulario

## Fases
1. Scaffold Next.js + R3F; portar paleta, tipografía, textos y logos del `index.html` actual.
2. Rig de scroll (Lenis + ScrollControls) + overlays por tramo (sin 3D).
3. Escena 3D incremental: océano → barco → red → planta → exportación/globo.
4. Pulido: luces, niebla, bloom, microinteracciones (tilt, contador de stats).
5. Fallback móvil/`prefers-reduced-motion`, rendimiento (Core Web Vitals) y deploy.

## Recursos
- Modelos glTF low-poly (barco, red, contenedor, atún): Poly Pizza, Quaternius, Sketchfab (CC). Comprimir con Draco.
- Imágenes actuales reutilizables en `assets/img/` como texturas/fallback.

## Primer paso al reiniciar
1. `/impeccable init` para capturar la marca Padantal.
2. Fase 1 (scaffold) guiada por impeccable + ui-ux-pro-max.
3. Opcional: prototipo solo del hero (mar 3D + barco) para enseñar al cliente antes del viaje completo.
