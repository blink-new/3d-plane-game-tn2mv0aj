
import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const Plane = forwardRef<THREE.Group>((props, ref) => {
  return (
    <group ref={ref} {...props}>
      {/* Main body */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.5, 2, 8]} />
        <meshStandardMaterial 
          color="#4287f5"
          metalness={0.6}
          roughness={0.2}
          emissive="#4287f5"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Wings */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.1, 1]} />
        <meshStandardMaterial 
          color="#2196F3"
          metalness={0.6}
          roughness={0.2}
          emissive="#2196F3"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Tail */}
      <mesh castShadow receiveShadow position={[0, 0.4, -1]}>
        <boxGeometry args={[1, 0.8, 0.1]} />
        <meshStandardMaterial 
          color="#2196F3"
          metalness={0.6}
          roughness={0.2}
          emissive="#2196F3"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Engine glow effects */}
      <pointLight position={[-1, 0, -1]} color="#00ff00" intensity={2} distance={3} />
      <pointLight position={[1, 0, -1]} color="#00ff00" intensity={2} distance={3} />
    </group>
  )
})