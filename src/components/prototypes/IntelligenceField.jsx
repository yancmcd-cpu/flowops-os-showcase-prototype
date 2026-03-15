import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Torus, Float, Sphere } from "@react-three/drei";
import * as THREE from "three";

export default function IntelligenceField() {
    const nodesRef = useRef();
    const arcsRef = useRef();
    const particlesRef = useRef();
    const haloRef = useRef();

    // 1. NODE SWIRL CONFIG (Sparse orbiting nodes)
    const nodes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 20; i++) {
            const r = 4 + Math.random() * 3;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            temp.push({
                pos: new THREE.Vector3(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                ),
                color: Math.random() > 0.8 ? "#ff00ff" : "#00D1FF",
                scale: 0.02 + Math.random() * 0.04,
                speed: 0.1 + Math.random() * 0.3
            });
        }
        return temp;
    }, []);

    // 2. SIGNAL ARCS (Faint curved system pathways)
    const arcs = useMemo(() => [
        { radius: 5.5, tube: 0.008, arc: Math.PI * 0.5, rotation: [0.5, 0.2, 0], speed: 0.2 },
        { radius: 6.2, tube: 0.006, arc: Math.PI * 0.3, rotation: [-0.4, 0.8, 0.5], speed: -0.15 },
        { radius: 7.0, tube: 0.005, arc: Math.PI * 0.4, rotation: [1.2, -0.3, 1.0], speed: 0.1 }
    ], []);

    // 3. PARTICLE DRIFT (Sparse near-core drift)
    const particles = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 40; i++) {
            temp.push({
                pos: [
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10,
                    (Math.random() - 0.5) * 10
                ],
                speed: 0.05 + Math.random() * 0.1
            });
        }
        return temp;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // Node motion
        if (nodesRef.current) {
            nodesRef.current.rotation.y += 0.001;
            nodesRef.current.children.forEach((child, i) => {
                child.position.y += Math.sin(time * 0.5 + i) * 0.0005;
            });
        }

        // Arc motion
        if (arcsRef.current) {
            arcsRef.current.children.forEach((child, i) => {
                child.rotation.z += 0.001 * (i % 2 === 0 ? 1 : -1);
            });
        }

        // Particle drift
        if (particlesRef.current) {
            particlesRef.current.children.forEach((child, i) => {
                child.position.y += Math.sin(time * 0.2 + i) * 0.0002;
            });
        }

        // Halo pulse
        if (haloRef.current) {
            haloRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.05);
        }
    });

    return (
        <group>
            {/* AMBIENT ENERGY HALO (Visually anchors the Spline) */}
            <mesh ref={haloRef} position={[0, 0, -2]}>
                <sphereGeometry args={[5, 32, 32]} />
                <meshBasicMaterial
                    color="#00D1FF"
                    transparent
                    opacity={0.03}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* NODE SWIRL LAYER */}
            <group ref={nodesRef}>
                {nodes.map((node, i) => (
                    <mesh key={i} position={node.pos} scale={node.scale}>
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshBasicMaterial
                            color={node.color}
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                ))}
            </group>

            {/* SIGNAL ARCS */}
            <group ref={arcsRef}>
                {arcs.map((arc, i) => (
                    <group key={i} rotation={arc.rotation}>
                        <Torus args={[arc.radius, arc.tube, 16, 100, arc.arc]}>
                            <meshBasicMaterial
                                color="#00D1FF"
                                transparent
                                opacity={0.15}
                            />
                        </Torus>
                    </group>
                ))}
            </group>

            {/* PARTICLE DRIFT */}
            <group ref={particlesRef}>
                {particles.map((p, i) => (
                    <mesh key={i} position={p.pos}>
                        <sphereGeometry args={[0.015, 8, 8]} />
                        <meshBasicMaterial
                            color="#fff"
                            transparent
                            opacity={0.1}
                        />
                    </mesh>
                ))}
            </group>

            {/* POINT LIGHTS TO CATCH THE FIELD */}
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#00D1FF" />
        </group>
    );
}
