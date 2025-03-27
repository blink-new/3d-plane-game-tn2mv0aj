
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
  const RING_SPACING = 15
  const CLOUD_COUNT = 8
  const MOUNTAIN_COUNT = 5
  const GAME_SPEED = 25

  // Initialize environment elements
  useEffect(() => {
    // Initialize rings
    ringsRef.current = Array.from({ length: RING_COUNT }, (_, i) => [
      (Math.random() - 0.5) * 20,
      (Math.random() - 0.5) * 10,
      -RING_SPACING * i - 20
    ])

    // Initialize clouds
    cloudsRef.current = Array.from({ length: CLOUD_COUNT }, () => [
      (Math.random() - 0.5) * 30,
      5 + Math.random() * 15,
      -(Math.random() * 80)
    ])

    // Initialize mountains in a more structured way
    mountainsRef.current = Array.from({ length: MOUNTAIN_COUNT }, (_, i) => [
      (Math.random() - 0.5) * 40,
      -5,
      -30 - i * 20
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

    // Move rings
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

    // Move clouds
    cloudsRef.current = cloudsRef.current.map(cloud => {
      let [x, y, z] = cloud
      z += GAME_SPEED * 0.6 * delta

      if (z > 20) {
        return [
          (Math.random() - 0.5) * 30,
          5 + Math.random() * 15,
          -80
        ]
      }
      return [x, y, z]
    })

    // Move mountains
    mountainsRef.current = mountainsRef.current.map(mountain => {
      let [x, y, z] = mountain
      z += GAME_SPEED * 0.8 * delta // Mountains move faster now

      if (z > 20) {
        return [
          (Math.random() - 0.5) * 40,
          -5,
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
      
      {/* Ground */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -10, 0]}
        receiveShadow
      >
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial 
          color="#263238" 
          metalness={0.2}
          roughness={0.8}
        />
      </mesh>

      {/* Enhanced lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
      />
      <hemisphereLight 
        args={["#87ceeb", "#383838", 0.8]} 
      />

      {/* Reduced fog for better visibility */}
      <fog attach="fog" args={['#87ceeb', 50, 150]} />
    </>
  )
}