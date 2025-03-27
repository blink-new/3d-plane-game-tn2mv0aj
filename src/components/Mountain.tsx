
import { useRef } from 'react'
import * as THREE from 'three'

export function Mountain({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null)

  return (
    <mesh ref={meshRef} position={position} castShadow receiveShadow>
      <coneGeometry args={[8, 15, 4]} />
      <meshStandardMaterial 
        color="#4a6fa5"
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  )
}