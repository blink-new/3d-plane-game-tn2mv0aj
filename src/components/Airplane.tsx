
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

interface AirplaneProps {
  position?: [number, number, number]
}

export function Airplane({ position = [0, 0, 0] }: AirplaneProps) {
  const airplaneRef = useRef<THREE.Group>(null)
  const { mouse } = useThree()
  
  useFrame((state, delta) => {
    if (!airplaneRef.current) return
    
    // Smooth airplane movement following mouse
    const targetX = mouse.x * 10
    const targetY = mouse.y * 5
    
    airplaneRef.current.position.x += (targetX - airplaneRef.current.position.x) * 0.1
    airplaneRef.current.position.y += (targetY - airplaneRef.current.position.y) * 0.1
    
    // Tilt the airplane based on movement
    airplaneRef.current.rotation.z = -mouse.x * 0.5
    airplaneRef.current.rotation.x = mouse.y * 0.2
  })

  return (
    <group ref={airplaneRef} position={position}>
      {/* Airplane body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.2, 0.5, 2, 32]} />
        <meshStandardMaterial color="#2196f3" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Wings */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[4, 0.2, 1]} />
        <meshStandardMaterial color="#1976d2" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Tail */}
      <mesh castShadow position={[0, 0.5, -0.8]}>
        <boxGeometry args={[1, 1, 0.1]} />
        <meshStandardMaterial color="#1976d2" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  )
}