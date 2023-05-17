import React from "react";
class Header extends React.Component{
    render(){
        return(

<nav className="navbar navbar-expand-lg navbar navbar-light bg-warning">
              <a className="nav-link" href="/Dashboard">Inicio</a>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/Empleado/VisEmpleado">Empleado</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="/Producto/VisProducto">Producto</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="/Cliente/VisCliente">Cliente</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/tipoEmpleado/VisTipoEmp">Tipo Empleado</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="/tipoInsumo/VisTipoIns"> Tipo Insumo</a>
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

          </nav>

        );
    }
}

export default Header;