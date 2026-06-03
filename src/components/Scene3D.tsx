import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Glowing rotating abstract wireframe torus + inner sphere - Highly Optimized (Reduced segments by 4x for smooth 60 FPS)
function RotatingMesh() {
  const meshRef = useRef<THREE.Group>(null);
  const torusRef = useRef<THREE.Mesh>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      // Float oscillation
      meshRef.current.position.y = Math.sin(time) * 0.08;
      
      // Follow cursor with high-performance damping
      const targetX = mouse.x * 0.8;
      const targetY = mouse.y * 0.5;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02;
      meshRef.current.position.y += (targetY + Math.sin(time) * 0.08 - meshRef.current.position.y) * 0.02;
    }

    // Rotations for outer and inner layers
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.05;
      torusRef.current.rotation.y = time * 0.08;
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = -time * 0.08;
      sphereRef.current.rotation.y = -time * 0.1;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Torus Knot (Muted Gold) */}
      <mesh ref={torusRef} scale={[1.8, 1.8, 1.8]}>
        <torusKnotGeometry args={[1, 0.25, 60, 10, 2, 3]} />
        <meshBasicMaterial
          color="#C5A880"
          wireframe
          transparent
          opacity={0.06}
        />
      </mesh>

      {/* Inner Sphere Core (Muted Brass) */}
      <mesh ref={sphereRef} scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial
          color="#C5A880"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  const [webglSupported, setWebglSupported] = useState(true);

  // Check WebGL support
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const support = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
      setWebglSupported(support);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  return (
    <div className="absolute inset-0 z-0 w-full h-full min-h-screen overflow-hidden bg-background">
      {/* Editorial Soft Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] rounded-full bg-[#C5A880]/[0.015] blur-[150px] pointer-events-none" />

      {webglSupported ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} color="#C5A880" />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#E07A5F" />
          <RotatingMesh />
        </Canvas>
      ) : (
        // Premium CSS Fallback Background
        <div className="absolute inset-0 w-full h-full bg-[#0B0B0C]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(197,168,128,0.03),transparent_60%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-40" />
        </div>
      )}
    </div>
  );
}

