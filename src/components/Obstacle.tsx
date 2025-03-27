
import { useRef } from 'react'
import * as THREE from 'three'

export function Obstacle({ position, type }: { position: [number, number, number], type: 'ring' | 'floating' | 'moving' }) {
  const meshRef = useRef<THREE.Group>(null)

  const renderFloatingRocks = () => (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh 
          key={i}
          castShadow 
          position={[
            (Math.random() - 0.5) * 10,
            Math.random() * 5,
            (Math.random() - 0.5) * 10
          ]}
        >
          <dodecahedronGeometry args={[1.5]} />
          <meshStandardMaterial 
            color="#546e7a"
            metalness={0.2}
            roughness={0.8}
          />
        </mesh>
      ))}
    </>
  )

  const renderMovingPlatform = () => (
    <mesh castShadow>
      <boxGeometry args={[4, 0.5, 4]} />
      <meshStandardMaterial 
        color="#f57c00"
        metalness={0.5}
        roughness={0.5}
      />
    </mesh>
  )

  return (
    <group ref={meshRef} position={position}>
      {type === 'floating' && renderFloatingRocks()}
      {type === 'moving' && renderMovingPlatform()}
    </group>
  )
}