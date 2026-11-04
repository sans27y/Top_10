import React from 'react'

export default function LegacyPage({ title, file }) {
  return (
    <main className="legacy-shell">
      <iframe
        key={file}
        title={title}
        src={`${import.meta.env.BASE_URL}legacy/${file}`}
        className="legacy-frame"
      />
    </main>
  )
}
