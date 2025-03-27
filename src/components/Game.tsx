
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane } from './Plane'
import { Ring } from './Ring'

export function Game() {
  const planeRef = useRef<THREE.Group>(null)
  const [score, setScore] = useState(0)
  const mousePosition = useRef({ x: 0, y: 0 })

  // Generate some rings in interesting positions
  const rings = [
    [0, 0, -10],
    [5, 2, -20],
    [-5, -2, -30],
    [0, 4, -40],
    [0, -4, -50],
  ] as const

  // Handle mouse movement
  const handleMouseMove = (event: MouseEvent) => {
    mousePosition.current = {
      x: (event.clientX / window.innerWidth) * 2 - 1,
      y: -(event.clientY / window.innerHeight) * 2 + 1
    }
  }

  // Add mouse move listener
  useState(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  })

  useFrame((state, delta) => {
    if (!planeRef.current) return

    // Update plane position based on mouse
    const targetX = mousePosition.current.x * 10
    const targetY = mousePosition.current.y * 5

    planeRef.current.position.x += (targetX - planeRef.current.position.x) * 0.1
    planeRef.current.position.y += (targetY - planeRef.current.position.y) * 0.1

    // Add a slight forward tilt based on vertical movement
    planeRef.current.rotation.z = -(targetX - planeRef.current.position.x) * 0.2
    planeRef.current.rotation.x = (targetY - planeRef.current.position.y) * 0.2

    // Move plane forward
    planeRef.current.position.z -= 5 * delta
  })

  return (
    <>
      <Plane ref={planeRef} />
      {rings.map((position, index) => (
        <Ring key={index} position={position} />
      ))}
    </>
  )
}