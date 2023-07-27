import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/Imagen.css"; // Importar archivo CSS para los estilos
class VisImg extends React.Component {
  state = {
    imagen: [],
  };


  //funcion Cerra SEsion
  handleLogout = () => {
    // Aquí puedes realizar las acciones necesarias para cerrar la sesión
    localStorage.removeItem("token");
    localStorage.removeItem("tipoEmpleado");
    localStorage.removeItem("id");
    window.location.href = "/";
    // Ejemplo: Simplemente mostramos un mensaje en la consola
    console.log("Sesión cerrada");
  };

  clickImagen(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "imagen";
    axios.get(url).then((response) => {
      this.setState({
        imagen: response.data,
      });
    });
  }

  render() {
    return (
      <React.Fragment>
      <div className="fondoImagen">
    <div className="sidebar-Imagen">
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
            <a className="active" href="/Imagen/VisImg">Imagen</a>
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
            <table className="table table-striped table-bordered custom-Imagen-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">IMAGEN INSUMO</th>
                  <th scope="col">IMAGEN PRODUCTO</th>
                  <th scope="col">IMAGEN PROFORMA INSUMO</th>
                  <th scope="col">IMAGEN PROFORMA PRODUCTO</th>
                  <th scope="col">IMAGEN LOGIN </th>
                </tr>
              </thead>
              <tbody>
                {this.state.imagen.map((value, index) => {
                  return (
                    <tr key={index} onClick={() => this.clickImagen(value.ID)}>
                      <th scope="row">{value.ID}</th>
                      <td>
                        <img
                          src={value.imgIns}
                          alt="Img insumo"
                          width="90px"
                          height="90px"
                        />
                      </td>
                      <td>
                        <img
                          src={value.imgPro}
                          alt="Img producto"
                          width="90px"
                          height="90px"
                        />
                      </td>

                      <td>
                        <img
                          src={value.imgProIns}
                          alt="Img proforma insumo"
                          width="90px"
                          height="90px"
                        />
                      </td>

                      <td>
                        <img
                          src={value.imgProProduc}
                          alt="Img proforma producto"
                          width="90px"
                          height="90px"
                        />
                      </td>
            
                      <td>
                        <img
                          src={value.imgLogin}
                          alt="Img login"
                          width="90px"
                          height="90px"
                        />
                      </td>
                    </tr>
                  );
                })}

              </tbody>
            </table>
            <br></br>
                {/* <button
                  type="submit"
                  className="btn btn-success"
                  onClick={() => this.clickAgregar()} > Registrar Imagen </button>  */}
          </div>

      
        </div>
      </React.Fragment>
    );
  }
}

export default VisImg;