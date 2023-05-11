/* eslint-disable no-unused-vars */
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
import VisProduccion from './components/Produccion/VisProduccion';
import ProduccionNuevo from './components/Produccion/Nuevo';
import ProduccionEditar from './components/Produccion/Editar';
import VisComprobante from './components/Comprobante/VisComprobante';
import ComprobanteNuevo from './components/Comprobante/Nuevo';
import ComprobanteEditar from './components/Comprobante/Editar';
import VisDetaComp from './components/detalleComprobante/VisDetaComp';
import detalleCompNuevo from './components/detalleComprobante/Nuevo'; 
import detalleComprobanteEditar from './components/detalleComprobante/Editar';

import VisFecPro from './components/fechaProduccion/VisFecPro';
import fechaProduccionEditar from './components/fechaProduccion/Editar';
import fechaProduccionNuevo from './components/fechaProduccion/Nuevo';



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
        <Route path='/tipoEmpleado/Nuevo' element={<TipoEmpNuevo />} />
        <Route path='/tipoEmpleado/Editar/:id' element={<TipoEmpEditar />} />
        <Route path='/tipoInsumo/VisTipoIns' element={<VisTipoIns/>} />
        <Route path='/tipoInsumo/Nuevo' element={<TipoInsumoNuevo />} />
        <Route path='/tipoInsumo/Editar/:id' element={<TipoInsumoEditar />} />
        <Route path='/Produccion/VisProduccion' element={<VisProduccion/>} />
        <Route path='/Produccion/Nuevo' element={<ProduccionNuevo />} />
        <Route path='/Produccion/Editar/:id' element={<ProduccionEditar />} />
        <Route path='/Comprobante/VisComprobante' element={<VisComprobante/>} />
        <Route path='/Comprobante/Nuevo' element={<ComprobanteNuevo />} />
        <Route path='/Comprobante/Editar/:id' element={<ComprobanteEditar />} />
        <Route path='/detalleComprobante/VisDetaCop' element={<VisDetaComp/>}/>
        <Route path='/detalleComprobante/Nuevo' element={<detalleCompNuevo/>} />
        <Route path='/detalleComprobante/Editar/:id' element={<detalleComprobanteEditar/>} />
        <Route path='/fechaProduccion/VisFecPro' element={<VisFecPro/>} />
        <Route path='/fechaProduccion/Editar/:id' element={<fechaProduccionEditar/>} />
        <Route path='/fechaProduccion/Nuevo' element={<fechaProduccionNuevo/>} />

      </Routes>
    </Router>
  </React.Fragment>
    
  );
}

export default App;
