
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function Rings() {
  const ringsRef = useRef<THREE.Group>(null)
  
  // Create an array of ring positions
  const ringPositions = [
    [0, 0, -20],
    [10, 5, -40],
    [-8, -3, -60],
    [15, 2, -80],
    [-12, 4, -100],
  ]

  return (
    <group ref={ringsRef}>
      {ringPositions.map((position, index) => (
        <group key={index} position={position as [number, number, number]}>
          {/* Outer ring */}
          <mesh>
            <torusGeometry args={[3, 0.2, 16, 32]} />
            <meshStandardMaterial 
              color="#ffd700"
              metalness={0.8}
              roughness={0.2}
              emissive="#ffd700"
              emissiveIntensity={0.5}
            />
          </mesh>
          
          {/* Inner glow effect */}
          <mesh>
            <torusGeometry args={[3, 0.4, 16, 32]} />
            <meshBasicMaterial 
              color="#ffd700"
              transparent
              opacity={0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}