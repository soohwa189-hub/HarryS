import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import './Style.css'


function Mago() {
        const { name } = useParams();
        const [datapoke, setDatapoke] = useState([]);
 useEffect(() => {
    fetch(`https://api.potterdb.com/v1/characters/${name}`)
      .then(response => response.json())
      .then(responseData => setDatapoke(responseData.data))
      .catch(error => console.error("Error:", error));
    }, [name]);
    console.log(datapoke)

     if (!datapoke || !datapoke.id) return <p>Cargando...</p>;
    return (
         <div>
        <p>{datapoke.id}</p>
        <h1>{datapoke.attributes.name}</h1>
        <img
            src={datapoke.attributes.image}
            alt={datapoke.attributes.name}
            width="200"
        />

        <p>{datapoke.id}</p>
        <p>Especie: {datapoke.attributes.species}</p>

        <p>Género: {datapoke.attributes.gender}</p>
        <p>Casa: {datapoke.attributes.house}</p>
        <p>Fecha de nacimiento: {datapoke.attributes.born}</p>
        <p>Color de ojos: {datapoke.attributes.eye_color}</p>
        <p>Boggart: {datapoke.attributes.boggart}</p>

        </div>
    )
 
}

export default Mago