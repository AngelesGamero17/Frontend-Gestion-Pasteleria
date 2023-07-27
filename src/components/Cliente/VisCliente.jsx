import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/Cliente.css"; // Importar archivo CSS para los estilos
class VisCliente extends React.Component {
  state = {
    clientes: [],
    searchQuery: "",
    searchFields: ["nomCli", "direCli","telefono","dni"],
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

  clickCliente(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "cliente";
    axios.get(url).then((response) => {
      this.setState({
        clientes: response.data,
      });
    });
  }

  render() {
    const { searchQuery, searchFields, clientes } = this.state;

    const filtroClientes = clientes.filter((cliente) =>
      searchFields.some((field) =>
        cliente[field].toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

    return (
      <React.Fragment>
   <div className="fondoCliente">
    <div className="sidebar-Cliente">
        <br />
        <br />
        <ul>
          <li>
            <a href="/dashboard">Inicio</a>
          </li>
          <li>
            <a href="/tipoEmpleado/VisTipoEmp">Tipo Empleado</a>
          </li>
          <li>
            <a href="/Empleado/VisEmpleado">Empleado</a>
          </li>
          <li>
            <a className="active" href="/Cliente/VisCliente">Cliente</a>
          </li>
          <li>
            <a href="/tipoProducto/VisTipoPro">Tipo Producto</a>
          </li>
          <li>
            <a href="/Producto/VisProducto">Producto</a>
          </li>
          <li>
            <a href="/VentaProducto/VisVentPro">Venta Producto</a>
          </li>
          <li>
            <a href="/tipoInsumo/VisTipoIns">Tipo Insumo</a>
          </li>
          <li>
            <a href="/Insumo/VisInsumo">Insumo</a>
          </li>
          <li>
            <a href="/VentaInsumo/VisVentIns">Venta Insumo</a>
          </li>
          <li>
            <a href="/Imagen/VisImg">Imagen</a>
          </li>
          <br/>
          <center>
          <li>
            <LogoutButton onLogout={this.handleLogout} />
          </li>
          </center>
          <br/>
        </ul>
      </div>

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
          <br />
          <br />

          <table className="table table-striped table-bordered custom-Cliente-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">DIRECCION</th>
                <th scope="col">TELEFONO</th>
                <th scope="col">DNI</th>

              </tr>
            </thead>
            <tbody>
              {filtroClientes.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickCliente(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.nomCli}</td>
                    <td>{value.direCli}</td>
                    <td>{value.telefono}</td>
                    <td>{value.dni}</td>
                  </tr>
                );
              })}

            </tbody>
          </table>

          <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar cliente</button>

        </div>


        </div>
      </React.Fragment>
    );
  }
}

export default VisCliente; 