import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/FondodeVistas.css"; // Importar archivo CSS para los estilos
class VisEmpleado extends React.Component {
    //llamar datos de la api que utilizaremos
  state = {
    empleados: [],
    tipoEmpleados: [],
  };

  //funcion Cerrar Sesion
  handleLogout = () => {
    // Aquí puedes realizar las acciones necesarias para cerrar la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('tipoEmpleado');
    localStorage.removeItem('id');
    window.location.href = "/";
    // Ejemplo: Simplemente mostramos un mensaje en la consola
    console.log('Sesión cerrada');
  };

  clickEmpleado(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }


  componentDidMount() {
    let empleadosUrl = Apiurl + "empleado";
    let tipoEmpleadosUrl = Apiurl + "tipoEmpleado";
  
    axios.all([axios.get(empleadosUrl), axios.get(tipoEmpleadosUrl)])
      .then(axios.spread((empleadosResponse, tipoEmpleadosResponse) => {
        this.setState({
          empleados: empleadosResponse.data,
          tipoEmpleados: tipoEmpleadosResponse.data,
        });
      }))
      .catch(error => {
        console.log(error);
      });
  }


  render() {
    return (
      <React.Fragment>
          <div className="fondoVista-container">
    <nav className="navbar navbar-expand-lg navbar-light bg-custom">
            <div className="container-fluid">
              <a className="nav-link " href="/dashboard">Inicio</a>
              <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="/Empleado/VisEmpleado">Empleado</a>
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
          <table className="table table-striped table-bordered custom-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">APELLIDO</th>
                <th scope="col">EMAIL</th>
                <th scope="col">DIRECCIÓN</th>
                <th scope="col">TELÉFONO</th>
                <th scope="col">TIPO_EMPLEADO</th>
              </tr>
            </thead>
            <tbody>

              {this.state.empleados.map((value, index) => {
                   // Buscar el tipo de emplead correspondiente al ID del insumo actual
              const tipoEmpleados = this.state.tipoEmpleados.find(tipo => tipo.ID === value.tipoEmpleado);
              // Obtener la rol del tipoEmpleados si se encuentra
              const rol = tipoEmpleados ? tipoEmpleados.rol : "";
                return (
                  <tr key={index} onClick={() => this.clickEmpleado(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.nomEmp}</td>
                    <td>{value.apellEmp}</td>
                    <td>{value.email}</td>
                    <td>{value.direccEmp}</td>
                    <td>{value.telefono}</td>
                    <td>{rol}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar Empleado</button>

            </tbody>
          </table>
        </div>

        <footer className="bg-light text-center py-3">
              <p>Empleado</p>
            </footer>
        </div>
        
      </React.Fragment>
    );
  }
}

export default VisEmpleado; 