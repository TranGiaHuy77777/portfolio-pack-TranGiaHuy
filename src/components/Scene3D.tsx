import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Mouse reactive particle system - Highly Optimized (100 particles)
function Particles({ count = 100 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  });

  const { mouse } = useThree();

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smoothly rotate the entire system
    pointsRef.current.rotation.y = time * 0.02;
    pointsRef.current.rotation.x = time * 0.01;

    // Subtle reaction to mouse position with smooth damping
    const targetX = mouse.x * 0.4;
    const targetY = mouse.y * 0.4;
    pointsRef.current.position.x += (targetX - pointsRef.current.position.x) * 0.03;
    pointsRef.current.position.y += (targetY - pointsRef.current.position.y) * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#00D9FF"
        transparent
        opacity={0.7}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  );
}

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
      meshRef.current.position.y = Math.sin(time) * 0.1;
      
      // Follow cursor with high-performance damping
      const targetX = mouse.x * 1.2;
      const targetY = mouse.y * 0.8;
      meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.03;
      meshRef.current.position.y += (targetY + Math.sin(time) * 0.1 - meshRef.current.position.y) * 0.03;
    }

    // Rotations for outer and inner layers
    if (torusRef.current) {
      torusRef.current.rotation.x = time * 0.08;
      torusRef.current.rotation.y = time * 0.12;
    }
    
    if (sphereRef.current) {
      sphereRef.current.rotation.x = -time * 0.15;
      sphereRef.current.rotation.y = -time * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Outer Torus Knot (Violet) - Vertices reduced from 120x16 to 60x10 for high performance */}
      <mesh ref={torusRef} scale={[1.8, 1.8, 1.8]}>
        <torusKnotGeometry args={[1, 0.25, 60, 10, 2, 3]} />
        <meshBasicMaterial
          color="#6D5DF6"
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>

      {/* Inner Sphere Core (Cyan) - Segment reduced from 15x15 to 10x10 */}
      <mesh ref={sphereRef} scale={[0.8, 0.8, 0.8]}>
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial
          color="#00D9FF"
          wireframe
          transparent
          opacity={0.45}
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
      {/* Dynamic Back Ambient Lights */}
      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-primary/8 blur-[120px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-[35vw] h-[35vw] rounded-full bg-accent/4 blur-[120px] pointer-events-none animate-pulse-slow" style={{ animationDelay: '3s' }} />

      {webglSupported ? (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 60 }}
          // GPU Optimization: Disable antialias if screen lags, limit DPR to 1.5 for high-density screens
          dpr={[1, 1.5]}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={2.0} color="#6D5DF6" />
          <pointLight position={[-10, -10, -10]} intensity={1.2} color="#00D9FF" />
          <Particles count={100} />
          <RotatingMesh />
        </Canvas>
      ) : (
        // Premium CSS Fallback Background
        <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-background via-[#0C0C12] to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,93,246,0.1),transparent_50%)] animate-pulse-slow" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f13_1px,transparent_1px),linear-gradient(to_bottom,#0f0f13_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
        </div>
      )}
    </div>
  );
}
