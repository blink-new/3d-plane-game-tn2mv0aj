
import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
import { Airplane } from './components/Airplane'
import { Terrain } from './components/Terrain'
import { Rings } from './components/Rings'

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(0,0,0,0.7)',
        color: 'white',
        padding: '1rem 2rem',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: 0, fontSize: '1.2rem' }}>Move your mouse to control the plane!</p>
        <p style={{ margin: '0.5rem 0 0 0' }}>Try to fly through the rings</p>
      </div>

      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} />
        <OrbitControls enableZoom={false} />
        
        <ambientLight intensity={0.5} />
        <directionalLight
          castShadow
          position={[10, 10, 5]}
          intensity={1.5}
          shadow-mapSize={[1024, 1024]}
        />
        
        <Airplane position={[0, 0, 0]} />
        <Rings />
        <Terrain position={[0, -20, -50]} type="canyon" />
        
        <fog attach="fog" args={['#c7d9e8', 30, 100]} />
      </Canvas>
    </div>
  )
}

export default App