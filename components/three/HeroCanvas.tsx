// components/three/HeroCanvas.tsx
'use client';

import { useRef, useMemo, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Particle Field ──────────────────────────────────────────── */
function ParticleField({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#00f3ff'),
      new THREE.Color('#8a2be2'),
      new THREE.Color('#00ff88'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 20;
      positions[i3 + 1] = (Math.random() - 0.5) * 20;
      positions[i3 + 2] = (Math.random() - 0.5) * 20;

      const col = palette[Math.floor(Math.random() * palette.length)];
      colors[i3]     = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }
    return { positions, colors };
  }, [count]);

  const handlePointerMove = useCallback((e: MouseEvent) => {
    mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const { gl } = useThree();

  /* attach mouse listener once */
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('mousemove', handlePointerMove);
    return () => canvas.removeEventListener('mousemove', handlePointerMove);
  }, [gl, handlePointerMove]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    meshRef.current.rotation.x = Math.sin(t * 0.05) * 0.3 + mouse.current.y * 0.1;
    meshRef.current.rotation.y = Math.cos(t * 0.04) * 0.3 + mouse.current.x * 0.1;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ─── Floating Icosahedra ─────────────────────────────────────── */
function FloatingMesh({
  position,
  color,
  speed,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime() * speed;
    meshRef.current.position.y = position[1] + Math.sin(t) * 0.4;
    meshRef.current.rotation.x += 0.005;
    meshRef.current.rotation.y += 0.008;
  });

  return (
    <mesh ref={meshRef} position={position}>
      <icosahedronGeometry args={[0.4, 1]} />
      <meshStandardMaterial
        color={color}
        wireframe
        transparent
        opacity={0.4}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

/* ─── Inner Scene ─────────────────────────────────────────────── */
function Scene() {
  const meshes = useMemo(
    () => [
      { position: [-4, 1.5, -3] as [number, number, number], color: '#00f3ff', speed: 0.6 },
      { position: [4, -1, -2]  as [number, number, number], color: '#8a2be2', speed: 0.8 },
      { position: [0, 2, -4]   as [number, number, number], color: '#00ff88', speed: 0.5 },
      { position: [-2.5, -2, -1] as [number, number, number], color: '#00f3ff', speed: 0.9 },
      { position: [3, 2, -5]   as [number, number, number], color: '#8a2be2', speed: 0.7 },
    ],
    []
  );

  return (
    <>
      <color attach="background" args={['#050508']} />
      <ambientLight intensity={0.1} />
      <pointLight position={[5, 5, 5]} color="#00f3ff" intensity={1} distance={20} />
      <pointLight position={[-5, -5, 5]} color="#8a2be2" intensity={0.8} distance={20} />
      <pointLight position={[0, 0, 5]} color="#00ff88" intensity={0.4} distance={15} />

      <ParticleField count={1800} />

      {meshes.map((m, i) => (
        <FloatingMesh key={i} {...m} />
      ))}
    </>
  );
}

/* ─── Hero Canvas (exported) ──────────────────────────────────── */
export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', inset: 0 }}
    >
      <AdaptiveDpr pixelated />
      <AdaptiveEvents />
      <Scene />
    </Canvas>
  );
}
