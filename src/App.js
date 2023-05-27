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
import VisVentIns from './components/VentaInsumo/VisVentIns';
import VentInsEditar from './components/VentaInsumo/Editar';
import NuevoVI from './components/VentaInsumo/NuevoVI';
import VisVentPro from './components/VentaProducto/VisVentPro';
import EditarVP from './components/VentaProducto/EditarVP';
import NuevoVP from './components/VentaProducto/NuevoVP';
import NoPermisos from './components/NoPermisos';
import MostrarProductos from './components/MostrarProductos';
import MostrarInsumo from './components/MostrarInsumo';
import ProformaInsumo from './components/ProformaInsumo';
import ProformaProducto from './components/ProformaProducto';


import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
let tipoEmpleado = JSON.parse(localStorage.getItem('tipoEmpleado'));

function App() {
  return (
    <React.Fragment>
    <Router>
      <Routes>

      <Route path='/' element={<MostrarInsumo />} />
      <Route path='/NoPermisos' element={<NoPermisos/>}/>
      <Route path='/MostrarProductos' element={<MostrarProductos/>} />
      <Route path='/MostrarInsumo' element={<MostrarInsumo/>} />
      <Route path='/ProformaInsumo' element={<ProformaInsumo/>} />
      <Route path='/ProformaProducto' element={<ProformaProducto/>} />
      <Route path='/Login' element={<Login />} />

      {(tipoEmpleado === 1 ||tipoEmpleado === 2 ||tipoEmpleado === 3)? (
            <React.Fragment>
            <Route path='/Dashboard' element={<Dashboard />} />
            <Route path='/Cliente/VisCliente' element={<VisCliente/>} />
            <Route path='/Cliente/Nuevo' element={<ClienteNuevo/>} />
            <Route path='/Cliente/Editar/:id' element={<ClienteEditar />} />
            </React.Fragment>
          ) : (
            <React.Fragment>
            <Route path='/Dashboard' element={<NoPermisos/>} />
            <Route path='/Cliente/VisCliente' element={<NoPermisos/>} />
            <Route path='/Cliente/Nuevo' element={<NoPermisos/>} />
            <Route path='/Cliente/Editar/:id' element={<NoPermisos/>} />
            </React.Fragment>
          )}

        {tipoEmpleado === 1? (
            <React.Fragment>
              <Route path='/Empleado/Editar/:id' element={<EmpleadoEditar />} />
              <Route path='/Empleado/Nuevo' element={<EmpleadoNuevo/>} />
              <Route path='/Empleado/VisEmpleado' element={<VisEmpleado />} />
              <Route path='/Producto/VisProducto' element={<VisProducto/>} />
              <Route path='/Producto/Nuevo' element={<ProductoNuevo/>} />
              <Route path='/Producto/Editar/:id' element={<ProductoEditar />} />
              <Route path='/Insumo/VisInsumo' element={<VisInsumo/>} />
              <Route path='/Insumo/Nuevo' element={<InsumoNuevo/>} />
              <Route path='/Insumo/Editar/:id' element={<InsumoEditar />} />
              <Route path='/tipoEmpleado/VisTipoEmp' element={<VisTipoEmp/>} />
              <Route path='/tipoEmpleado/Nuevo' element={<TipoEmpNuevo />} />
              <Route path='/tipoEmpleado/Editar/:id' element={<TipoEmpEditar />} />
              <Route path='/tipoInsumo/VisTipoIns' element={<VisTipoIns/>} />
              <Route path='/tipoInsumo/Nuevo' element={<TipoInsumoNuevo />} />
              <Route path='/tipoInsumo/Editar/:id' element={<TipoInsumoEditar />} />
              <Route path='/VentaInsumo/VisVentIns' element={<VisVentIns/>} />
              <Route path='/VentaInsumo/Editar/:id' element={<VentInsEditar/>} />
              <Route path='/VentaInsumo/Nuevo' element={<NuevoVI/>} />
              <Route path='/VentaProducto/VisVentPro' element={<VisVentPro/>} />
              <Route path='/VentaProducto/Editar/:id' element={<EditarVP />} />
              <Route path='/VentaProducto/Nuevo' element={<NuevoVP/>} />
              </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path='/Empleado/Editar/:id' element={<NoPermisos />} />
              <Route path='/Empleado/Nuevo' element={<NoPermisos/>} />
              <Route path='/Empleado/VisEmpleado' element={<NoPermisos />} />
              <Route path='/tipoEmpleado/VisTipoEmp' element={<NoPermisos/>} />
              <Route path='/tipoEmpleado/Nuevo' element={<NoPermisos/>} />
              <Route path='/tipoEmpleado/Editar/:id' element={<NoPermisos/>} />
            </React.Fragment>
          )}

        {tipoEmpleado === 2? (
            <React.Fragment>
              <Route path='/Insumo/VisInsumo' element={<VisInsumo/>} />
              <Route path='/Insumo/Nuevo' element={<InsumoNuevo/>} />
              <Route path='/Insumo/Editar/:id' element={<InsumoEditar />} />
              <Route path='/tipoInsumo/VisTipoIns' element={<VisTipoIns/>} />
              <Route path='/tipoInsumo/Nuevo' element={<TipoInsumoNuevo />} />
              <Route path='/tipoInsumo/Editar/:id' element={<TipoInsumoEditar />} />
              <Route path='/VentaInsumo/VisVentIns' element={<VisVentIns/>} />
              <Route path='/VentaInsumo/Editar/:id' element={<VentInsEditar/>} />
              <Route path='/VentaInsumo/Nuevo' element={<NuevoVI/>} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path='/Insumo/VisInsumo' element={<NoPermisos/>} />
              <Route path='/Insumo/Nuevo' element={<NoPermisos/>} />
              <Route path='/Insumo/Editar/:id' element={<NoPermisos />} />
              <Route path='/tipoInsumo/VisTipoIns' element={<NoPermisos/>} />
              <Route path='/tipoInsumo/Nuevo' element={<NoPermisos/>} />
              <Route path='/tipoInsumo/Editar/:id' element={<NoPermisos/>} />
              <Route path='/VentaInsumo/VisVentIns' element={<NoPermisos/>} />
              <Route path='/VentaInsumo/Editar/:id' element={<NoPermisos />} />
              <Route path='/VentaInsumo/Nuevo' element={<NoPermisos/>} />
            </React.Fragment>
          )}

          {tipoEmpleado === 3? (
            <React.Fragment>
              <Route path='/Producto/VisProducto' element={<VisProducto/>} />
              <Route path='/Producto/Nuevo' element={<ProductoNuevo/>} />
              <Route path='/Producto/Editar/:id' element={<ProductoEditar />} />
              <Route path='/VentaProducto/VisVentPro' element={<VisVentPro/>} />
              <Route path='/VentaProducto/Editar/:id' element={<EditarVP />} />
              <Route path='/VentaProducto/Nuevo' element={<NuevoVP/>} />
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Route path='/Producto/VisProducto' element={<NoPermisos/>} />
              <Route path='/Producto/Nuevo' element={<NoPermisos/>} />
              <Route path='/Producto/Editar/:id' element={<NoPermisos />} />
              <Route path='/VentaProducto/VisVentPro' element={<NoPermisos/>} />
              <Route path='/VentaProducto/Editar/:id' element={<NoPermisos/>} />
              <Route path='/VentaProducto/Nuevo' element={<NoPermisos/>} />
            </React.Fragment>
          )}
      </Routes>
    </Router>
  </React.Fragment>
    
  );
}

export default App;
