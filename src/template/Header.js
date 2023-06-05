import React from "react";
import LogoutButton from "../components/CerrarSesion";

class Header extends React.Component {
  //funcion Cerra SEsion
  handleLogout = () => {
    // Aquí puedes realizar las acciones necesarias para cerrar la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('tipoEmpleado');
    localStorage.removeItem('id');
    window.location.href = "/";
    // Ejemplo: Simplemente mostramos un mensaje en la consola
    console.log('Sesión cerrada');
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-custom">
      <div className="container-fluid">
        <a className="nav-link" href="/Dashboard">Inicio</a>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/Empleado/VisEmpleado">Empleado</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Producto/VisProducto">Producto</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Cliente/VisCliente">Cliente</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/tipoEmpleado/VisTipoEmp">Tipo Empleado</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/tipoInsumo/VisTipoIns">Tipo Insumo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/Insumo/VisInsumo">Insumo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/VentaProducto/VisVentPro">Venta Producto</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/VentaInsumo/VisVentIns">Venta Insumo</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/TipoProducto/VisTipoPro">Tipo Producto</a>
            </li>
          </ul>
          
        </div>
        <ul className="navbar-nav">
          <li>
            <LogoutButton onLogout={this.handleLogout} />
          </li>
        </ul>
        </div>

      </nav>
      
    );
  }
}

export default Header;