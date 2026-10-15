
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style.css'

function Favoritos() {
  const navigate = useNavigate();
  const [favoritos] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favoritos') || '[]');
    } catch {
      return [];
    }
  });

  return (
    <>
      <div className="c-lista">
        {favoritos.map((personaje) => (
          <div
            key={personaje.id}
            className="c-lista-pokemon"
            onClick={() => navigate(`/magos/${personaje.nombre}`)}
          >
            <p>{personaje.id}</p>
            <p>{personaje.nombre}</p>
            <img
              src={personaje.imagen}
              alt={`Personaje ${personaje.nombre}`}
              width="auto"
              height="60"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Favoritos
