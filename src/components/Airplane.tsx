
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
  
  // Flight parameters
  const FORWARD_SPEED = 15
  const TURN_SPEED = 0.2
  const TILT_SPEED = 0.15
  const HEIGHT_SPEED = 0.1
  const MAX_TILT = 0.8

  useFrame((state, delta) => {
    if (!airplaneRef.current) return
    
    // Forward movement
    airplaneRef.current.position.z -= FORWARD_SPEED * delta

    // Horizontal movement (left/right)
    const targetX = mouse.x * 15
    airplaneRef.current.position.x += (targetX - airplaneRef.current.position.x) * TURN_SPEED
    
    // Vertical movement (up/down)
    const targetY = mouse.y * -10 + 5 // +5 to keep plane above ground
    airplaneRef.current.position.y += (targetY - airplaneRef.current.position.y) * HEIGHT_SPEED

    // Banking (roll) based on turning
    const targetRotationZ = -mouse.x * MAX_TILT
    airplaneRef.current.rotation.z += (targetRotationZ - airplaneRef.current.rotation.z) * TILT_SPEED
    
    // Pitch based on climbing/diving
    const targetRotationX = mouse.y * (MAX_TILT * 0.5)
    airplaneRef.current.rotation.x += (targetRotationX - airplaneRef.current.rotation.x) * TILT_SPEED

    // Keep slight forward tilt for style
    airplaneRef.current.rotation.x -= 0.2

    // Update camera to follow plane
    state.camera.position.z = airplaneRef.current.position.z + 15
    state.camera.position.y = airplaneRef.current.position.y + 5
    state.camera.lookAt(airplaneRef.current.position)
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