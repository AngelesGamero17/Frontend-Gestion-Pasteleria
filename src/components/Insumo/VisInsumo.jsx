import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";

class VisInsumo extends React.Component {
  state = {
    insumos: [],
    searchQuery: "",
    searchFields: ["nombreInsumo","cantidadInsumo","fecCompra", "tipoInsumo","precioInsumo"],
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

  clickInsumo(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "insumo";
    axios.get(url).then((response) => {
      this.setState({
        insumos: response.data,
      });
    });
  }
  render() {

    const { searchQuery, searchFields, insumos } = this.state;

    const filtroInsumo = insumos.filter((insumo) =>
    searchFields.some((field) =>
      insumo[field] && insumo[field]
      .toString()
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
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
                    <a className="nav-link active" href="/Insumo/VisInsumo">Insumo</a>
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
                <th scope="col">NOMBRE</th>
                <th scope="col">CANTIDAD - INSUMO</th>
                <th scope="col">FECHA - COMPRA</th>
                <th scope="col">TIPO - INSUMO</th>
                <th scope="col">PRECIO - INSUMO</th>
                <th scope="col">IMG</th>
              </tr>
            </thead>
            <tbody>

            {filtroInsumo.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickInsumo(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.nombreInsumo}</td>
                    <td>{value.cantidadInsumo}</td>
                    <td>{value.fecCompra}</td>
                    <td>{value.tipoInsumo}</td>
                    <td>{value.precioInsumo}</td>
                    <td><img src={value.img}  alt="Img insumo" width="90px" height="90px"/></td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar Insumo</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisInsumo; 