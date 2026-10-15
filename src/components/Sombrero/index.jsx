import { useState } from 'react'
import './Style.css'

const preguntas = [
  {
    texto: 'Encuentras una billetera perdida con dinero. ¿Qué haces?',
    opciones: [
      { texto: 'La devuelvo de inmediato a su dueño', casa: 'Hufflepuff' },
      { texto: 'Investigo de quién es, con astucia', casa: 'Slytherin' },
      { texto: 'La entrego a la policía sin dudarlo, es lo correcto', casa: 'Gryffindor' },
      { texto: 'Pienso en la mejor forma lógica de resolverlo', casa: 'Ravenclaw' }
    ]
  },
  {
    texto: '¿Qué cualidad valoras más en ti?',
    opciones: [
      { texto: 'La lealtad', casa: 'Hufflepuff' },
      { texto: 'La ambición', casa: 'Slytherin' },
      { texto: 'El valor', casa: 'Gryffindor' },
      { texto: 'La inteligencia', casa: 'Ravenclaw' }
    ]
  },
  {
    texto: 'Un amigo está en problemas. ¿Qué haces?',
    opciones: [
      { texto: 'Me quedo a su lado hasta que se sienta mejor', casa: 'Hufflepuff' },
      { texto: 'Busco la manera de sacar ventaja del problema', casa: 'Slytherin' },
      { texto: 'Voy de inmediato a ayudarlo, sin pensarlo mucho', casa: 'Gryffindor' },
      { texto: 'Analizo qué pasó para darle un buen consejo', casa: 'Ravenclaw' }
    ]
  },
  {
    texto: '¿Qué materia elegirías en Hogwarts?',
    opciones: [
      { texto: 'Herbología', casa: 'Hufflepuff' },
      { texto: 'Pociones', casa: 'Slytherin' },
      { texto: 'Defensa contra las Artes Oscuras', casa: 'Gryffindor' },
      { texto: 'Encantamientos', casa: 'Ravenclaw' }
    ]
  }
]

const descripciones = {
  Gryffindor: 'Valiente y decidido. Enfrentas los problemas de frente.',
  Slytherin: 'Ambicioso y astuto. Sabes lo que quieres y cómo conseguirlo.',
  Hufflepuff: 'Leal y justo. Siempre estás para los demás.',
  Ravenclaw: 'Inteligente y curioso. Te mueve aprender y entender.'
}

function Sombrero() {
  const [indice, setIndice] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const [puntos, setPuntos] = useState({
    Gryffindor: 0,
    Slytherin: 0,
    Hufflepuff: 0,
    Ravenclaw: 0
  })

  const responder = (casa) => {
    setPuntos({ ...puntos, [casa]: puntos[casa] + 1 })

    if (indice + 1 < preguntas.length) {
      setIndice(indice + 1)
    } else {
      setTerminado(true)
    }
  }

  const reiniciar = () => {
    setIndice(0)
    setTerminado(false)
    setPuntos({ Gryffindor: 0, Slytherin: 0, Hufflepuff: 0, Ravenclaw: 0 })
  }

  const casaGanadora = Object.entries(puntos).sort((a, b) => b[1] - a[1])[0][0]

  const progreso = terminado ? 100 : (indice / preguntas.length) * 100

  return (
    <section className="c-sombrero">
      <h1>El Sombrero Seleccionador</h1>
      <p>Responde {preguntas.length} preguntas y descubre tu casa.</p>

      <div className="c-barra">
        <div className="c-barra-relleno" style={{ width: `${progreso}%` }}></div>
      </div>

      {terminado ? (
        <div className="c-resultado">
          <h2>¡Eres de {casaGanadora}!</h2>
          <p>{descripciones[casaGanadora]}</p>
          <button type="button" onClick={reiniciar}>Volver a intentar</button>
        </div>
      ) : (
        <div>
          <h2>{preguntas[indice].texto}</h2>
          {preguntas[indice].opciones.map((opcion) => (
            <button
              type="button"
              key={opcion.texto}
              className="c-opcion"
              onClick={() => responder(opcion.casa)}
            >
              {opcion.texto}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export default Sombrero
