
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Style.css'

function Inicio() {
  const [todoslosmagos, setTodoslosmagos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [tipomago, setTipomago] = useState('All')
  const navigate = useNavigate()


useEffect(() => {
  const cargarPersonajes = async () => {
    try {
      const paginas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]

      const respuestas = await Promise.all(
        paginas.map((n) =>
          fetch(`https://api.potterdb.com/v1/characters?page[size]=100&page[number]=${n}`)
            .then((r) => r.json())
        )
      )

      const personajes = respuestas.flatMap((r) => r.data ?? [])

      setTodoslosmagos(
        personajes.filter((personaje) =>
          personaje.attributes.slug &&
          personaje.attributes.image &&
          personaje.attributes.house
        )
      )
    } catch (error) {
      console.error('Error:', error)
    }
  }

  cargarPersonajes()
}, [])

  const resultados = busqueda.trim().length >= 1
    ? todoslosmagos.filter((personaje) =>
        personaje.attributes.name
          ?.toLowerCase()
          .includes(busqueda.toLowerCase())
      )
    : todoslosmagos

  const tipos = [
    'All',
    'Gryffindor',
    'Slytherin',
    'Hufflepuff',
    'Ravenclaw'
  ]

  const personajesFiltrados = tipomago === 'All'
    ? resultados
    : resultados.filter((personaje) =>
        personaje.attributes.house === tipomago
      )

  if (todoslosmagos.length === 0) return <p>Cargando...</p>

  if (personajesFiltrados.length === 0) {
    return (
      <>
        <div className="c-filtro">
          {tipos.map((unTipo) => (
            <button
              type="button"
              key={unTipo}
              onClick={() => setTipomago(unTipo)}
            >
              {unTipo}
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Buscar personaje"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="c-buscador"
        />

        <p>No se encontraron personajes.</p>
      </>
    )
  }

  return (
    <>
      <div className="c-filtro">
        {tipos.map((unTipo) => (
          <button
            type="button"
            key={unTipo}
            onClick={() => setTipomago(unTipo)}
          >
            {unTipo}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Buscar personaje"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="c-buscador"
      />

      {personajesFiltrados.map((personaje) => (
        <div
          key={personaje.id}
          onClick={() =>
            navigate(`/magos/${personaje.attributes.slug || personaje.id}`)
          }
        >
          <p>{personaje.id}</p>
          <p>{personaje.attributes.name}</p>

          <img
            src={personaje.attributes.image}
            alt={`Personaje ${personaje.attributes.name}`}
            width="auto"
            height="60"
            loading="lazy"
          />
        </div>
      ))}
    </>
  )
}

export default Inicio
