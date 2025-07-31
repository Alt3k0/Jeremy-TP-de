import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899']

function BarChartStats({ counts }) {
  const data = [1, 2, 3, 4, 5, 6].map((face) => ({
    face: `Face ${face}`,
    count: counts[face] || 0,
  }))

  return (
    <div style={{ width: '100%', height: 350 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="face" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey="count">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'center', gap: 15 }}>
        {data.map(({ face, count }, index) => (
          <div key={face} style={{ textAlign: 'center' }}>
            <div style={{ width: 20, height: 20, backgroundColor: COLORS[index % COLORS.length], margin: '0 40px 5px' }}></div>
            <strong>{face}</strong>
            <div>{count} fois</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default BarChartStats