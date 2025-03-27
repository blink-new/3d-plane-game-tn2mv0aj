
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane } from './Plane'
import { Ring } from './Ring'

export function Game() {
  const planeRef = useRef<THREE.Group>(null)
  const [score, setScore] = useState(0)
  const mousePosition = useRef({ x: 0, y: 0 })
  const ringsRef = useRef<Array<[number, number, number]>>([])
  const RING_COUNT = 5
  const RING_SPACING = 10
  const GAME_SPEED = 20

  // Initialize rings
  useEffect(() => {
    ringsRef.current = Array.from({ length: RING_COUNT }, (_, i) => [
      (Math.random() - 0.5) * 20, // Random x position between -10 and 10
      (Math.random() - 0.5) * 10,  // Random y position between -5 and 5
      -RING_SPACING * i - 10       // Evenly spaced z positions
    ])
  }, [])

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    }
  }

  // Add mouse move listener
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

      // If ring passes the player, reset it to the back
      if (z > 5) {
        return [
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.5) * 10,
          z - (RING_SPACING * RING_COUNT)
        ]
      }
      return [x, y, z]
    })
  })

  return (
    <>
      <Plane ref={planeRef} />
      {ringsRef.current.map((position, index) => (
        <Ring key={index} position={position} />
      ))}
      
      {/* Add ground plane that moves towards player */}
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

      {/* Add some ambient and directional light */}
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 10]} 
        intensity={1} 
        castShadow 
      />
    </>
  )
}