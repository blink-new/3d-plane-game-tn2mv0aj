
import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector2, Vector3 } from 'three'
import { Plane } from './Plane'
import { Ring } from './Ring'
import { Terrain } from './Terrain'
import { createNoise2D } from 'simplex-noise'

const noise2D = createNoise2D()

export function Game() {
  const planeRef = useRef<THREE.Group>(null)
  const worldRef = useRef<THREE.Group>(null)
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(1)
  const mousePos = useRef(new Vector2())
  const targetRotation = useRef(new Vector3())
  const { viewport } = useThree()

  // Generate ring positions along a fun path
  const ringPositions = Array.from({ length: 15 }, (_, i) => {
    const t = i * 0.5
    return [
      Math.sin(t) * 20,
      10 + Math.cos(t * 2) * 5,
      -i * 20
    ] as [number, number, number]
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mousePos.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state, delta) => {
    if (!planeRef.current || !worldRef.current) return

    // Update plane rotation based on mouse position
    const targetX = mousePos.current.x * 0.5
    const targetY = mousePos.current.y * 0.5

    planeRef.current.rotation.z = THREE.MathUtils.lerp(
      planeRef.current.rotation.z,
      -targetX * 0.5,
      0.1
    )
    planeRef.current.rotation.x = THREE.MathUtils.lerp(
      planeRef.current.rotation.x,
      -targetY * 0.3,
      0.1
    )

    // Move the world instead of the plane
    worldRef.current.position.z += speed
    worldRef.current.position.x = THREE.MathUtils.lerp(
      worldRef.current.position.x,
      targetX * 10,
      0.01
    )
    worldRef.current.position.y = THREE.MathUtils.lerp(
      worldRef.current.position.y,
      -targetY * 5,
      0.01
    )

    // Increase speed gradually
    setSpeed(prev => Math.min(prev + delta * 0.01, 2))

    // Check ring collisions
    const planePos = new Vector3()
    planeRef.current.getWorldPosition(planePos)
  })

  return (
    <>
      <group ref={worldRef}>
        <Terrain />
        {ringPositions.map((pos, i) => (
          <Ring key={i} position={pos} />
        ))}
      </group>
      <Plane ref={planeRef} />
    </>
  )
}