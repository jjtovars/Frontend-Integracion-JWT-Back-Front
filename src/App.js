import { Fragment } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';
import Login from './paginas/auth/Login.js'
import Registro from './paginas/auth/Registro.js';
import Home from './paginas/Home.js';
import MostrarClientes from './paginas/modulos/MostrarClientes.js';
import AgregarClientes from './paginas/modulos/AgregarClientes.js';
import EditarClientes from './paginas/modulos/EditarClientes.js';

function App() {
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Routes>
            <Route path='/' exact element={<Login/>}/>
            <Route path='/Registro' exact element={<Registro/>}/>
            <Route path='/Home' exact element={<Home/>}/>
            <Route path='/Clientes' exact element={<MostrarClientes/>}/>
            <Route path='/Clientes/agregar' exact element={<AgregarClientes/>}/>
            <Route path='/Clientes/editar/:id' exact element={<EditarClientes/>}/>
          </Routes>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
