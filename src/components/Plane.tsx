
import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const Plane = forwardRef<THREE.Group>((props, ref) => {
  return (
    <group ref={ref} {...props}>
      {/* Main body - brighter colors */}
      <mesh castShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.5, 2, 8]} />
        <meshStandardMaterial 
          color="#64B5F6" 
          metalness={0.4} 
          roughness={0.2} 
          emissive="#64B5F6"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Wings - brighter colors */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.1, 1]} />
        <meshStandardMaterial 
          color="#2196F3" 
          metalness={0.4} 
          roughness={0.2}
          emissive="#2196F3"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Tail - brighter colors */}
      <mesh castShadow position={[0, 0.4, -1]}>
        <boxGeometry args={[1, 0.8, 0.1]} />
        <meshStandardMaterial 
          color="#2196F3" 
          metalness={0.4} 
          roughness={0.2}
          emissive="#2196F3"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Brighter engine trails */}
      <pointLight position={[-1, 0, -1]} color="#00ff00" intensity={3} distance={5} />
      <pointLight position={[1, 0, -1]} color="#00ff00" intensity={3} distance={5} />
    </group>
  )
})