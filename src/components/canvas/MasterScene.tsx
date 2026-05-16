'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { usePizzaStore } from '@/hooks/usePizzaStore';
import { TOPPINGS } from '@/lib/constants';
import { cheeseMeltVert, cheeseMeltFrag } from '@/lib/shaders';

// The camera curve
const curve = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 0, 10),     // Act 1 (0.0 - 0.2)
  new THREE.Vector3(0, 2, 0),      // Act 2 (0.2 - 0.45) Space Pizza
  new THREE.Vector3(0, 0, -20),    // Act 3 Dough
  new THREE.Vector3(-5, 0, -40),   // Act 3 Sauce
  new THREE.Vector3(5, 0, -60),    // Act 3 Oven
  new THREE.Vector3(0, 0, -80),    // Act 4 Menu Builder
  new THREE.Vector3(0, 10, -80)    // Act 5 Find us
]);

function Billboard({ position, url, scale = 1 }: { position: [number, number, number], url: string, scale?: number }) {
  const texture = useLoader(THREE.TextureLoader, url);
  return (
    <sprite position={position} scale={[16 * scale, 9 * scale, 1]}>
      <spriteMaterial map={texture} />
    </sprite>
  );
}

function Toppings() {
  const { selectedToppings, toggleTopping } = usePizzaStore();
  const textures = useLoader(THREE.TextureLoader, TOPPINGS.map(t => t.image));
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    const progress = usePizzaStore.getState().scrollProgress;
    
    // Toppings orbit radius shrinks as scroll progresses from 0.2 to 0.45, then snaps.
    const act2Progress = Math.max(0, Math.min(1, (progress - 0.2) / 0.25));
    const radius = 4 - (act2Progress * 3.5); // Shrinks from 4 to 0.5
    
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      
      groupRef.current.children.forEach((child, i) => {
        const tItem = TOPPINGS[i];
        const isSelected = selectedToppings.includes(tItem.id);
        const angle = (i / TOPPINGS.length) * Math.PI * 2;
        
        // If we are in Act 4 (menu builder), we expand them again if not selected
        let finalRadius = radius;
        if (progress > 0.65) {
           finalRadius = isSelected ? 0.5 : 3;
        }

        const targetX = Math.cos(angle) * finalRadius;
        const targetY = Math.sin(angle) * finalRadius;
        const targetZ = isSelected || act2Progress > 0.9 ? 0.2 : Math.sin(angle * 3 + state.clock.elapsedTime) * 0.5;
        
        child.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.1);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {TOPPINGS.map((topping, i) => (
        <sprite 
          key={topping.id} 
          scale={[0.5, 0.5, 0.5]}
          onClick={(e) => {
            e.stopPropagation();
            toggleTopping(topping.id, topping.price);
          }}
          onPointerOver={() => { document.body.style.cursor = 'pointer' }}
          onPointerOut={() => { document.body.style.cursor = 'auto' }}
        >
          <spriteMaterial map={textures[i]} depthTest={false} />
        </sprite>
      ))}
    </group>
  );
}

function MainPizza() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const [albedo, cheeseMelt] = useLoader(THREE.TextureLoader, ['/images/pizza-hero.png', '/images/cheese-drip-texture.png']);
  
  const uniforms = useMemo(() => ({
    uTexture: { value: albedo },
    uCheeseMelt: { value: cheeseMelt },
    uTime: { value: 0 },
    uMeltAmount: { value: 0 },
  }), [albedo, cheeseMelt]);

  useFrame((state) => {
    const progress = usePizzaStore.getState().scrollProgress;
    
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      const melt = Math.max(0, Math.min(1, (progress - 0.5) / 0.15));
      materialRef.current.uniforms.uMeltAmount.value = melt;
    }
    
    if (meshRef.current) {
      // Hide completely in Act 1
      if (progress < 0.15) {
        meshRef.current.visible = false;
      } else {
        meshRef.current.visible = true;
        // Scale up quickly
        const scale = Math.min(1, (progress - 0.15) / 0.05);
        meshRef.current.scale.set(scale, scale, scale);
      }

      const camPos = curve.getPointAt(progress);
      
      // In Acts 2 and 3, float ahead of camera.
      // In Act 4 (Menu), stay fixed relative to camera for clicking.
      let targetPos;
      if (progress > 0.65) {
        // Act 4: Menu Builder
        targetPos = new THREE.Vector3(camPos.x - 2, camPos.y, camPos.z - 4);
      } else {
        // Floating ahead
        targetPos = new THREE.Vector3(camPos.x, camPos.y + Math.sin(state.clock.elapsedTime) * 0.2, camPos.z - 5);
      }
      
      meshRef.current.position.lerp(targetPos, 0.1);
      
      // Keep it facing the camera mostly
      meshRef.current.lookAt(camPos);
    }
  });

  return (
    <group ref={meshRef}>
      <mesh receiveShadow castShadow>
        <planeGeometry args={[5, 5]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={cheeseMeltVert}
          fragmentShader={cheeseMeltFrag}
          uniforms={uniforms}
          transparent={true}
          side={THREE.DoubleSide}
        />
      </mesh>
      <Toppings />
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  useFrame(() => {
    const progress = usePizzaStore.getState().scrollProgress;
    const pos = curve.getPointAt(Math.max(0, Math.min(1, progress)));
    camera.position.lerp(pos, 0.05);
    
    // Look slightly ahead
    const lookAhead = curve.getPointAt(Math.max(0, Math.min(1, progress + 0.05)));
    camera.lookAt(lookAhead);
  });
  return null;
}

export default function MasterScene() {
  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      
      {/* Backgrounds as massive planes placed deep in Z */}
      <Billboard url="/images/space-bg.png" position={[0, 0, -10]} scale={3} />
      <Billboard url="/images/station-dough.png" position={[0, 0, -25]} scale={2} />
      <Billboard url="/images/station-sauce.png" position={[-5, 0, -45]} scale={2} />
      <Billboard url="/images/station-oven.png" position={[5, 0, -65]} scale={2} />
      <Billboard url="/images/kitchen-bg.png" position={[0, 0, -90]} scale={3} />

      <MainPizza />
    </>
  );
}
