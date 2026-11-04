/**
 * Puente temporal de compatibilidad.
 * Carga la página original completa dentro de React para conservar sus scripts
 * y su comportamiento mientras se migran sus funciones a componentes React.
 */
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
