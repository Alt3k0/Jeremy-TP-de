import { useRef } from "react"
import { easing } from "maath"
import { useFrame } from "@react-three/fiber"
import { Text } from "@react-three/drei"

export const AnimatedDiceValue = ({ value, position = [0, 3.4, 0] }) => (
  <group position={position}>
    {/* Masque haut */}
    <mesh position={[0, 0.7, 0]}>
      <planeGeometry args={[2, 1.5]} />
      <meshBasicMaterial color="white" />
    </mesh>

    {/* Masque bas */}
    <mesh position={[0, -0.7, 0]}>
      <planeGeometry args={[2, 1.5]} />
      <meshBasicMaterial color="white" />
    </mesh>

    {/* Contenu visible */}
    <Counter value={value} />
  </group>
)
function Counter({ value, speed = 0.2 }) {
  const ref = useRef()

  useFrame((state, delta) => {
    easing.damp(ref.current.position, "y", -1.6 * (value - 1), speed, delta)
  })

  return (
    <group ref={ref}>
      {[1, 2, 3, 4, 5, 6].map((number) => (
        <Text
          key={number}
          position={[0, 1.6 * (6 - number), 0]}
          fontSize={1.2}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          {number}
        </Text>
      ))}
    </group>
  )
}

export default AnimatedDiceValue