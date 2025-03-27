
import { forwardRef } from 'react'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'

export const Plane = forwardRef<THREE.Group, { position: [number, number, number] }>((props, ref) => {
  // Simple plane geometry for now
  return (
    <group ref={ref} {...props}>
      <mesh castShadow>
        <boxGeometry args={[1, 0.2, 2]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
      <mesh position={[0, 0, -1]}>
        <boxGeometry args={[2, 0.1, 0.5]} />
        <meshStandardMaterial color="#4CAF50" />
      </mesh>
    </group>
  )
})