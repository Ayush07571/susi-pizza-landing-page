'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { cheeseMeltVert, cheeseMeltFrag } from '@/lib/shaders';
import ToppingOrbit from './ToppingOrbit';

export default function PizzaMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  
  const [albedo, cheeseMelt] = useTexture([
    '/images/pizza-hero.png',
    '/images/cheese-drip-texture.png'
  ]);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: albedo },
      uCheeseMelt: { value: cheeseMelt },
      uTime: { value: 0 },
      uMeltAmount: { value: 0 },
    }),
    [albedo, cheeseMelt]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      // uMeltAmount can be tied to scroll if needed, here just oscillating slightly
      materialRef.current.uniforms.uMeltAmount.value = Math.sin(state.clock.elapsedTime) * 0.5 + 0.5;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} receiveShadow castShadow>
        <cylinderGeometry args={[2, 2, 0.2, 64]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={cheeseMeltVert}
          fragmentShader={cheeseMeltFrag}
          uniforms={uniforms}
        />
      </mesh>
      <ToppingOrbit />
    </group>
  );
}
