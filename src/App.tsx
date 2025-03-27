
import { Canvas } from '@react-three/fiber'
import { Sky, Stars, Cloud } from '@react-three/drei'
import { Suspense } from 'react'
import { Game } from './components/Game'
import { HUD } from './components/HUD'
import './App.css'

export default function App() {
  return (
    <div className="game-container">
      <Canvas shadows camera={{ position: [0, 5, 20], fov: 60 }}>
        <Suspense fallback={null}>
          <Game />
          <Sky 
            distance={450000} 
            sunPosition={[1, 2, 1]} 
            inclination={0.6} 
            azimuth={0.25} 
          />
          <Stars radius={100} depth={50} count={5000} factor={4} />
          
          {/* Add some clouds for atmosphere */}
          {Array.from({ length: 20 }).map((_, i) => (
            <Cloud
              key={i}
              position={[
                (Math.random() - 0.5) * 100,
                20 + Math.random() * 10,
                (Math.random() - 0.5) * 100
              ]}
              opacity={0.5}
              speed={0.1}
              width={10}
            />
          ))}
          
          {/* Brighter lighting */}
          <ambientLight intensity={1.5} />
          <directionalLight
            castShadow
            position={[2, 5, 2]}
            intensity={2}
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />
          {/* Additional fill light from front */}
          <directionalLight 
            position={[0, 2, 5]} 
            intensity={1.5} 
          />
        </Suspense>
      </Canvas>
      <HUD />
      <div className="controls-hint">
        Move your mouse to control the plane!
        <br />
        Try to fly through the rings
      </div>
    </div>
  )
}