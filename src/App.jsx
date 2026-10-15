import { BrowserRouter as Router, Route, Routes, Navigate,Link } from 'react-router-dom'

import Inicio from './components/inicio'
import Coleccion from './components/coleccion'
import Favoritos from './components/favoritos'
import Info from './components/informacion'
import Usuario from './components/usuario'
import Mago from './components/magos'
import Sombrero from './components/Sombrero'
import './App.css'


function App() {


  return (
    <>
    <Router>
      <nav className='c-menu'>
        <Link to="/">Inicio</Link>
        <Link to="/Coleccion">coleccion</Link>
        <Link to="/favoritos">Favoritos</Link>
        <Link to="/info">Info</Link>
        <Link to="/usuario">Usuarios</Link>
        <Link to="/Sombrero">Sombrero</Link>

      </nav>

      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/coleccion' element={<Coleccion />} />
        <Route path='/favoritos' element={<Favoritos />} />
        <Route path='/info' element={<Info />} />
        <Route path='/usuario' element={<Usuario/>} />
       <Route path="/magos/:slug" element={<Mago />} />
       <Route path='/Sombrero' element={<Sombrero />} />
      </Routes>
    </Router>

      

    </>
  )
}

export default App