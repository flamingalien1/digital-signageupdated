import React, { useState, useEffect } from 'react'

function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export default function LiveClock({ format }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      if (format === 'H:mm') {
        setValue(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }))
      } else if (format === 'dddd, MMMM Do.') {
        const dateStr = now.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'long'
        })
        setValue(`${dateStr} ${ordinal(now.getDate())}.`)
      }
    }
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [format])

  return <span>{value}</span>
}
