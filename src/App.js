import React from 'react';
import './assets/css/App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import VisEmpleado from './components/Empleado/VisEmpleado';
import EmpleadoNuevo from './components/Empleado/Nuevo';
import EmpleadoEditar from './components/Empleado/Editar';
import VisProducto from './components/Producto/VisProducto';
import ProductoNuevo from './components/Producto/Nuevo';
import ProductoEditar from './components/Producto/Editar';
import VisCliente from './components/Cliente/VisCliente';
import ClienteNuevo from './components/Cliente/Nuevo';
import ClienteEditar from './components/Cliente/Editar';
import VisInsumo from './components/Insumo/VisInsumo';
import InsumoNuevo from './components/Insumo/Nuevo';
import InsumoEditar from './components/Insumo/Editar';
import VisTipoEmp from './components/tipoEmpleado/VisTipoEmp';
import TipoEmpNuevo from './components/tipoEmpleado/Nuevo';
import TipoEmpEditar from './components/tipoEmpleado/Editar';
import VisTipoIns from './components/tipoInsumo/VisTipoIns';
import TipoInsumoNuevo from './components/tipoInsumo/Nuevo';
import TipoInsumoEditar from './components/tipoInsumo/Editar';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <React.Fragment>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Dashboard' element={<Dashboard />} />
        <Route path='/Empleado/VisEmpleado' element={<VisEmpleado/>} />
        <Route path='/Empleado/Nuevo' element={<EmpleadoNuevo/>} />
        <Route path='/Empleado/Editar/:id' element={<EmpleadoEditar />} />
        <Route path='/Producto/VisProducto' element={<VisProducto/>} />
        <Route path='/Producto/Nuevo' element={<ProductoNuevo/>} />
        <Route path='/Producto/Editar/:id' element={<ProductoEditar />} />
        <Route path='/Cliente/VisCliente' element={<VisCliente/>} />
        <Route path='/Cliente/Nuevo' element={<ClienteNuevo/>} />
        <Route path='/Cliente/Editar/:id' element={<ClienteEditar />} />
        <Route path='/Insumo/VisInsumo' element={<VisInsumo/>} />
        <Route path='/Insumo/Nuevo' element={<InsumoNuevo/>} />
        <Route path='/Insumo/Editar/:id' element={<InsumoEditar />} />
        <Route path='/tipoEmpleado/VisTipoEmp' element={<VisTipoEmp/>} />
        <Route path='/tipoEmpleado/Nuevo'element={<TipoEmpNuevo />} />
        <Route path='/tipoEmpleado/Editar/:id'element={<TipoEmpEditar />} />
        <Route path='/tipoInsumo/VisTipoIns' element={<VisTipoIns/>} />
        <Route path='/tipoInsumo/Nuevo'element={<TipoInsumoNuevo />} />
        <Route path='/tipoInsumo/Editar/:id'element={<TipoInsumoEditar />} />
      </Routes>
    </Router>
  </React.Fragment>
    
  );
}

export default App;
