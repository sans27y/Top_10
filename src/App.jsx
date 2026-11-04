import { useEffect, useState } from 'react'
import LegacyPage from './components/LegacyPage.jsx'

const pages = {
  inicio: { title: 'Inicio de sesión', file: 'index.html' },
  registro: { title: 'Crear cuenta', file: 'registro.html' },
  top10: { title: 'Top 10', file: 'top10.html' },
  explorar: { title: 'Explorar canciones', file: 'explorar.html' },
  subir: { title: 'Subir canción', file: 'subir.html' }
}

function pageFromLocation() {
  const requested = new URLSearchParams(window.location.search).get('page')
  return pages[requested] ? requested : 'inicio'
}

export default function App() {
  const [page, setPage] = useState(pageFromLocation)

  useEffect(() => {
    const onPopState = () => setPage(pageFromLocation())
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])

  function navigate(next) {
    const url = next === 'inicio' ? window.location.pathname : `${window.location.pathname}?page=${next}`
    window.history.pushState({}, '', url)
    setPage(next)
  }

  return <LegacyPage title={pages[page].title} file={pages[page].file} />
}
