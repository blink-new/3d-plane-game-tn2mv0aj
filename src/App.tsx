
import { Canvas } from '@react-three/fiber'
import { Sky, Stars, Cloud, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Game } from './components/Game'
import { HUD } from './components/HUD'
import './App.css'

export default function App() {
  return (
    <div className="game-container">
      <Canvas
        gl={{ antialias: true }}
        camera={{ position: [0, 5, 20], fov: 75 }}
        style={{ background: '#87CEEB' }} // Light blue sky color
      >
        <color attach="background" args={['#87CEEB']} />
        
        <Suspense fallback={null}>
          <Game />
          
          {/* Bright daylight scene setup */}
          <ambientLight intensity={1} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={2} 
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          <hemisphereLight 
            intensity={1} 
            groundColor="#553c1b"
          />

          {/* Sky and environment */}
          <Sky 
            distance={450000} 
            sunPosition={[1, 1, 0]} 
            inclination={0.6} 
            azimuth={0.25} 
          />

          {/* Debug controls - remove in production */}
          <OrbitControls />
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