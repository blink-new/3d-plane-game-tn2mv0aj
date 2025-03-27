
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Cloud({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null)

  return (
    <group ref={meshRef} position={position}>
      <mesh castShadow>
        <sphereGeometry args={[1.5, 16, 16]} />
        <meshStandardMaterial 
          color="white" 
          opacity={0.6}
          transparent
          roughness={1}
        />
      </mesh>
      <mesh position={[1, -0.2, 0]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color="white" 
          opacity={0.6}
          transparent
          roughness={1}
        />
      </mesh>
      <mesh position={[-1, -0.3, 0]} castShadow>
        <sphereGeometry args={[1.2, 16, 16]} />
        <meshStandardMaterial 
          color="white" 
          opacity={0.6}
          transparent
          roughness={1}
        />
      </mesh>
    </group>
  )
}