"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

/* ---------------------------------------------------------------------------
   Escena inmersiva: descenso de una RED DE CERCO que se cierra sobre un banco
   de atunes, controlado por el scroll. Geometría procedural (sin modelos).
--------------------------------------------------------------------------- */

const TOP_Y = 6; // boca de la red (cerca de superficie)
const BOTTOM_Y = -52; // fondo de la red / banco
const SURFACE = new THREE.Color("#2f86c4");
const DEEP = new THREE.Color("#06101f");

// Progreso de scroll global (0..1), suavizado.
function useScrollProgress() {
  const p = useRef(0); // objetivo
  const s = useRef(0); // suavizado
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      p.current = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return { target: p, smooth: s };
}

/* --------- Agua: color de fondo + niebla según profundidad --------- */
function Water({ smooth }: { smooth: React.MutableRefObject<number> }) {
  const { scene } = useThree();
  const bg = useMemo(() => new THREE.Color("#0a1c30"), []);
  const fog = useMemo(() => new THREE.FogExp2("#0a1c30", 0.02), []);
  useFrame(() => {
    // Asignar cada frame evita lecturas null antes del primer commit.
    scene.background = bg;
    scene.fog = fog;
    const p = smooth.current;
    bg.copy(SURFACE).lerp(DEEP, Math.pow(p, 0.7));
    fog.color.copy(bg);
    fog.density = 0.018 + p * 0.02;
  });
  return null;
}

