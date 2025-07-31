import React from 'react'

/**
 * Composant d'affichage du dé.
 * Affiche la valeur (1..6) ainsi que l'emoji correspondant.
 */
export default function Dice({ value }) {
  const faces = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685']
  const emoji = faces[value - 1] || '🎲'

  return (
    <div className="dice" aria-label={`résultat du dé: ${value}`}>
      <span className="dice-emoji" role="img" aria-hidden>
        {emoji}
      </span>
      <span className="dice-value">{value}</span>
    </div>
  )
}
