import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css';

function Coleccion() {
  const [magos, setMagos] = useState([]);
  const totalMagos = magos.length;

  const [listaCapturados, setListaCapturados] = useState(() => {
    try {
      const guardados = JSON.parse(localStorage.getItem('misNumeros') || '[]');
      return Array.isArray(guardados) ? [...new Set(guardados.map(Number))] : [];
    } catch {
      return [];
    }
  });
  const [nuevos, setNuevos] = useState([]);
  const navigate = useNavigate();
  const espacio = Array.from({ length: totalMagos }, (_, i) => i + 1);

  useEffect(() => {
    const cargarMagos = async () => {
      try {
        const paginas = [1, 2, 3, 4, 5];
        const respuestas = await Promise.all(
          paginas.map((n) =>
            fetch(`https://api.potterdb.com/v1/characters?page[size]=100&page[number]=${n}`)
              .then((r) => r.json())
          )
        );
        const personajes = respuestas.flatMap((r) => r.data ?? []);
        setMagos(
          personajes.filter(
            (p) => p.attributes.slug && p.attributes.image && p.attributes.house
          )
        );
      } catch (error) {
        console.error('Error al cargar personajes:', error);
      }
    };
    cargarMagos();
  }, []);

  const capturarAleatorios = () => {
    if (totalMagos === 0) return;
    const seleccionados = Array.from(
      { length: 4 },
      () => Math.floor(Math.random() * totalMagos) + 1
    );
    const vistos = new Set(listaCapturados);
    const resultados = seleccionados.map((id) => {
      const repetido = vistos.has(id);
      vistos.add(id);
      return { id, repetido };
    });
    const actualizados = [...vistos];

    setListaCapturados(actualizados);
    setNuevos(resultados);
    localStorage.setItem('misNumeros', JSON.stringify(actualizados));
  };

  const irAlMago = (id) => {
    const mago = magos[id - 1];
    if (mago) navigate(`/magos/${mago.attributes.slug || mago.id}`);
  };

  return (
    <main className="coleccion" translate="no">
      <h1 className="coleccion-titulo">Colección</h1>
      <p className="coleccion-contador">{listaCapturados.length} <span>/ {totalMagos}</span></p>
      <button
        className="coleccion-boton"
        onClick={capturarAleatorios}
        disabled={totalMagos === 0 || listaCapturados.length >= totalMagos}
      >
        4 nuevos
      </button>

      {nuevos.length > 0 && <h2 className="coleccion-subtitulo">Tus nuevos magos</h2>}
      <section className="coleccion-nuevos">
        {nuevos.map(({ id, repetido }, indice) => (
          <div
            key={`${id}-${indice}`}
            className={repetido ? 'coleccion-nuevo repetido' : 'coleccion-nuevo'}
            onClick={() => irAlMago(id)}
          >
            <p>{id}</p>
            <img
              src={magos[id - 1]?.attributes.image}
              alt={magos[id - 1]?.attributes.name || `Mago ${id}`}
              width="60"
              height="60"
            />
            <p>{magos[id - 1]?.attributes.name || ''}</p>
          </div>
        ))}
      </section>

      <section className="coleccion-album">
        {espacio.map((id) => {
          const capturado = listaCapturados.includes(id);
          return (
            <div
              key={id}
              className={capturado ? 'coleccion-pokemon capturado' : 'coleccion-pokemon'}
              onClick={() => capturado && irAlMago(id)}
            >
              {capturado && (
                <img
                  src={magos[id - 1]?.attributes.image}
                  width="auto"
                  height="45"
                  loading="lazy"
                  alt={magos[id - 1]?.attributes.name || String(id)}
                />
              )}
              <p>{id}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default Coleccion;