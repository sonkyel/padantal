"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const SeineScene = dynamic(() => import("./three/SeineScene"), { ssr: false });

function canUseWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

export function ImmersiveBackground() {
  const [enable, setEnable] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    if (!reduce && wide && canUseWebGL()) setEnable(true);
  }, []);

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      {/* Fallback: gradiente oceánico (móvil / reduce-motion / sin WebGL) */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#2f86c4_0%,#0f3a5e_38%,#0a1c30_70%,#06101f_100%)]" />
      {enable && (
        <div className="absolute inset-0 motion-safe:animate-[fadein_1.4s_ease-out]">
          <SeineScene />
        </div>
      )}
    </div>
  );
}
