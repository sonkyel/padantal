"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

const OMAN: [number, number] = [23.6, 58.5];
const MARRUECOS: [number, number] = [31.8, -7.1];
const ESPANA: [number, number] = [40.4, -3.7];

const MARKERS: { location: [number, number]; size: number }[] = [
  { location: OMAN, size: 0.07 },
  { location: MARRUECOS, size: 0.07 },
  { location: ESPANA, size: 0.07 },
];

const ARCS = [
  { from: ESPANA, to: MARRUECOS },
  { from: MARRUECOS, to: OMAN },
];

function canUseWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export default function OperationsGlobe3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState<boolean | null>(null);

  // Decide 3D vs fallback en cliente
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(!reduce && canUseWebGL());
  }, []);

  useEffect(() => {
    if (!enabled || !canvasRef.current || !wrapRef.current) return;

    let phi = 0;
    let width = 0;
    let pointerDown = false;
    let pointerX = 0;
    let rot = 0; // rotación manual acumulada
    const onResize = () => {
      width = wrapRef.current ? wrapRef.current.offsetWidth : 0;
    };
    onResize();
    window.addEventListener("resize", onResize);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: dpr,
      width: width * dpr,
      height: width * dpr,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 5.4,
      baseColor: [0.13, 0.22, 0.36],
      markerColor: [0.4, 0.84, 1],
      glowColor: [0.12, 0.32, 0.55],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: [0.4, 0.84, 1],
      arcWidth: 0.5,
      arcHeight: 0.4,
    });

    // Animación: auto-rotación (rAF) + rotación manual (rot)
    let raf = 0;
    const tick = () => {
      if (!pointerDown) phi += 0.0035;
      globe.update({ phi: phi + rot, width: width * dpr, height: width * dpr });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // Arrastre para rotar
    const canvas = canvasRef.current;
    const onDown = (e: PointerEvent) => {
      pointerDown = true;
      pointerX = e.clientX;
      canvas.style.cursor = "grabbing";
    };
    const onUp = () => {
      pointerDown = false;
      canvas.style.cursor = "grab";
    };
    const onMove = (e: PointerEvent) => {
      if (!pointerDown) return;
      const delta = e.clientX - pointerX;
      pointerX = e.clientX;
      rot += delta * 0.005;
    };
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointermove", onMove);

    // fade-in
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 50);

    return () => {
      cancelAnimationFrame(raf);
      globe.destroy();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointermove", onMove);
    };
  }, [enabled]);

  return (
    <div ref={wrapRef} className="relative mx-auto aspect-square w-full max-w-[460px]">
      <div className="cyan-orb inset-0 opacity-40" />
      {enabled === false ? (
        <OperationsGlobeSVG />
      ) : (
        <canvas
          ref={canvasRef}
          className="relative h-full w-full cursor-grab opacity-0 transition-opacity duration-700 [contain:layout_paint_size]"
          style={{ touchAction: "pan-y" }}
        />
      )}
    </div>
  );
}

/* Fallback estático (sin WebGL / reduce-motion) */
function OperationsGlobeSVG() {
  return (
    <svg viewBox="0 0 400 400" className="relative h-full w-full">
      <defs>
        <radialGradient id="g3" cx="50%" cy="45%" r="60%">
          <stop offset="0%" stopColor="#0e2b48" />
          <stop offset="100%" stopColor="#081428" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="150" fill="url(#g3)" stroke="rgba(56,189,248,.35)" strokeWidth="1" />
      {[40, 80, 120].map((r) => (
        <ellipse key={r} cx="200" cy="200" rx={r} ry="150" fill="none" stroke="rgba(120,180,230,.18)" strokeWidth="1" />
      ))}
      {[-60, 0, 60].map((o) => (
        <line key={o} x1="50" y1={200 + o} x2="350" y2={200 + o} stroke="rgba(120,180,230,.14)" strokeWidth="1" />
      ))}
      <path d="M150 150 Q200 80 250 170" fill="none" stroke="#38bdf8" strokeWidth="1.6" opacity=".9" />
      <path d="M250 170 Q230 240 175 250" fill="none" stroke="#67d6ff" strokeWidth="1.6" opacity=".9" />
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
  );
}
