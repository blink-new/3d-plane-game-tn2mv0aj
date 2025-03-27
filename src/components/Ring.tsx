
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Ring({ position }: { position: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta
    }
  })

  return (
    <mesh ref={ringRef} position={position}>
      <torusGeometry args={[2, 0.2, 16, 32]} />
      <meshStandardMaterial color="#FFD700" />
    </mesh>
  )
}