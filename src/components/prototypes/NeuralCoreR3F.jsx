import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Torus, Icosahedron, Dodecahedron } from "@react-three/drei";
import * as THREE from "three";

export default function NeuralCoreR3F() {
    const groupRef = useRef();

    // Core Refs
    const nucleusRef = useRef();
    const shellRef = useRef();
    const latticeRef = useRef();

    // Ring Refs
    const ring1Ref = useRef();
    const ring2Ref = useRef();
    const ring3Ref = useRef();

    // Energy Arcs Ref
    const arcsRef = useRef();

    // Shards Ref
    const shardsRef = useRef();

    // 1. REFINED CONTAINMENT RINGS CONFIG (Engineered Gradients/Metals)
    const ringConfig = useMemo(() => [
        { radius: 2.8, tube: 0.12, speed: 0.18, color: "#2d3138" }, // Primary
        { radius: 3.3, tube: 0.08, speed: -0.12, color: "#1f2228" }, // Secondary
        { radius: 3.8, tube: 0.04, speed: 0.09, color: "#16181b" }  // Tertiary
    ], []);

    // 2. ENERGY ARCS (Thin flowing energy lines)
    const arcs = useMemo(() => [
        { radius: 3.0, tube: 0.015, arc: Math.PI * 0.4, rotation: [0.5, 0.2, 0.1], speed: 1.2, color: "#00D1FF" },
        { radius: 3.5, tube: 0.01, arc: Math.PI * 0.3, rotation: [-0.2, 0.8, 0.5], speed: -0.8, color: "#00D1FF" },
        { radius: 4.0, tube: 0.012, arc: Math.PI * 0.2, rotation: [0.9, -0.4, 1.2], speed: 1.5, color: "#ff00ff" } // Subtle Magenta accent
    ], []);

    // 3. 3D ENERGY FRAGMENTS (Varied Cubes)
    const fragmentCount = 28;
    const fragments = useMemo(() => {
        const frags = [];
        for (let i = 0; i < fragmentCount; i++) {
            const r = 1.3 + Math.random() * 1.5;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            const typeProb = Math.random();
            let type = "glass";
            if (typeProb > 0.9) type = "magenta-spark";
            else if (typeProb > 0.6) type = "cyan-glow";
            else if (typeProb > 0.3) type = "metallic";

            frags.push({
                position: new THREE.Vector3(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                ),
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
                scale: 0.03 + Math.random() * 0.06,
                type: type,
                opacity: 0.2 + Math.random() * 0.5,
                speed: 0.2 + Math.random() * 0.6
            });
        }
        return frags;
    }, []);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();

        // 1. Core Structural Definition (Stability focus)
        if (nucleusRef.current) {
            const s = 1 + Math.sin(time * 2) * 0.04;
            nucleusRef.current.scale.setScalar(s);
            nucleusRef.current.rotation.y += 0.01;
        }
        if (shellRef.current) {
            shellRef.current.rotation.y -= 0.004;
            shellRef.current.rotation.x += 0.002;
        }
        if (latticeRef.current) {
            latticeRef.current.rotation.y += 0.008;
            latticeRef.current.rotation.z -= 0.005;
        }

        // 2. Gyroscopic Ring Dynamics (Avoid clashing)
        if (ring1Ref.current) {
            ring1Ref.current.rotation.y += 0.005 * ringConfig[0].speed;
            ring1Ref.current.rotation.z += 0.002 * ringConfig[0].speed;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.x += 0.003 * ringConfig[1].speed;
            ring2Ref.current.rotation.y += 0.004 * ringConfig[1].speed;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.x += 0.001 * ringConfig[2].speed;
            ring3Ref.current.rotation.z += 0.006 * ringConfig[2].speed;
        }

        // 3. Energy Arcs Motion
        if (arcsRef.current) {
            arcsRef.current.children.forEach((child, i) => {
                const arc = arcs[i];
                child.rotation.y += 0.01 * arc.speed;
                child.rotation.x += 0.005 * arc.speed;
            });
        }

        // 4. Shard Drift
        if (shardsRef.current) {
            shardsRef.current.rotation.y += 0.001;
            shardsRef.current.children.forEach((child, i) => {
                const frag = fragments[i];
                child.rotation.x += 0.008 * frag.speed;
                child.rotation.y += 0.01 * frag.speed;
                child.position.y += Math.sin(time * 0.6 + i) * 0.0003;
            });
        }
    });

    return (
        <group ref={groupRef} scale={[1.4, 1.4, 1.4]}>
            <Float speed={0.6} rotationIntensity={0.05} floatIntensity={0.1}>

                {/* 1. LAYERED REACTOR CORE (structural definition) */}
                <group>
                    {/* HUB: Contained high-energy core */}
                    <mesh ref={nucleusRef}>
                        <sphereGeometry args={[0.35, 32, 32]} />
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#00D1FF"
                            emissiveIntensity={25} // Reduced for lattice visibility
                        />
                    </mesh>

                    {/* SHELL: Visible Geometric Core */}
                    <Icosahedron ref={shellRef} args={[0.92, 1]}>
                        <MeshDistortMaterial
                            color="#00D1FF"
                            emissive="#38BDF8"
                            emissiveIntensity={8}
                            distort={0.2}
                            speed={1}
                            roughness={0}
                            metalness={1}
                            transparent
                            opacity={0.6}
                        />
                    </Icosahedron>

                    {/* LATTICE: Precision UI/Engine feel */}
                    <Dodecahedron ref={latticeRef} args={[1.3, 0]}>
                        <meshStandardMaterial
                            color="#ffffff"
                            emissive="#7FE7FF"
                            emissiveIntensity={4} // Boosted to pop through glow
                            wireframe
                            transparent
                            opacity={0.5}
                        />
                    </Dodecahedron>
                </group>

                {/* 2. GYROSCOPIC CONTAINMENT ARCHITECTURE */}
                <group>
                    <group ref={ring1Ref} rotation={[0.4, 0.2, 0]}>
                        <Torus args={[ringConfig[0].radius, ringConfig[0].tube, 32, 100]}>
                            <meshStandardMaterial color={ringConfig[0].color} metalness={1} roughness={0.12} envMapIntensity={3} />
                        </Torus>
                    </group>

                    <group ref={ring2Ref} rotation={[-0.3, 0.8, 0.4]}>
                        <Torus args={[ringConfig[1].radius, ringConfig[1].tube, 32, 100]}>
                            <meshStandardMaterial color={ringConfig[1].color} metalness={1} roughness={0.1} envMapIntensity={2.5} />
                        </Torus>
                    </group>

                    <group ref={ring3Ref} rotation={[0.6, -0.4, 1.2]}>
                        <Torus args={[ringConfig[2].radius, ringConfig[2].tube, 32, 100]}>
                            <meshStandardMaterial color={ringConfig[2].color} metalness={1} roughness={0.15} envMapIntensity={2} />
                        </Torus>
                    </group>
                </group>

                {/* 3. SUBTLE ENERGY ARCS */}
                <group ref={arcsRef}>
                    {arcs.map((arc, i) => (
                        <group key={i} rotation={arc.rotation}>
                            <Torus args={[arc.radius, arc.tube, 32, 100, arc.arc]}>
                                <meshStandardMaterial
                                    color={arc.color}
                                    emissive={arc.color}
                                    emissiveIntensity={10}
                                    transparent
                                    opacity={0.6}
                                />
                            </Torus>
                        </group>
                    ))}
                </group>

                {/* 4. PREMIUM ENERGY FRAGMENTS */}
                <group ref={shardsRef}>
                    {fragments.map((frag, i) => (
                        <mesh key={i} position={frag.position} rotation={frag.rotation} scale={frag.scale}>
                            <boxGeometry args={[1, 1, 1]} />
                            {frag.type === "glass" && (
                                <meshStandardMaterial color="#e0faff" transparent opacity={frag.opacity * 0.4} roughness={0} metalness={0.2} />
                            )}
                            {frag.type === "cyan-glow" && (
                                <meshStandardMaterial color="#00D1FF" emissive="#00D1FF" emissiveIntensity={12} transparent opacity={frag.opacity} />
                            )}
                            {frag.type === "magenta-spark" && (
                                <meshStandardMaterial color="#ff00ff" emissive="#ff00ff" emissiveIntensity={15} transparent opacity={frag.opacity} />
                            )}
                            {frag.type === "metallic" && (
                                <meshStandardMaterial color="#1c1f24" metalness={1} roughness={0.1} />
                            )}
                        </mesh>
                    ))}
                </group>

                {/* DYNAMIC LIGHTING */}
                <pointLight position={[0, 0, 0]} intensity={3} color="#00D1FF" distance={10} />
            </Float>
        </group>
    );
}
