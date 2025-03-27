
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Ring({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Group>(null)
  const [collected, setCollected] = useState(false)
  const glowRef = useRef<THREE.PointLight>(null)

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta
      
      // Make the ring float up and down slightly
      ringRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.01
      
      if (glowRef.current) {
        glowRef.current.intensity = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.3
      }
    }
  })

  return (
    <group ref={ringRef} position={position}>
      <mesh>
        <torusGeometry args={[3, 0.2, 16, 32]} />
        <meshStandardMaterial 
          color="#FFD700"
          metalness={0.8}
          roughness={0.2}
          emissive="#FFD700"
          emissiveIntensity={0.5}
        />
      </mesh>
      <pointLight
        ref={glowRef}
        color="#FFD700"
        intensity={1}
        distance={5}
      />
    </group>
  )
}