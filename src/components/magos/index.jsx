import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import './Style.css'

function Mago() {
    const { slug } = useParams();
    const [mago, setMago] = useState(null);
    const [favoritos, setFavoritos] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('favoritos') || '[]');
        } catch {
            return [];
        }
    });
    const esFavorito = favoritos.some(p => p.id === mago?.id);

    useEffect(() => {
        fetch(`https://api.potterdb.com/v1/characters/${slug}`)
            .then(response => response.json())
            .then(responseData => setMago(responseData.data))
            .catch(error => console.error("Error:", error));
    }, [slug]);

    const toggleFavorito = () => {
        let nuevosFavoritos;
        if (esFavorito) {
            nuevosFavoritos = favoritos.filter(p => p.id !== mago.id);
        } else {
            nuevosFavoritos = [
                ...favoritos,
                {
                    id: mago.id,
                    slug: mago.attributes.slug,
                    nombre: mago.attributes.name,
                    imagen: mago.attributes.image
                }
            ];
        }
        setFavoritos(nuevosFavoritos);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));
    };

    if (!mago || !mago.id) return <p>Cargando...</p>;

    const datos = mago.attributes;

    return (
        <div translate="no">
            <h1>{datos.name}</h1>

            {datos.image && (
                <img src={datos.image} alt={datos.name} width="200" />
            )}

            <p>Casa: {datos.house || 'Desconocida'}</p>
            <p>Especie: {datos.species || 'Desconocida'}</p>
            <p>Género: {datos.gender || 'Desconocido'}</p>
            <p>Nacimiento: {datos.born || 'Desconocido'}</p>
            <p>Sangre: {datos.blood_status || 'Desconocida'}</p>
            <p>Patronus: {datos.patronus || 'Desconocido'}</p>

            <button onClick={toggleFavorito}>
                {esFavorito ? '❤️' : '🤍'}
            </button>
        </div>
    )
}

export default Mago