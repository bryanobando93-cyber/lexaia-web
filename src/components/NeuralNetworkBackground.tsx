import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Node {
  position: THREE.Vector3;
  mesh: THREE.Mesh;
  pulsePhase: number;
  connections: number[];
}

interface NeuralNetworkBackgroundProps {
  className?: string;
}

export const NeuralNetworkBackground: React.FC<NeuralNetworkBackgroundProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const nodesRef = useRef<Node[]>([]);
  const linesRef = useRef<THREE.LineSegments[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer setup
    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile, // Disable antialiasing on mobile for better performance
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    // Limit pixel ratio on mobile devices for better performance
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create central sphere with glassmorphism effect
    const sphereGeometry = new THREE.SphereGeometry(1.5, 64, 64);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00d9ff,
      emissive: 0x00d9ff,
      emissiveIntensity: 0,
      transparent: true,
      opacity: 0.225, // Increased 50% from 0.15
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
    });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);
    sphereRef.current = sphere;

    // Create nodes inside and outside the sphere
    const createNodes = () => {
      const nodes: Node[] = [];
      const nodeGeometry = new THREE.SphereGeometry(0.03, 16, 16);

      // Responsive node count (reduce on mobile for performance)
      const isMobile = window.innerWidth < 768;
      const innerNodeCount = isMobile ? 25 : 50;
      const outerNodeCount = isMobile ? 50 : 100;

      // Inner nodes (inside sphere)
      for (let i = 0; i < innerNodeCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 0.5 + Math.random() * 0.8;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: 0x00d9ff,
          transparent: true,
          opacity: 0.9 // Increased from 0.8
        });

        const nodeMesh = new THREE.Mesh(nodeGeometry, nodeMaterial);
        nodeMesh.position.set(x, y, z);
        scene.add(nodeMesh);

        nodes.push({
          position: new THREE.Vector3(x, y, z),
          mesh: nodeMesh,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: []
        });
      }

      // Outer nodes (scattered constellation)
      for (let i = 0; i < outerNodeCount; i++) {
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 2 + Math.random() * 3;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        const nodeMaterial = new THREE.MeshBasicMaterial({
          color: 0x00d9ff,
          transparent: true,
          opacity: 0.6 // Increased 50% from 0.4
        });

        const smallNodeGeometry = new THREE.SphereGeometry(0.015, 8, 8);
        const nodeMesh = new THREE.Mesh(smallNodeGeometry, nodeMaterial);
        nodeMesh.position.set(x, y, z);
        scene.add(nodeMesh);

        nodes.push({
          position: new THREE.Vector3(x, y, z),
          mesh: nodeMesh,
          pulsePhase: Math.random() * Math.PI * 2,
          connections: []
        });
      }

      return nodes;
    };

    const nodes = createNodes();
    nodesRef.current = nodes;

    // Create connections between nodes
    const createConnections = () => {
      const lines: THREE.LineSegments[] = [];

      nodes.forEach((node, i) => {
        // Connect to nearest 3-5 nodes
        const numConnections = 3 + Math.floor(Math.random() * 3);
        const distances = nodes
          .map((otherNode, j) => ({
            index: j,
            distance: node.position.distanceTo(otherNode.position)
          }))
          .filter(d => d.index !== i)
          .sort((a, b) => a.distance - b.distance)
          .slice(0, numConnections);

        distances.forEach(d => {
          if (!node.connections.includes(d.index)) {
            node.connections.push(d.index);

            const points = [];
            points.push(node.position);
            points.push(nodes[d.index].position);

            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
              color: 0x00d9ff,
              transparent: true,
              opacity: 0.45, // Increased 50% from 0.3
              linewidth: 1
            });

            const line = new THREE.LineSegments(geometry, material);
            scene.add(line);
            lines.push(line);
          }
        });
      });

      return lines;
    };

    const lines = createConnections();
    linesRef.current = lines;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00d9ff, 1, 100);
    pointLight1.position.set(5, 5, 5);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x0099ff, 0.5, 100);
    pointLight2.position.set(-5, -5, -5);
    scene.add(pointLight2);

    // Animation loop
    let animationFrameId: number;
    let flowOffset = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Rotate sphere at visible speed
      if (sphereRef.current) {
        sphereRef.current.rotation.y += 0.005; // 5x faster - now clearly visible
        sphereRef.current.rotation.x += 0.002; // Add X rotation for more dynamism
      }

      // Pulse nodes with increased speed and intensity
      const time = Date.now() * 0.001;
      nodesRef.current.forEach((node) => {
        const scale = 1 + Math.sin(time * 3 + node.pulsePhase) * 0.5; // Faster pulse, larger scale
        node.mesh.scale.set(scale, scale, scale);

        // Update opacity based on pulse - more dramatic
        const material = node.mesh.material as THREE.MeshBasicMaterial;
        material.opacity = 0.45 + Math.sin(time * 3 + node.pulsePhase) * 0.6; // Increased base from 0.3 to 0.45
      });

      // Animate line flow with visible traveling effect
      flowOffset += 0.05; // 5x faster flow
      linesRef.current.forEach((line, i) => {
        const material = line.material as THREE.LineBasicMaterial;
        const pulse = Math.sin(flowOffset + i * 0.3); // More variation between lines
        material.opacity = 0.225 + pulse * 0.4; // Increased base from 0.15 to 0.225
      });

      // Enhanced hover effect - more dramatic
      if (isHoveringRef.current && sphereRef.current) {
        const targetScale = 1.2; // Larger scale increase
        sphereRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        const material = sphereRef.current.material as THREE.MeshPhysicalMaterial;
        material.opacity = Math.min(material.opacity + 0.02, 0.525); // Increased from 0.35 (50% more)
        material.emissiveIntensity = 0.5; // Add glow
      } else if (sphereRef.current) {
        const targetScale = 1.0;
        sphereRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.15);

        const material = sphereRef.current.material as THREE.MeshPhysicalMaterial;
        material.opacity = Math.max(material.opacity - 0.02, 0.225); // Increased from 0.15
        material.emissiveIntensity = 0;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Mouse move handler
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Check if hovering over sphere
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseRef.current.x, mouseRef.current.y), camera);

      if (sphereRef.current) {
        const intersects = raycaster.intersectObject(sphereRef.current);
        isHoveringRef.current = intersects.length > 0;
      }
    };

    // Click handler for particle explosion
    const handleClick = (event: MouseEvent) => {
      if (!containerRef.current || !isHoveringRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      if (sphereRef.current) {
        const intersects = raycaster.intersectObject(sphereRef.current);

        if (intersects.length > 0) {
          // Create particle explosion
          const particleCount = 30;
          const particles = new Float32Array(particleCount * 3);

          for (let i = 0; i < particleCount; i++) {
            const i3 = i * 3;
            particles[i3] = intersects[0].point.x + (Math.random() - 0.5) * 0.5;
            particles[i3 + 1] = intersects[0].point.y + (Math.random() - 0.5) * 0.5;
            particles[i3 + 2] = intersects[0].point.z + (Math.random() - 0.5) * 0.5;
          }

          const particleGeometry = new THREE.BufferGeometry();
          particleGeometry.setAttribute('position', new THREE.BufferAttribute(particles, 3));

          const particleMaterial = new THREE.PointsMaterial({
            color: 0x00d9ff,
            size: 0.05,
            transparent: true,
            opacity: 1
          });

          const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
          scene.add(particleSystem);

          // Animate particles outward and fade
          let particleFrame = 0;
          const animateParticles = () => {
            particleFrame++;

            const positions = particleGeometry.attributes.position.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
              const i3 = i * 3;
              const direction = new THREE.Vector3(
                positions[i3] - intersects[0].point.x,
                positions[i3 + 1] - intersects[0].point.y,
                positions[i3 + 2] - intersects[0].point.z
              ).normalize();

              positions[i3] += direction.x * 0.02;
              positions[i3 + 1] += direction.y * 0.02;
              positions[i3 + 2] += direction.z * 0.02;
            }

            particleGeometry.attributes.position.needsUpdate = true;
            particleMaterial.opacity -= 0.02;

            if (particleFrame < 50 && particleMaterial.opacity > 0) {
              requestAnimationFrame(animateParticles);
            } else {
              scene.remove(particleSystem);
              particleGeometry.dispose();
              particleMaterial.dispose();
            }
          };

          animateParticles();
        }
      }
    };

    containerRef.current.addEventListener('mousemove', handleMouseMove);
    containerRef.current.addEventListener('click', handleClick);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
        containerRef.current.removeEventListener('click', handleClick);

        if (renderer.domElement && containerRef.current.contains(renderer.domElement)) {
          containerRef.current.removeChild(renderer.domElement);
        }
      }

      // Dispose of Three.js resources
      nodesRef.current.forEach(node => {
        node.mesh.geometry.dispose();
        (node.mesh.material as THREE.Material).dispose();
      });

      linesRef.current.forEach(line => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });

      if (sphereRef.current) {
        sphereRef.current.geometry.dispose();
        (sphereRef.current.material as THREE.Material).dispose();
      }

      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* Loading state */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-radial from-slate-900 to-black">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-cyan-400 text-sm font-medium animate-pulse">Inicializando Red Neuronal...</p>
          </div>
        </div>
      )}

      {/* 3D Canvas Container */}
      <div
        ref={containerRef}
        className={`inset-0 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className} z-0`}
        style={{
          background: 'radial-gradient(circle at center, #0a1929 0%, #000814 100%)',
          cursor: isHoveringRef.current ? 'pointer' : 'default',
          pointerEvents: 'auto'
        }}
      />
    </>
  );
};
