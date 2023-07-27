import React from "react";
import LogoutButton from "../components/CerrarSesion";
import "../assets/css/Hearder.css"; // Importar archivo CSS para los estilos

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

      <div className="sidebar-header">
        <br />
        <br />

      </div>

    );
  }
}

export default Header;