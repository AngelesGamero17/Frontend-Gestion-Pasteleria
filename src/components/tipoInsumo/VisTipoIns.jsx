import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/TIpoInsumo.css"; // Importar archivo CSS para los estilos
class VisTipoIns extends React.Component {
  state = {
    tipoIns: [],
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

  clickTipoInsumo(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "tipoInsumo";
    axios.get(url).then((response) => {
      this.setState({
        tipoIns: response.data,
      });
    });
  }
  
  render() {
    return (
      <React.Fragment>
     <div className="fondoTipoInsumo">
    <div className="sidebar-TipoInsumo">
        <br />
        <br />
        <ul>
          <li>
            <a href="/dashboard"> Inicio </a>
          </li>
          <li>
            <a href="/tipoEmpleado/VisTipoEmp">Tipo Empleado</a>
          </li>
          <li>
            <a href="/Cliente/VisCliente">Cliente</a>
          </li>
          <li>
            <a href="/Empleado/VisEmpleado">Empleado</a>
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
            <a  className="active" href="/tipoInsumo/VisTipoIns">Tipo Insumo</a>
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
          <table className="table table-striped table-bordered custom-TipoInsumo-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">DESCRIPCION</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tipoIns.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickTipoInsumo(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.descripInsumo}</td>
                  </tr>
                );
              })}

            </tbody>
          </table>
          <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar Tipo Insumo</button>

        </div>


        </div>
      </React.Fragment>
    );
  }
}

export default VisTipoIns; 