'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { TOPPINGS } from '@/lib/constants';

export default function ToppingOrbit() {
  const groupRef = useRef<THREE.Group>(null);
  
  const textures = useTexture(TOPPINGS.map((t) => t.image));

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {TOPPINGS.map((topping, index) => {
        const angle = (index / TOPPINGS.length) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 3) * 0.5;

        return (
          <sprite key={topping.id} position={[x, y, z]} scale={[0.5, 0.5, 0.5]}>
            <spriteMaterial map={textures[index]} depthWrite={false} />
          </sprite>
        );
      })}
    </group>
  );
}
