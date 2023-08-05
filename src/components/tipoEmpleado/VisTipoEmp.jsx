import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/TipoEmpleado.css"; // Importar archivo CSS para los estilos
class VisTipoEmp extends React.Component {
  state = {
    tipoEmp: [],
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

  clickTipoEmpleado(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "tipoEmpleado";
    axios.get(url).then((response) => {
      this.setState({
        tipoEmp: response.data,
      });
    });
  }
  render() {
    return (
      <React.Fragment>
     <div className="fondoTipoEmpleado">
    <div className="sidebar-TipoEmpleado">
        <br />
        <br />
        <ul>
          <li>
            <a href="/dashboard"> Inicio </a>
          </li>
          <li>
            <a className="active" href="/tipoEmpleado/VisTipoEmp">Tipo Empleado</a>
          </li>
          <li>
            <a href="/Empleado/VisEmpleado">Empleado</a>
          </li>
          <li>
            <a href="/Cliente/VisCliente">Cliente</a>
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
          <table className="table table-striped table-bordered custom-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">ROL</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tipoEmp.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickTipoEmpleado(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.rol}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
              <br/>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar Tipo Empleado</button>

        </div>
      
        </div>
      </React.Fragment>
    );
  }
}

export default VisTipoEmp;  