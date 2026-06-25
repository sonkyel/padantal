"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";

const Ocean3D = dynamic(() => import("./three/Ocean3D"), { ssr: false });

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function HeroBackground() {
  const [enable3D, setEnable3D] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wideEnough = window.matchMedia("(min-width: 768px)").matches;
    if (!reduce && wideEnough && canUseWebGL()) setEnable3D(true);
  }, []);

  return (
    <div className="absolute inset-0 -z-10">
      {/* Fallback siempre presente (SSR, móvil, reduce-motion, carga 3D) */}
      <Image
        src="/assets/img/hero.jpg"
        alt="Embarcación pesquera industrial en mar abierto al atardecer"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />

      {/* Escena 3D del océano (solo cliente, cuando procede) */}
      {enable3D && (
        <div className="absolute inset-0 motion-safe:animate-[fadein_1.2s_ease-out]">
          <Ocean3D />
        </div>
      )}

      {/* Velos de profundidad para contraste del texto */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,23,41,.4)_0%,rgba(11,23,41,.5)_50%,rgba(11,23,41,.9)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,23,41,.72)_0%,rgba(11,23,41,.35)_45%,transparent_100%)]" />
    </div>
  );
}
