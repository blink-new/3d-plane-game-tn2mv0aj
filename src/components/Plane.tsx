
import { forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export const Plane = forwardRef<THREE.Group>((props, ref) => {
  return (
    <group ref={ref} scale={[0.8, 0.8, 0.8]}>
      {/* Main body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.3, 0.5, 3, 8]} />
        <meshStandardMaterial color="#2196f3" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Wings */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.2, 1]} />
        <meshStandardMaterial color="#1976d2" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Tail wing */}
      <mesh castShadow position={[0, 0.4, -1.3]}>
        <boxGeometry args={[1.5, 0.15, 0.5]} />
        <meshStandardMaterial color="#1976d2" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Nose cone */}
      <mesh castShadow position={[0, 0, 1.7]}>
        <coneGeometry args={[0.3, 0.5, 8]} />
        <meshStandardMaterial color="#1565c0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cockpit */}
      <mesh castShadow position={[0, 0.3, 0.3]}>
        <sphereGeometry args={[0.3, 8, 8, 0, Math.PI]} />
        <meshStandardMaterial color="#90caf9" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Engine glow effect */}
      <pointLight position={[0, 0, -1.5]} color="#ff7b00" intensity={2} distance={3} />
    </group>
  )
})