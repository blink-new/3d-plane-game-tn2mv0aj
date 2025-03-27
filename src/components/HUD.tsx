
import { useEffect, useState } from 'react'

export function HUD() {
  const [score, setScore] = useState(0)
  const [speed, setSpeed] = useState(0)

  return (
    <div className="hud">
      <div className="score">Score: {score}</div>
      <div className="speed">Speed: {Math.round(speed)} km/h</div>
    </div>
  )
}