import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";

class VisVentPro extends React.Component {

  state = {
    ventaProducto: [],
    searchQuery: "",
    searchFields: ["idCliente","idEmpleado","descripcion", "precioTotal","fechaVenta"],
  };
  //buscador
  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

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

  clickVentPro(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "ventaProducto";
    axios.get(url).then((response) => {
      this.setState({
        ventaProducto: response.data,
      });
    });
  }
  render() {
    const { searchQuery, searchFields, ventaProducto } = this.state;

    const filtroVentaProducto = ventaProducto.filter((ventaProductos) =>
    searchFields.some((field) =>
    ventaProductos[field] && ventaProductos[field].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
    return (
      <React.Fragment>
<nav className="navbar navbar-expand-lg navbar navbar-light bg-info">
            <div className="container-fluid">
              <a className="nav-link " href="/dashboard">Inicio</a>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/Empleado/VisEmpleado">Empleado</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " aria-current="page" href="/Producto/VisProducto">Producto</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link " href="/Cliente/VisCliente">Cliente</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/tipoEmpleado/VisTipoEmp">Tipo Empleado</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/tipoInsumo/VisTipoIns"> Tipo Insumo</a>
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
            </div>
          </nav>
        <div className="container">
          <br />
          <br />

          <input
              type="text"
              placeholder="Buscar"
              value={searchQuery}
              onChange={this.handleSearch}
              className="form-control"
          />

          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">CLIENTE</th>
                <th scope="col">EMPLEADO</th>
                <th scope="col">DESCRIPCION</th>
                <th scope="col">PRECIO - TOTAL</th>
                <th scope="col">FECHA - VENTA</th>
              </tr>
            </thead>
            <tbody>
            {filtroVentaProducto.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickVentPro(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.idCliente}</td>
                    <td>{value.idEmpleado}</td>
                    <td>{value.descripcion}</td>
                    <td>{value.precioTotal}</td>
                    <td>{value.fechaVenta}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar ventaProducto</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisVentPro; 