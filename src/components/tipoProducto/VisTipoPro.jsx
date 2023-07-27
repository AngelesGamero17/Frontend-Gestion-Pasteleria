import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/TIpoProducto.css"; // Importar archivo CSS para los estilos

class VisTipoPro extends React.Component {
  state = {
    tipoPro: [],
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

  clickTipoProducto(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "tipoProducto";
    axios.get(url).then((response) => {
      this.setState({
        tipoPro: response.data,
      });
    });
  }
  
  render() {
    return (
      <React.Fragment>
        <div className="fondoTipoProducto">
          <div className="sidebar-tipoProducto">
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
                <a href="/Empleado/VisEmpleado">Empleado</a>
              </li>
              <li>
                <a href="/Cliente/VisCliente">Cliente</a>
              </li>
              <li>
                <a className="active" href="/tipoProducto/VisTipoPro">Tipo Producto</a>
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
            <table className="table table-striped table-bordered custom-TipoProducto-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">DESCRIPCION</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tipoPro.map((value, index) => {
                  return (
                    <tr key={index} onClick={() => this.clickTipoProducto(value.ID)}>
                      <th scope="row">{value.ID}</th>
                      <td>{value.descripProducto}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <br/>
            <br/>
            <button type="submit" className="btn btn-success" onClick={() => this.clickAgregar()}>Registrar tipoProducto</button>
          </div>
        </div>

        <footer className="bg-light text-center py-3">
          <p>Tipo Producto</p>
        </footer>
      </React.Fragment>
    );
  }
}

export default VisTipoPro;