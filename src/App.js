import React, { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import Dice3D from './components/Dice3D.js'
import AnimatedDiceValue from './components/AnimatedDiceValue.js'
import { rollDie } from './utils/dice.js'
import './App.css'
import PieChartStats from './components/PieCharts.js'


const STORAGE_KEY = 'diceHistory3D_v1'

function App() {
  const [value, setValue] = useState(1)
  const [history, setHistory] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
      return Array.isArray(saved) ? saved : []
    } catch {
      return []
    }
  })

  const [showHistory, setShowHistory] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const handleRoll = () => {
    const v = rollDie()
    setValue(v)
    setHistory((h) => [{ value: v, ts: Date.now() }, ...h])
  }

  const handleReset = () => setHistory([])

  // Compter le nombre de fois que chaque valeur est tombée
  const counts = history.reduce((acc, { value }) => {
    acc[value] = (acc[value] || 0) + 1
    return acc
  }, {})

  return (
    <div className="wrapper">
      <h1>🎲 Dé 3D – React Three Fiber</h1>

      <div className="viewer">
        <Canvas
          shadows
          gl={{ stencil: true }}
          camera={{ position: [3, 3, 3], fov: 50 }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} castShadow />

          <Suspense fallback={null}>
            <Dice3D value={value} size={1.5} />
            {/* <AnimatedDiceValue value={value} position={[0, 2.2, 0]} /> */}
          </Suspense>

          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial opacity={0.2} />
          </mesh>
        </Canvas>
      </div>

      <div className="controls">
        <button className="primary" onClick={handleRoll}>Lancer le dé</button>
        <button className="secondary" disabled={history.length === 0} onClick={handleReset}>
          Réinitialiser l'historique
        </button>
        <button className="secondary" onClick={() => setShowHistory(!showHistory)}>
          {showHistory ? 'Masquer l’historique' : 'Afficher l’historique'}
        </button>
      </div>

      {showHistory && (
        <section className="history">
          <h2>Historique des lancers ({history.length})</h2>
          <ol>
            {history.map((h) => (
              <li key={h.ts}>
                <span className="value">{h.value}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="stats">
  <h2>Statistiques (Camembert)</h2>
  <PieChartStats counts={counts} />
</section>
    </div>
  )
}

export default App