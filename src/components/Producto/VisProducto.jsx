import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
class VisProducto extends React.Component {
  state = {
    productos: [],
    searchQuery: "",
    searchFields: ["nombre","cantidad","precio", "fechaProduccion"],
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

  clickProducto(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "producto";
    axios.get(url).then((response) => {
      this.setState({
        productos: response.data,
      });
    });
  }
  render() {
    const { searchQuery, searchFields, productos } = this.state;

    const filtroProductos = productos.filter((producto) =>
    searchFields.some((field) =>
      producto[field] && producto[field].toString().toLowerCase().includes(searchQuery.toLowerCase())
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
                    <a className="nav-link active" aria-current="page" href="/Producto/VisProducto">Producto</a>
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
                <th scope="col">NOMBRE</th>
                <th scope="col">CANTIDAD</th>
                <th scope="col">PRECIO</th>
                <th scope="col">FECHA- PRODUCCION</th>
                <th scope="col">IMG</th>
              </tr>
            </thead>
            <tbody>
              {filtroProductos.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickProducto(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.nombre}</td>
                    <td>{value.cantidad}</td>
                    <td>{value.precio}</td>
                    <td>{value.fechaProduccion}</td>
                    <td><img src={value.img}  alt="Img insumo" width="90px" height="90px"/></td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar Producto</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisProducto; 