
import { useRef } from 'react'
import * as THREE from 'three'

export function Mountain({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)

  return (
    <group ref={meshRef} position={position}>
      {/* Main peak */}
      <mesh castShadow receiveShadow>
        <coneGeometry args={[4, 8, 4]} />
        <meshStandardMaterial 
          color="#455a64"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Secondary peak */}
      <mesh castShadow receiveShadow position={[-2, -1, 2]}>
        <coneGeometry args={[3, 6, 4]} />
        <meshStandardMaterial 
          color="#37474f"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Snow caps */}
      <mesh position={[0, 3, 0]}>
        <coneGeometry args={[1.5, 2, 4]} />
        <meshStandardMaterial 
          color="#eceff1"
          roughness={0.5}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}