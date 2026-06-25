"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { Water } from "three/examples/jsm/objects/Water.js";
import { Sky } from "three/examples/jsm/objects/Sky.js";

/** Plano de agua con olas animadas (recipe clásico de three.js: Water). */
function Ocean() {
  const ref = useRef<Water>(null);
  const waterNormals = useLoader(
    THREE.TextureLoader,
    "/assets/3d/waternormals.jpg",
  );
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping;

  const water = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(12000, 12000);
    const w = new Water(geometry, {
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffe7c2,
      waterColor: 0x0a2540,
      distortionScale: 3.4,
      fog: true,
    });
    w.rotation.x = -Math.PI / 2;
    return w;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [waterNormals]);

  useFrame((_, delta) => {
    const mat = water.material as THREE.ShaderMaterial;
    mat.uniforms.time.value += delta * 0.55;
  });

  return <primitive object={water} />;
}

/** Cielo con sol; expone la dirección del sol al agua y al entorno. */
function SkyDome({ elevation = 1.5, azimuth = 165 }: { elevation?: number; azimuth?: number }) {
  const { scene, gl } = useThree();

  const sky = useMemo(() => {
    const s = new Sky();
    s.scale.setScalar(20000);
    const u = s.material.uniforms;
    u.turbidity.value = 8;
    u.rayleigh.value = 1.6;
    u.mieCoefficient.value = 0.005;
    u.mieDirectionalG.value = 0.8;
    return s;
  }, []);

  useEffect(() => {
    const phi = THREE.MathUtils.degToRad(90 - elevation);
    const theta = THREE.MathUtils.degToRad(azimuth);
    const sun = new THREE.Vector3().setFromSphericalCoords(1, phi, theta);
    sky.material.uniforms.sunPosition.value.copy(sun);

    // Entorno para reflejos suaves
    const pmrem = new THREE.PMREMGenerator(gl);
    const envScene = new THREE.Scene();
    envScene.add(sky);
    const env = pmrem.fromScene(envScene);
    scene.environment = env.texture;
    scene.add(sky);

    return () => {
      scene.remove(sky);
      env.texture.dispose();
      pmrem.dispose();
    };
  }, [sky, elevation, azimuth, gl, scene]);

  return null;
}

/** Deriva ligera de cámara + reacción sutil al scroll. */
function CameraRig() {
  const { camera } = useThree();
  const scroll = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = window.innerHeight || 1;
      scroll.current = Math.min(window.scrollY / max, 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const s = scroll.current;
    // Cámara baja un poco y se acerca al horizonte al hacer scroll
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 9 - s * 4 + Math.sin(t * 0.25) * 0.5, 0.05);
    camera.position.x = Math.sin(t * 0.08) * 3;
    camera.lookAt(0, 1.5 - s * 1.5, -120);
  });

  return null;
}

export default function Ocean3D() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 9, 26], fov: 55, near: 1, far: 25000 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl, scene }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.62;
        scene.fog = new THREE.FogExp2(0x0b1729, 0.00028);
      }}
    >
      <Ocean />
      <SkyDome />
      <CameraRig />
    </Canvas>
  );
}
