
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'

const noise2D = createNoise2D()

export function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null)

  // Create a more interesting terrain geometry
  const geometry = new THREE.PlaneGeometry(1000, 1000, 100, 100)
  const vertices = geometry.attributes.position.array
  
  for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i]
    const z = vertices[i + 2]
    const scale = 0.02
    const height = noise2D(x * scale, z * scale) * 20
    vertices[i + 1] = height
  }

  geometry.computeVertexNormals()

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -20, 0]}
      receiveShadow
    >
      <primitive object={geometry} />
      <meshStandardMaterial
        color="#4a8505"
        metalness={0.1}
        roughness={0.8}
        wireframe={false}
      />
    </mesh>
  )
}