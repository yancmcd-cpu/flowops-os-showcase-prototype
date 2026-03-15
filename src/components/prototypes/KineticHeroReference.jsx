import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sphere, Line, Ring, Circle, Points, PointMaterial, Text } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

// --- 3D COMPONENTS ---

const CinematicCamera = () => {
    useFrame((state) => {
        // Subtle parallax drift to make the scene feel kinetic
        const targetX = state.pointer.x * 0.5;
        const targetY = state.pointer.y * 0.5;
        state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, targetX, 0.02);
        state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, targetY, 0.02);
        state.camera.lookAt(0, 0, 0);
    });
    return null;
};

// 1. The Internal Purple Plasma Energy
const InnerPlasmaEnergy = () => {
    const plasmaRef = useRef();

    useFrame((state, delta) => {
        if (plasmaRef.current) {
            plasmaRef.current.children.forEach((child, i) => {
                child.rotation.x += delta * 0.15 * (i % 2 === 0 ? 1 : -1);
                child.rotation.y += delta * 0.2;
                child.rotation.z += delta * 0.05;
            });
        }
    });

    return (
        <group ref={plasmaRef}>
            {[...Array(6)].map((_, i) => (
                <mesh
                    key={i}
                    rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
                    // Scaled down to fit perfectly inside the 1.8 radius globe
                    scale={[1, 1.2 + Math.random() * 0.6, 1]}
                >
                    <sphereGeometry args={[0.9, 24, 24]} />
                    <meshBasicMaterial
                        color={i % 2 === 0 ? "#8a2be2" : "#b53cff"} // Bright purple and violet
                        wireframe
                        transparent
                        opacity={0.15}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                    />
                </mesh>
            ))}
        </group>
    );
};

// 2. The Dotted Globe & Geodesic Cage (Now combined with Plasma)
const KineticGlobe = () => {
    const globeRef = useRef();

    // Create a dense dotted sphere
    const dotGeometry = useMemo(() => new THREE.IcosahedronGeometry(1.8, 16), []);
    // Create the outer structural wireframe
    const cageGeometry = useMemo(() => new THREE.IcosahedronGeometry(2.0, 2), []);

    useFrame((state, delta) => {
        if (globeRef.current) {
            globeRef.current.rotation.y += delta * 0.05;
            globeRef.current.rotation.x += delta * 0.02;
        }
    });

    return (
        <group ref={globeRef}>
            {/* Semi-transparent dark core. 
        Opacity is lowered so we can see the purple plasma energy rotating inside! 
      */}
            <Sphere args={[1.75, 32, 32]}>
                <meshBasicMaterial color="#02030a" transparent opacity={0.3} depthWrite={false} />
            </Sphere>

            {/* The Purple Plasma Geometry (Inserted exactly in the center) */}
            <InnerPlasmaEnergy />

            {/* The Dotted Surface */}
            <Points geometry={dotGeometry}>
                <PointMaterial color="#4a7aff" size={0.02} transparent opacity={0.6} sizeAttenuation />
            </Points>

            {/* The Faint Geodesic Cage */}
            <mesh geometry={cageGeometry}>
                <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
            </mesh>
        </group>
    );
};

// 3. The Floating UI Nodes
const UINode = ({ position, icon }) => {
    const nodeRef = useRef();
    const [hovered, setHover] = useState(false);

    useFrame((state) => {
        // Billboard effect: nodes always face the screen perfectly
        if (nodeRef.current) {
            nodeRef.current.quaternion.copy(state.camera.quaternion);
        }
    });

    return (
        <Float speed={2} floatIntensity={0.2}>
            <group position={position} ref={nodeRef}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                <Circle args={[0.25, 32]}>
                    <meshBasicMaterial color="#050714" transparent opacity={0.9} />
                </Circle>

                <Ring args={[0.25, 0.28, 32]}>
                    <meshBasicMaterial color={hovered ? "#b53cff" : "#00e5ff"} transparent opacity={0.9} blending={THREE.AdditiveBlending} />
                </Ring>

                <Text position={[0, 0, 0.01]} fontSize={0.2} color={hovered ? "#fff" : "#00e5ff"} anchorX="center" anchorY="middle">
                    {icon}
                </Text>
            </group>
        </Float>
    );
};

// 4. The Constellation Web connecting the nodes
const ConstellationWeb = ({ nodes }) => {
    return (
        <group>
            <Line points={[nodes[0], nodes[1]]} color="#00e5ff" transparent opacity={0.4} lineWidth={1} />
            <Line points={[nodes[1], nodes[2]]} color="#00e5ff" transparent opacity={0.4} lineWidth={1} />
            <Line points={[nodes[2], nodes[3]]} color="#00e5ff" transparent opacity={0.4} lineWidth={1} />
            <Line points={[nodes[3], nodes[4]]} color="#00e5ff" transparent opacity={0.4} lineWidth={1} />
            <Line points={[nodes[4], nodes[0]]} color="#00e5ff" transparent opacity={0.4} lineWidth={1} />

            {/* Inner cross connections */}
            <Line points={[nodes[0], nodes[2]]} color="#4a7aff" transparent opacity={0.2} lineWidth={1} />
            <Line points={[nodes[1], nodes[3]]} color="#4a7aff" transparent opacity={0.2} lineWidth={1} />
            <Line points={[nodes[4], [0, 0, 2]]} color="#4a7aff" transparent opacity={0.2} lineWidth={1} />
        </group>
    );
};

// --- MAIN LAYOUT ---

export default function KineticHero() {
    const nodePositions = [
        new THREE.Vector3(-1.2, 1.4, 1.2),  // Top Left (Coins/Chart)
        new THREE.Vector3(1.2, 1.2, 1.4),   // Top Right (Clock)
        new THREE.Vector3(1.6, -0.4, 1.2),  // Middle Right (People)
        new THREE.Vector3(0.5, -1.6, 1.2),  // Bottom Right (Handshake)
        new THREE.Vector3(-1.6, -0.6, 1.2), // Bottom Left (Bars)
    ];

    return (
        <div style={{ position: "relative", width: "100vw", height: "100vh", backgroundColor: "#02030a", overflow: "hidden" }}>

            {/* 3D WEBGL LAYER */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
                    <CinematicCamera />

                    {/* Centered everything at [0,0,0] for a clean, full-screen hero animation 
          */}
                    <group position={[0, 0, 0]}>
                        <KineticGlobe />
                        <ConstellationWeb nodes={nodePositions} />

                        <UINode position={nodePositions[0]} icon="💰" />
                        <UINode position={nodePositions[1]} icon="⏱" />
                        <UINode position={nodePositions[2]} icon="👥" />
                        <UINode position={nodePositions[3]} icon="🤝" />
                        <UINode position={nodePositions[4]} icon="📊" />
                    </group>

                    <EffectComposer disableNormalPass>
                        <Bloom luminanceThreshold={0.1} mipmapBlur intensity={2.0} />
                    </EffectComposer>
                </Canvas>
            </div>

        </div>
    );
}