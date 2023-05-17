import React from "react";
import Header from "../../template/Header";
import { Apiurl } from "../../services/apirest";
import axios from "axios";

class VisTipoIns extends React.Component {
  state = {
    tipoIns: [],
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
                    <a className="nav-link active" href="/tipoInsumo/VisTipoIns"> Tipo Insumo</a>
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
            </div>
          </nav>
        <div className="container">
          <br />
          <br />
          <table className="table table-hover">
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

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar tipoInsumo</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisTipoIns; 