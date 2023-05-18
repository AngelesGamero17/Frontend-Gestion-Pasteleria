import React from "react";
import LogoutButton from "../components/CerrarSesion";

class Header extends React.Component {
  handleLogout = () => {
    // Aquí puedes realizar las acciones necesarias para cerrar la sesión
    // Por ejemplo, puedes eliminar los datos de autenticación, redirigir al usuario a la página de inicio de sesión, etc.
    // También puedes utilizar librerías o servicios específicos para manejar la lógica de cierre de sesión.
    localStorage.removeItem('token');
    localStorage.removeItem('tipoEmpleado');
    localStorage.removeItem('id');
    window.location.href = "/";
    // Ejemplo: Simplemente mostramos un mensaje en la consola
    console.log('Sesión cerrada');
  };

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar navbar-light bg-warning">
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
          </ul>
        </div>
        <ul className="navbar-nav">
          <li>
            <LogoutButton onLogout={this.handleLogout} />
          </li>
        </ul>
      </nav>
    );
  }
}

export default Header;