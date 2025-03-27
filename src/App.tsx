
import { Canvas } from '@react-three/fiber'
import { Sky, Stars, OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import { Game } from './components/Game'
import { HUD } from './components/HUD'
import './App.css'

export default function App() {
  return (
    <div className="game-container">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 75 }}>
        <Suspense fallback={null}>
          <Game />
          <Sky sunPosition={[100, 20, 100]} />
          <Stars radius={200} depth={50} count={1000} factor={4} />
          <ambientLight intensity={0.5} />
          <directionalLight
            castShadow
            position={[10, 10, 10]}
            intensity={1.5}
          />
        </Suspense>
      </Canvas>
      <HUD />
    </div>
  )
}