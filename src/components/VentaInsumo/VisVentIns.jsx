import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/FondodeVistas.css"; // Importar archivo CSS para los estilos
class VisVentIns extends React.Component {
  state = {
    ventaInsumo: [],
    clientes: [],
    empleados: [],
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

  clickVentIns(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let ventaInsumoUrl = Apiurl + "ventaInsumo";
    let clienteUrl = Apiurl + "cliente";
    let empleadoUrl = Apiurl + "empleado";
  
    axios.all([axios.get(ventaInsumoUrl), axios.get(clienteUrl), axios.get(empleadoUrl)])
      .then(axios.spread((ventaInsumoResponse, clienteResponse, empleadosResponse) => {
        this.setState({
          ventaInsumo: ventaInsumoResponse.data,
          clientes: clienteResponse.data,
          empleados: empleadosResponse.data,
        });
      }))
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    const { searchQuery, searchFields, ventaInsumo } = this.state;

    const filtroVentaInsumo = ventaInsumo.filter((ventaInsumos) =>
    searchFields.some((field) =>
    ventaInsumos[field] && ventaInsumos[field].toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
    return (
      <React.Fragment>
    <div className="fondoVista-container">
    <nav className="navbar navbar-expand-lg navbar-light bg-custom">
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
                    <a className="nav-link active" href="/VentaInsumo/VisVentIns">Venta Insumo</a>
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

<table className="table table-striped table-bordered custom-table">
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
            
            {filtroVentaInsumo.map((value, index) => {
              const cliente = this.state.clientes.find(tipo => tipo.ID === value.idCliente);
              const empleados = this.state.empleados.find(tipo => tipo.ID === value.idEmpleado);
              // Obtener la rol del tipoEmpleados si se encuentra
              const nomCli =cliente ? cliente.nomCli : "";
              const nomEmp = empleados ? empleados.nomEmp : "";
                return (
                  <tr key={index} onClick={() => this.clickVentIns(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{nomCli}</td>
                    <td>{nomEmp}</td>
                    <td>{value.descripcion}</td>
                    <td>{value.precioTotal}</td>
                    <td>{value.fechaVenta}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar ventaInsumo</button>

            </tbody>
          </table>
        </div>
            <footer className="bg-light text-center py-3">
              <p>Venta Insumo</p>
            </footer>
        </div>
      </React.Fragment>
    );
  }
}

export default VisVentIns; 