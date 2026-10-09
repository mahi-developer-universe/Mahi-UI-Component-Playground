'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export interface ThreeLabProps {
  onClose?: () => void;
}

export const ThreeLab: React.FC<ThreeLabProps> = ({ onClose }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [geometryType, setGeometryType] = useState<'torus' | 'cube' | 'sphere' | 'cone'>('torus');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(0.015);
  const [currentColor, setCurrentColor] = useState<number>(0x6366f1);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const width = canvas.parentElement?.clientWidth || 700;
    const height = canvas.parentElement?.clientHeight || 380;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;

    try {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 4;

      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      sceneRef.current = scene;
      rendererRef.current = renderer;
    } catch (err) {
      console.warn('WebGL init failed:', err);
      setHasWebGL(false);
      return;
    }

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0xec4899, 1.5, 50);
    pointLight.position.set(-5, -5, 2);
    scene.add(pointLight);

    // Initial Mesh
    createMesh(geometryType, currentColor, wireframe);

    // Animation Loop
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      if (meshRef.current) {
        meshRef.current.rotation.x += speed;
        meshRef.current.rotation.y += speed * 1.3;
      }
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!canvas.parentElement || !rendererRef.current) return;
      const newW = canvas.parentElement.clientWidth;
      const newH = canvas.parentElement.clientHeight || 380;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (rendererRef.current) rendererRef.current.dispose();
    };
  }, []);

  const createMesh = (type: string, col: number, isWire: boolean) => {
    const scene = sceneRef.current;
    if (!scene) return;

    if (meshRef.current) {
      scene.remove(meshRef.current);
    }

    let geom: THREE.BufferGeometry;
    if (type === 'torus') geom = new THREE.TorusKnotGeometry(1, 0.35, 100, 16);
    else if (type === 'cube') geom = new THREE.BoxGeometry(1.6, 1.6, 1.6);
    else if (type === 'sphere') geom = new THREE.SphereGeometry(1.2, 32, 32);
    else if (type === 'cone') geom = new THREE.ConeGeometry(1.2, 2.2, 32);
    else geom = new THREE.TorusKnotGeometry(1, 0.35, 100, 16);

    const mat = new THREE.MeshStandardMaterial({
      color: col,
      metalness: 0.65,
      roughness: 0.2,
      wireframe: isWire
    });

    const mesh = new THREE.Mesh(geom, mat);
    meshRef.current = mesh;
    scene.add(mesh);
  };

  const handleGeometrySwitch = (type: 'torus' | 'cube' | 'sphere' | 'cone') => {
    setGeometryType(type);
    createMesh(type, currentColor, wireframe);
  };

  const handleWireframeToggle = () => {
    const next = !wireframe;
    setWireframe(next);
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).wireframe = next;
    }
  };

  const handleRandomColor = () => {
    const colors = [0x6366f1, 0x10b981, 0xec4899, 0x38bdf8, 0xf59e0b, 0xa855f7];
    const picked = colors[Math.floor(Math.random() * colors.length)];
    setCurrentColor(picked);
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).color.setHex(picked);
    }
  };

  const handleCopyR3F = () => {
    const code = `// React Three Fiber (R3F) & Drei Component
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';

function MeshGeometry() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.8;
    meshRef.current.rotation.y += delta * 1.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={meshRef}>
        <${geometryType === 'cube' ? 'boxGeometry args={[1.6, 1.6, 1.6]}' : geometryType === 'sphere' ? 'sphereGeometry args={[1.2, 32, 32]}' : geometryType === 'cone' ? 'coneGeometry args={[1.2, 2.2, 32]}' : 'torusKnotGeometry args={[1, 0.35, 100, 16]}'} />
        <meshStandardMaterial color="#6366f1" metalness={0.7} roughness={0.2} wireframe={${wireframe}} />
      </mesh>
    </Float>
  );
}

export default function SpatialScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <MeshGeometry />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}`;
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  return (
    <div className="modal-backdrop open">
      <div className="modal-dialog modal-dialog-lg" style={{ maxWidth: '860px', width: '95%' }}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div className="modal-icon-badge" style={{ background: 'rgba(236, 72, 153, 0.15)', color: '#ec4899' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h3 className="modal-title">Three.js 3D Spatial Geometry Lab</h3>
              <p className="modal-subtitle">Interactive WebGL viewport with geometry swapping, wireframe toggles, and lighting controls.</p>
            </div>
          </div>
          {onClose && (
            <button className="modal-close-btn" onClick={onClose} aria-label="Close 3D Lab">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>

        <div className="modal-body" style={{ padding: '1.25rem 1.75rem' }}>
          <div className="three-viewport-wrap" style={{ position: 'relative', width: '100%', height: '380px', background: '#07090f', borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }}></canvas>
            {!hasWebGL && (
              <div style={{ position: 'absolute', textAlign: 'center', color: 'var(--text-muted)', padding: '1rem' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>WebGL 3D Fallback Mode</p>
                <p style={{ fontSize: '0.85rem' }}>Hardware accelerated WebGL not supported or initializing.</p>
              </div>
            )}
            <div style={{ position: 'absolute', bottom: '12px', left: '16px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 'var(--radius-full)', fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: '#38bdf8', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span className="pulse-dot" style={{ display: 'inline-block', width: '6px', height: '6px', background: '#10b981', borderRadius: '50%', marginRight: '5px' }}></span>
              Three.js r186 • 60 FPS Client WebGL
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginTop: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Mesh Geometry</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {(['torus', 'cube', 'sphere', 'cone'] as const).map(type => (
                  <button
                    key={type}
                    className={`action-btn ${geometryType === type ? 'active' : ''}`}
                    onClick={() => handleGeometrySwitch(type)}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Material & Render</label>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                <button
                  className={`action-btn ${wireframe ? 'active' : ''}`}
                  onClick={handleWireframeToggle}
                >
                  Wireframe: {wireframe ? 'On' : 'Off'}
                </button>
                <button className="action-btn" onClick={handleRandomColor}>
                  Random Color
                </button>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.35rem', display: 'block' }}>Rotation Speed</label>
              <input
                type="range"
                min="0"
                max="0.08"
                step="0.005"
                value={speed}
                onChange={e => setSpeed(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
              />
            </div>
          </div>
        </div>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>Exports: React Three Fiber (R3F) & Vanilla Three.js</span>
          <div style={{ display: 'flex', gap: '0.6rem' }}>
            {onClose && (
              <button className="btn btn-ghost" onClick={onClose}>Close Lab</button>
            )}
            <button className="btn btn-primary" onClick={handleCopyR3F}>
              <span>{copiedCode ? '✓ Copied R3F Code!' : 'Copy R3F React Code'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
