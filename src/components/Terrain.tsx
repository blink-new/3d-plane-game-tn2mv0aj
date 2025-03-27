
import { useRef } from 'react'
import * as THREE from 'three'

interface TerrainProps {
  position?: [number, number, number]
  type?: 'canyon' | 'mountains'
}

export function Terrain({ position = [0, 0, 0], type = 'canyon' }: TerrainProps) {
  const terrainRef = useRef<THREE.Group>(null)

  return (
    <group ref={terrainRef} position={position}>
      {/* Ground plane */}
      <mesh 
        receiveShadow 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, 0, 0]}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial 
          color={type === 'canyon' ? '#b35f45' : '#4caf50'} 
          roughness={0.8}
        />
      </mesh>

      {/* Add some random terrain features */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          castShadow
          position={[
            Math.random() * 100 - 50,
            Math.random() * 10,
            Math.random() * 100 - 50
          ]}
        >
          <boxGeometry args={[
            Math.random() * 10 + 5,
            Math.random() * 30 + 10,
            Math.random() * 10 + 5
          ]} />
          <meshStandardMaterial 
            color={type === 'canyon' ? '#d35f35' : '#388e3c'}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  )
}