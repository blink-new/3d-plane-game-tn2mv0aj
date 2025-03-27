
import { useRef } from 'react'
import * as THREE from 'three'

export function Terrain({ position, type }: { position: [number, number, number], type: 'canyon' | 'forest' | 'city' }) {
  const meshRef = useRef<THREE.Group>(null)

  const renderCanyonWalls = () => (
    <>
      {/* Left wall */}
      <mesh castShadow receiveShadow position={[-15, 10, 0]}>
        <boxGeometry args={[10, 40, 30]} />
        <meshStandardMaterial color="#8d6e63" roughness={0.9} />
      </mesh>
      
      {/* Right wall */}
      <mesh castShadow receiveShadow position={[15, 10, 0]}>
        <boxGeometry args={[10, 40, 30]} />
        <meshStandardMaterial color="#795548" roughness={0.9} />
      </mesh>
      
      {/* Random rock formations */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh 
          key={i} 
          castShadow 
          position={[
            (Math.random() - 0.5) * 20,
            Math.random() * 5,
            (Math.random() - 0.5) * 20
          ]}
        >
          <dodecahedronGeometry args={[2 + Math.random() * 2]} />
          <meshStandardMaterial color="#6d4c41" roughness={1} />
        </mesh>
      ))}
    </>
  )

  const renderForest = () => (
    <>
      {Array.from({ length: 15 }).map((_, i) => (
        <group 
          key={i} 
          position={[
            (Math.random() - 0.5) * 30,
            0,
            (Math.random() - 0.5) * 20
          ]}
        >
          {/* Tree trunk */}
          <mesh castShadow>
            <cylinderGeometry args={[0.5, 0.8, 4]} />
            <meshStandardMaterial color="#5d4037" />
          </mesh>
          
          {/* Tree top */}
          <mesh castShadow position={[0, 3, 0]}>
            <coneGeometry args={[2, 4, 8]} />
            <meshStandardMaterial color="#2e7d32" />
          </mesh>
        </group>
      ))}
    </>
  )

  const renderCity = () => (
    <>
      {Array.from({ length: 10 }).map((_, i) => {
        const height = 5 + Math.random() * 15
        return (
          <group 
            key={i} 
            position={[
              (Math.random() - 0.5) * 30,
              height / 2,
              (Math.random() - 0.5) * 20
            ]}
          >
            {/* Building */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[4, height, 4]} />
              <meshStandardMaterial 
                color={Math.random() > 0.5 ? '#424242' : '#616161'} 
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            
            {/* Windows */}
            <mesh position={[2.01, 0, 0]}>
              <planeGeometry args={[4, height]} />
              <meshStandardMaterial 
                color="#90caf9"
                metalness={0.9}
                roughness={0.1}
                emissive="#64b5f6"
                emissiveIntensity={0.5}
              />
            </mesh>
          </group>
        )
      ))}
    </>
  )

  return (
    <group ref={meshRef} position={position}>
      {type === 'canyon' && renderCanyonWalls()}
      {type === 'forest' && renderForest()}
      {type === 'city' && renderCity()}
      
      {/* Base ground */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[40, 30]} />
        <meshStandardMaterial 
          color={
            type === 'canyon' ? '#a1887f' :
            type === 'forest' ? '#33691e' :
            '#37474f'
          }
          roughness={1}
        />
      </mesh>
    </group>
  )
}