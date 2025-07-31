import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useLoader, useFrame } from '@react-three/fiber' 

export default function Dice3D({ value = 1, size = 1 }) {
  const meshRef = useRef()

  const textures = useLoader(THREE.TextureLoader, [ 
    '/textures/dice4.png', // left
    '/textures/dice3.png',
    '/textures/dice1.png', // top
    '/textures/dice6.png', // bottom
    '/textures/dice5.png', // front
    '/textures/dice2.png', // back
  ])

  // Améliorer la netteté du texte (optionnel)
  textures.forEach((t) => {
    t.anisotropy = 16
    t.minFilter = THREE.LinearMipMapLinearFilter
    t.magFilter = THREE.LinearFilter
    t.generateMipmaps = true
  })

  const materials = useMemo(
    () =>
      textures.map(
        (tex) => new THREE.MeshStandardMaterial({ map: tex })
      ),
    [textures]
  )

  const targetQuaternion = useMemo(() => {

    const euler = new THREE.Euler()
    switch (value) {
      case 1: // top
        euler.set(0, 0, 0)
        break
      case 2:
        euler.set(Math.PI / 2, 0, 0)
        break
      case 3: 
        euler.set(0, 0, -Math.PI / 2)
        break
      case 4: 
        euler.set(0, 0, Math.PI / 2)
        break
      case 5:
        euler.set(-Math.PI / 2, 0, 0)
        break
      case 6: 
        euler.set(Math.PI, 0, 0)
        break
      default:
        euler.set(0, 0, 0)
    }
    const q = new THREE.Quaternion()
    q.setFromEuler(euler)
    return q
  }, [value])


  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.quaternion.slerp(targetQuaternion, 0.15) 
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <boxGeometry args={[size, size, size]} />
      {materials.map((m, i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} {...m} />
      ))}
    </mesh>
  )
}
