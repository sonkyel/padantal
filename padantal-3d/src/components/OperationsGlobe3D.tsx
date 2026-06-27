"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";

// Puntos de alcance (lat, lng)
const ESPANA: [number, number] = [40.4, -3.7];
const MARRUECOS: [number, number] = [31.8, -7.1];
const OMAN: [number, number] = [23.6, 58.5];
const PANAMA: [number, number] = [8.5, -80.0];
const SENEGAL: [number, number] = [14.7, -17.4];
const SEYCHELLES: [number, number] = [-4.6, 55.5];
const ATLANTICO: [number, number] = [20.0, -35.0];
const PACIFICO: [number, number] = [5.0, 150.0];
const JAPON: [number, number] = [35.0, 139.0];
const MEDITERRANEO: [number, number] = [37.0, 12.0];

const PTS = [ESPANA, MARRUECOS, OMAN, PANAMA, SENEGAL, SEYCHELLES, ATLANTICO, PACIFICO, JAPON, MEDITERRANEO];

const MARKERS = PTS.map((location, i) => ({ location, size: i < 3 ? 0.08 : 0.05 }));

const ARCS = [
  { from: ESPANA, to: MARRUECOS },
  { from: MARRUECOS, to: OMAN },
  { from: ESPANA, to: PANAMA },
  { from: ESPANA, to: SENEGAL },
  { from: OMAN, to: SEYCHELLES },
  { from: MARRUECOS, to: ATLANTICO },
  { from: OMAN, to: PACIFICO },
  { from: PACIFICO, to: JAPON },
  { from: ESPANA, to: MEDITERRANEO },
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
      baseColor: [0.28, 0.3, 0.34],
      markerColor: [0.886, 0.447, 0.357],
      glowColor: [0.45, 0.27, 0.22],
      markers: MARKERS,
      arcs: ARCS,
      arcColor: [0.886, 0.447, 0.357],
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
      <div className="absolute inset-0 rounded-full opacity-40 blur-2xl" style={{ background: "radial-gradient(circle, rgba(226,114,91,.28), transparent 65%)" }} />
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
      <circle cx="200" cy="200" r="150" fill="url(#g3)" stroke="rgba(226,114,91,.35)" strokeWidth="1" />
      {[40, 80, 120].map((r) => (
        <ellipse key={r} cx="200" cy="200" rx={r} ry="150" fill="none" stroke="rgba(200,170,160,.16)" strokeWidth="1" />
      ))}
      {[-90, -45, 0, 45, 90].map((o) => (
        <line key={o} x1="52" y1={200 + o} x2="348" y2={200 + o} stroke="rgba(200,170,160,.12)" strokeWidth="1" />
      ))}
      {[
        "M150 150 Q200 90 250 165",
        "M150 150 Q120 230 168 262",
        "M250 165 Q235 235 175 250",
        "M150 150 Q110 200 132 245",
      ].map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#e2725b" strokeWidth="1.4" opacity=".85" />
      ))}
      {[
        { x: 150, y: 150 }, { x: 250, y: 165 }, { x: 175, y: 250 },
        { x: 132, y: 245 }, { x: 168, y: 262 }, { x: 285, y: 205 },
        { x: 240, y: 120 }, { x: 120, y: 195 }, { x: 300, y: 250 }, { x: 200, y: 130 },
      ].map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={i < 3 ? 8 : 5} fill="rgba(226,114,91,.18)" />
          <circle cx={n.x} cy={n.y} r={i < 3 ? 3.4 : 2.2} fill="#e2725b" />
        </g>
      ))}
    </svg>
  );
}