/* --------- Rayos de luz volumétricos (estilizados) --------- */
function LightShafts() {
  const group = useRef<THREE.Group>(null);
  const shafts = useMemo(() => {
    const arr: { x: number; z: number; rot: number; w: number; h: number }[] = [];
    for (let i = 0; i < 7; i++) {
      arr.push({
        x: (Math.random() - 0.5) * 30,
        z: -6 - Math.random() * 16,
        rot: (Math.random() - 0.5) * 0.3,
        w: 2 + Math.random() * 3,
        h: 70,
      });
    }
    return arr;
  }, []);
  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.z = Math.sin(clock.elapsedTime * 0.08) * 0.04;
  });
  return (
    <group ref={group}>
      {shafts.map((s, i) => (
        <mesh key={i} position={[s.x, 10, s.z]} rotation={[0, 0, s.rot]}>
          <planeGeometry args={[s.w, s.h]} />
          <meshBasicMaterial
            color="#9fe6ff"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

/* --------- Burbujas ascendentes --------- */
function Bubbles() {
  const ref = useRef<THREE.Points>(null);
  const COUNT = 320;
  const { positions, speed } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const speed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = THREE.MathUtils.lerp(BOTTOM_Y, TOP_Y + 10, Math.random());
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 4;
      speed[i] = 1.5 + Math.random() * 3;
    }
    return { positions, speed };
  }, []);
  useFrame((_, delta) => {
    const geo = ref.current?.geometry;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < COUNT; i++) {
      let y = pos.getY(i) + speed[i] * delta;
      let x = pos.getX(i) + Math.sin(y * 0.4 + i) * delta * 0.3;
      if (y > TOP_Y + 12) {
        y = BOTTOM_Y;
        x = (Math.random() - 0.5) * 40;
      }
      pos.setX(i, x);
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#cfeeff"
        size={0.13}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
      />
    </points>
  );
}

/* --------- Red de cerco (se cierra al final del scroll) --------- */
function radiusAt(h: number, purse: number) {
  // h: 0 (boca, arriba) -> 1 (fondo). Taper natural + pursing del fondo.
  const base = THREE.MathUtils.lerp(8.5, 7, h);
  const close = 1 - purse * THREE.MathUtils.smoothstep(h, 0.45, 1);
  return base * close + 0.4;
}

function PurseSeine({ smooth }: { smooth: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.LineSegments>(null);
  const ROPES = 22;
  const RINGS = 12;
  const HSEG = 10;

  const { geometry, update } = useMemo(() => {
    const segs: number[] = [];
    // índices lógicos; posiciones se rellenan en update()
    const vertical: { rope: number; seg: number }[] = [];
    for (let r = 0; r < ROPES; r++) {
      for (let s = 0; s < HSEG; s++) {
        vertical.push({ rope: r, seg: s });
        vertical.push({ rope: r, seg: s + 1 });
      }
    }
    const horizontal: { ring: number; rope: number }[] = [];
    for (let k = 0; k < RINGS; k++) {
      for (let r = 0; r < ROPES; r++) {
        horizontal.push({ ring: k, rope: r });
        horizontal.push({ ring: k, rope: (r + 1) % ROPES });
      }
    }
    const total = vertical.length + horizontal.length;
    const positions = new Float32Array(total * 3);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const update = (purse: number) => {
      const yAt = (h: number) => THREE.MathUtils.lerp(TOP_Y, BOTTOM_Y, h);
      let o = 0;
      const put = (rope: number, h: number) => {
        const ang = (rope / ROPES) * Math.PI * 2;
        const rad = radiusAt(h, purse);
        positions[o++] = Math.cos(ang) * rad;
        positions[o++] = yAt(h);
        positions[o++] = Math.sin(ang) * rad;
      };
      for (const v of vertical) put(v.rope, v.seg / HSEG);
      for (const hh of horizontal) put(hh.rope, hh.ring / (RINGS - 1));
      (geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      geometry.computeBoundingSphere();
    };
    update(0);
    return { geometry, update };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    const purse = THREE.MathUtils.smoothstep(smooth.current, 0.55, 0.98);
    update(purse);
  });

  return (
    <lineSegments ref={ref} geometry={geometry}>
      <lineBasicMaterial color="#7fd3f0" transparent opacity={0.32} depthWrite={false} />
    </lineSegments>
  );
}

/* --------- Banco de atunes (instanced) --------- */
function fishGeometry() {
  const body = new THREE.SphereGeometry(1, 12, 10);
  body.scale(1, 0.55, 2.1);
  const tail = new THREE.ConeGeometry(0.7, 1.2, 4);
  tail.rotateX(-Math.PI / 2);
  tail.scale(1, 0.5, 1);
  tail.translate(0, 0, -2.5);
  const geo = mergeGeometries([body, tail])!;
  geo.computeVertexNormals();
  return geo;
}

function TunaSchool({ smooth }: { smooth: React.MutableRefObject<number> }) {
  const COUNT = 18;
  const ref = useRef<THREE.InstancedMesh>(null);
  const geo = useMemo(fishGeometry, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const fish = useMemo(
    () =>
      Array.from({ length: COUNT }, (_, i) => ({
        a: (i / COUNT) * Math.PI * 2 + Math.random(),
        r: 3.2 + Math.random() * 2.4,
        y: -46 - Math.random() * 5,
        sp: 0.4 + Math.random() * 0.35,
        s: 0.7 + Math.random() * 0.5,
        bob: Math.random() * Math.PI * 2,
      })),
    [],
  );

  useFrame(({ clock }) => {
    const mesh = ref.current;
    if (!mesh) return;
    const t = clock.elapsedTime;
    const purse = THREE.MathUtils.smoothstep(smooth.current, 0.55, 0.98);
    const shrink = 1 - purse * 0.62; // el banco se aprieta al cerrar la red
    for (let i = 0; i < COUNT; i++) {
      const f = fish[i];
      const ang = f.a + t * f.sp;
      const r = f.r * shrink + 0.5;
      const x = Math.cos(ang) * r;
      const z = Math.sin(ang) * r;
      const y = f.y + Math.sin(t * 0.8 + f.bob) * 0.6 + purse * 3;
      dummy.position.set(x, y, z);
      dummy.rotation.set(0, -ang + Math.PI / 2, Math.sin(t * 2 + f.bob) * 0.2);
      dummy.scale.setScalar(f.s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[geo, undefined, COUNT]}>
      <meshStandardMaterial
        color="#24516e"
        metalness={0.5}
        roughness={0.4}
        emissive="#0a2030"
        emissiveIntensity={0.4}
      />
    </instancedMesh>
  );
}

/* --------- Cámara: desciende siguiendo la red hasta el banco --------- */
function CameraRig({
  target,
  smooth,
}: {
  target: React.MutableRefObject<number>;
  smooth: React.MutableRefObject<number>;
}) {
  const { camera } = useThree();
  useFrame((state, delta) => {
    smooth.current = THREE.MathUtils.damp(smooth.current, target.current, 3, delta);
    const p = smooth.current;
    const t = state.clock.elapsedTime;
    const camY = THREE.MathUtils.lerp(TOP_Y + 4, BOTTOM_Y + 16, p);
    camera.position.set(Math.sin(t * 0.1) * 2.2, camY, THREE.MathUtils.lerp(15, 11, p));
    camera.lookAt(Math.cos(t * 0.08) * 1.2, camY - 8 - p * 4, 0);
  });
  return null;
}

export default function SeineScene() {
  const { target, smooth } = useScrollProgress();
  return (
    <Canvas
      className="!fixed inset-0"
      dpr={[1, 1.75]}
      camera={{ position: [0, 10, 15], fov: 58, near: 0.1, far: 400 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
      }}
    >
      <ambientLight intensity={0.6} color="#bfe6ff" />
      <directionalLight position={[6, 40, 10]} intensity={1.5} color="#dff1ff" />
      <Water smooth={smooth} />
      <LightShafts />
      <Bubbles />
      <PurseSeine smooth={smooth} />
      <TunaSchool smooth={smooth} />
      <CameraRig target={target} smooth={smooth} />
    </Canvas>
  );
}
