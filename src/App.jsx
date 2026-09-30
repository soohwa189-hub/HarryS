import { BrowserRouter as Router, Route, Routes, Navigate,Link } from 'react-router-dom'

import Inicio from './components/inicio'
import Coleccion from './components/coleccion'
import Favoritos from './components/favoritos'
import Info from './components/informacion'
import Usuario from './components/usuario'
import Mago from './components/magos'
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

      </nav>

      <Routes>
        <Route path='/' element={<Inicio />} />
        <Route path='/coleccion' element={<Coleccion />} />
        <Route path='/favoritos' element={<Favoritos />} />
        <Route path='/info' element={<Info />} />
        <Route path='/usuario' element={<Usuario/>} />
       <Route path="/Mago/:name" element={<Mago />} />
      </Routes>
    </Router>

      

    </>
  )
}

export default App