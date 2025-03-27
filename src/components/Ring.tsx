
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Ring({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.01
      // Add subtle floating motion
      ringRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime) * 0.2
    }
  })

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[3, 0.2, 16, 32]} />
      <meshStandardMaterial
        color="#FFD700"
        metalness={0.7}
        roughness={0.3}
        emissive="#FFD700"
        emissiveIntensity={0.5}
      />
    </mesh>
  )
}