
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Plane } from './Plane'
import { Ring } from './Ring'
import { Cloud } from './Cloud'
import { Mountain } from './Mountain'
import { Terrain } from './Terrain'
import { Obstacle } from './Obstacle'

export function Game() {
  const planeRef = useRef<THREE.Group>(null)
  const [score, setScore] = useState(0)
  const mousePosition = useRef({ x: 0, y: 0 })
  const terrainRef = useRef<Array<{ position: [number, number, number], type: 'canyon' | 'forest' | 'city' }>>([])
  const obstaclesRef = useRef<Array<{ position: [number, number, number], type: 'ring' | 'floating' | 'moving' }>>([])
  const cloudsRef = useRef<Array<[number, number, number]>>([])
  
  const TERRAIN_SEGMENTS = 4
  const TERRAIN_SPACING = 30
  const OBSTACLE_COUNT = 8
  const CLOUD_COUNT = 8
  const GAME_SPEED = 30

  // Initialize environment elements
  useEffect(() => {
    // Initialize terrain segments
    terrainRef.current = Array.from({ length: TERRAIN_SEGMENTS }, (_, i) => ({
      position: [0, -5, -TERRAIN_SPACING * i],
      type: ['canyon', 'forest', 'city'][Math.floor(Math.random() * 3)] as 'canyon' | 'forest' | 'city'
    }))

    // Initialize obstacles
    obstaclesRef.current = Array.from({ length: OBSTACLE_COUNT }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        1 + Math.random() * 8,
        -(Math.random() * 100)
      ],
      type: ['ring', 'floating', 'moving'][Math.floor(Math.random() * 3)] as 'ring' | 'floating' | 'moving'
    }))

    // Initialize clouds
    cloudsRef.current = Array.from({ length: CLOUD_COUNT }, () => [
      (Math.random() - 0.5) * 30,
      15 + Math.random() * 15,
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

    // Update plane position with more responsive controls
    const targetX = mousePosition.current.x * 15
    const targetY = mousePosition.current.y * 8

    planeRef.current.position.x += (targetX - planeRef.current.position.x) * 0.1
    planeRef.current.position.y += (targetY - planeRef.current.position.y) * 0.1

    // More dramatic plane tilting
    planeRef.current.rotation.z = -(targetX - planeRef.current.position.x) * 0.3
    planeRef.current.rotation.x = (targetY - planeRef.current.position.y) * 0.3
    planeRef.current.rotation.y = (targetX - planeRef.current.position.x) * 0.1

    // Move terrain
    terrainRef.current = terrainRef.current.map(terrain => {
      let [x, y, z] = terrain.position
      z += GAME_SPEED * delta

      if (z > 30) {
        return {
          position: [0, -5, z - (TERRAIN_SPACING * TERRAIN_SEGMENTS)],
          type: ['canyon', 'forest', 'city'][Math.floor(Math.random() * 3)] as 'canyon' | 'forest' | 'city'
        }
      }
      return { ...terrain, position: [x, y, z] }
    })

    // Move and animate obstacles
    obstaclesRef.current = obstaclesRef.current.map(obstacle => {
      let [x, y, z] = obstacle.position
      z += GAME_SPEED * delta

      // Add some movement to obstacles
      if (obstacle.type === 'moving') {
        x = Math.sin(state.clock.elapsedTime + z) * 10
      } else if (obstacle.type === 'floating') {
        y += Math.sin(state.clock.elapsedTime * 2 + x) * 0.05
      }

      if (z > 30) {
        return {
          position: [
            (Math.random() - 0.5) * 20,
            1 + Math.random() * 8,
            z - 120
          ],
          type: ['ring', 'floating', 'moving'][Math.floor(Math.random() * 3)] as 'ring' | 'floating' | 'moving'
        }
      }
      return { ...obstacle, position: [x, y, z] }
    })

    // Move clouds
    cloudsRef.current = cloudsRef.current.map(cloud => {
      let [x, y, z] = cloud
      z += GAME_SPEED * 0.6 * delta

      if (z > 30) {
        return [
          (Math.random() - 0.5) * 30,
          15 + Math.random() * 15,
          -100
        ]
      }
      return [x, y, z]
    })
  })

  return (
    <>
      <Plane ref={planeRef} />
      
      {/* Render terrain segments */}
      {terrainRef.current.map((terrain, index) => (
        <Terrain 
          key={`terrain-${index}`} 
          position={terrain.position}
          type={terrain.type}
        />
      ))}
      
      {/* Render obstacles */}
      {obstaclesRef.current.map((obstacle, index) => (
        <Obstacle 
          key={`obstacle-${index}`}
          position={obstacle.position}
          type={obstacle.type}
        />
      ))}
      
      {/* Render clouds */}
      {cloudsRef.current.map((position, index) => (
        <Cloud key={`cloud-${index}`} position={position} />
      ))}

      {/* Enhanced lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[10, 20, 10]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[2048, 2048]}
      />
      <hemisphereLight args={["#87ceeb", "#383838", 0.8]} />

      {/* Fog for atmosphere but not too thick */}
      <fog attach="fog" args={['#87ceeb', 60, 140]} />
    </>
  )
}