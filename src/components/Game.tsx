
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane } from './Plane'
import { Ring } from './Ring'
import { Cloud } from './Cloud'
import { Mountain } from './Mountain'

export function Game() {
  const planeRef = useRef<THREE.Group>(null)
  const [score, setScore] = useState(0)
  const mousePosition = useRef({ x: 0, y: 0 })
  const ringsRef = useRef<Array<[number, number, number]>>([])
  const cloudsRef = useRef<Array<[number, number, number]>>([])
  const mountainsRef = useRef<Array<[number, number, number]>>([])
  
  const RING_COUNT = 5
  const RING_SPACING = 10
  const CLOUD_COUNT = 15
  const MOUNTAIN_COUNT = 8
  const GAME_SPEED = 20

  // Initialize environment elements
  useEffect(() => {
    // Initialize rings
    ringsRef.current = Array.from({ length: RING_COUNT }, (_, i) => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      -RING_SPACING * i - 10
    ])

    // Initialize clouds at random positions
    cloudsRef.current = Array.from({ length: CLOUD_COUNT }, () => [
      (Math.random() - 0.5) * 40,
      10 + Math.random() * 10,
      -(Math.random() * 100)
    ])

    // Initialize mountains at random positions
    mountainsRef.current = Array.from({ length: MOUNTAIN_COUNT }, () => [
      (Math.random() - 0.5) * 100,
      -10,
      -(Math.random() * 100)
    ])
  }, [])

  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    }
  }

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    if (!planeRef.current) return

    // Update plane position based on mouse
    const targetX = mousePosition.current.x * 10
    const targetY = mousePosition.current.y * 5

    planeRef.current.position.x += (targetX - planeRef.current.position.x) * 0.1
    planeRef.current.position.y += (targetY - planeRef.current.position.y) * 0.1

    // Add a slight tilt based on movement
    planeRef.current.rotation.z = -(targetX - planeRef.current.position.x) * 0.2
    planeRef.current.rotation.x = (targetY - planeRef.current.position.y) * 0.2

    // Move rings towards the player
    ringsRef.current = ringsRef.current.map(ring => {
      let [x, y, z] = ring
      z += GAME_SPEED * delta

      if (z > 5) {
        return [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          z - (RING_SPACING * RING_COUNT)
        ]
      }
      return [x, y, z]
    })

    // Move clouds towards the player
    cloudsRef.current = cloudsRef.current.map(cloud => {
      let [x, y, z] = cloud
      z += GAME_SPEED * 0.5 * delta // Clouds move slower than rings

      if (z > 20) {
        return [
          (Math.random() - 0.5) * 40,
          10 + Math.random() * 10,
          -100
        ]
      }
      return [x, y, z]
    })

    // Move mountains towards the player
    mountainsRef.current = mountainsRef.current.map(mountain => {
      let [x, y, z] = mountain
      z += GAME_SPEED * 0.3 * delta // Mountains move even slower

      if (z > 20) {
        return [
          (Math.random() - 0.5) * 100,
          -10,
          -100
        ]
      }
      return [x, y, z]
    })
  })

  return (
    <>
      <Plane ref={planeRef} />
      
      {/* Render rings */}
      {ringsRef.current.map((position, index) => (
        <Ring key={`ring-${index}`} position={position} />
      ))}
      
      {/* Render clouds */}
      {cloudsRef.current.map((position, index) => (
        <Cloud key={`cloud-${index}`} position={position} />
      ))}

      {/* Render mountains */}
      {mountainsRef.current.map((position, index) => (
        <Mountain key={`mountain-${index}`} position={position} />
      ))}
      
      {/* Ground plane */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -10, 0]}
        receiveShadow
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial 
          color="#234" 
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow 
      />

      {/* Add some fog for depth */}
      <fog attach="fog" args={['#234', 30, 100]} />
    </>
  )
}