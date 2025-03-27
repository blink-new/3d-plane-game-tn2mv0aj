
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Plane } from './Plane'
import { Ring } from './Ring'
import * as THREE from 'three'

export function Game() {
  const planeRef = useRef<THREE.Group>(null)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [gameOver, setGameOver] = useState(false)

  useFrame((state, delta) => {
    if (gameOver || !planeRef.current) return

    // Basic flight controls
    const plane = planeRef.current
    const moveSpeed = 0.1
    
    if (keys['ArrowUp']) plane.position.y += moveSpeed
    if (keys['ArrowDown']) plane.position.y -= moveSpeed
    if (keys['ArrowLeft']) {
      plane.rotation.z += 0.02
      plane.position.x -= moveSpeed
    }
    if (keys['ArrowRight']) {
      plane.rotation.z -= 0.02
      plane.position.x += moveSpeed
    }

    // Forward movement
    plane.position.z -= 0.2
    setSpeed(0.2 * 100) // Convert to display units

    // Auto-level the plane
    plane.rotation.z *= 0.95
  })

  const keys: { [key: string]: boolean } = {}
  
  window.addEventListener('keydown', (e) => {
    keys[e.key] = true
  })
  
  window.addEventListener('keyup', (e) => {
    keys[e.key] = false
  })

  return (
    <>
      <Plane ref={planeRef} position={[0, 0, 5]} />
      <Ring position={[0, 0, -10]} />
      <Ring position={[2, 1, -20]} />
      <Ring position={[-2, -1, -30]} />
    </>
  )
}