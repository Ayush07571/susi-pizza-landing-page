'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function KitchenScene() {
  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(-10, 0, 10),
      new THREE.Vector3(-5, 0, 5),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(5, 0, 5),
      new THREE.Vector3(10, 0, 10),
    ]);
  }, []);

  useFrame((state) => {
    // A simple camera animation around the curve could be driven by scroll progress.
    // For now, let's just gently pan the camera.
    const t = (state.clock.elapsedTime * 0.05) % 1;
    const pos = curve.getPointAt(t);
    state.camera.position.lerp(pos, 0.05);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group>
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#0a0a0a" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}
