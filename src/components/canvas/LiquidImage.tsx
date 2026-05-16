'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { LiquidShaderMaterial } from './LiquidShaderMaterial';
import { gsap } from 'gsap';

extend({ LiquidShaderMaterial });

// TypeScript declaration for JSX to recognize the extended material
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        liquidShaderMaterial: any;
      }
    }
  }
}

function Scene({ src }: { src: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  const texture = useTexture(src);
  const [hovered, setHovered] = useState(false);
  const targetMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const currentMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const { viewport } = useThree();

  // Calculate the aspect ratio scale to ensure 'object-cover' behavior
  const img = texture.image as any;
  const imageAspect = img ? img.width / img.height : 1;
  const viewportAspect = viewport.width / viewport.height;
  
  let scaleX = 1;
  let scaleY = 1;
  
  if (imageAspect > viewportAspect) {
    // Image is wider than viewport
    scaleX = imageAspect / viewportAspect;
  } else {
    // Image is taller than viewport
    scaleY = viewportAspect / imageAspect;
  }

  useEffect(() => {
    if (materialRef.current) {
      // Animate hover state 0 to 1
      gsap.to(materialRef.current.uniforms.uHoverState, {
        value: hovered ? 1 : 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }
  }, [hovered]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
      
      // Interpolate mouse for smooth liquid follow
      currentMouse.current.lerp(targetMouse.current, 0.05);
      materialRef.current.uMouse = currentMouse.current;
    }
  });

  const handlePointerMove = (e: any) => {
    // Map uv coordinates
    targetMouse.current.set(e.uv.x, e.uv.y);
  };

  return (
    <mesh 
      ref={meshRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onPointerMove={handlePointerMove}
      scale={[viewport.width * scaleX, viewport.height * scaleY, 1]}
    >
      <planeGeometry args={[1, 1]} />
      <liquidShaderMaterial 
        ref={materialRef} 
        uTexture={texture} 
        transparent={true}
      />
    </mesh>
  );
}

export default function LiquidImage({ src, className = '' }: { src: string, className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Canvas camera={{ position: [0, 0, 1] }} className="w-full h-full cursor-none">
        <Scene src={src} />
      </Canvas>
    </div>
  );
}
