// ========================================
// 3D COSMIC BACKGROUND
// Using React Three Fiber (Three.js)
// Demonstrates 3D graphics programming skills
// ========================================

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points in a sphere
function generateStarPositions(count: number, radius: number): Float32Array {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
  }
  return positions;
}

interface StarsProps {
  count?: number;
  radius?: number;
  color?: string;
  size?: number;
  speed?: number;
}

function Stars({ 
  count = 5000, 
  radius = 1.5, 
  color = '#ffffff',
  size = 0.002,
  speed = 0.1
}: StarsProps) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => generateStarPositions(count, radius), [count, radius]);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta * speed * 0.05;
      ref.current.rotation.y -= delta * speed * 0.075;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={size}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

// Colored nebula-like particles
function Nebula() {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 1000;
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const r = 1.2 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    
    return positions;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.02;
      ref.current.rotation.y += delta * 0.01;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#bf00ff"
        size={0.008}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export function CosmicBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <color attach="background" args={['#0a0a0f']} />
        <ambientLight intensity={0.5} />
        <Stars count={8000} radius={1.8} color="#ffffff" size={0.0015} speed={0.08} />
        <Stars count={2000} radius={1.5} color="#00f5ff" size={0.002} speed={0.12} />
        <Nebula />
      </Canvas>
    </div>
  );
}

export default CosmicBackground;
