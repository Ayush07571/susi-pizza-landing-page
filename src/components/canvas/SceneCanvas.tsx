'use client';

import { Canvas } from '@react-three/fiber';
import { Preload } from '@react-three/drei';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const MasterScene = dynamic(() => import('./MasterScene'), { ssr: false });

export default function SceneCanvas() {
  const { isMobile } = useDeviceDetect();

  if (isMobile) return null; // No WebGL on mobile as per instructions

  return (
    <div className="fixed inset-0 z-0 pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <MasterScene />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
