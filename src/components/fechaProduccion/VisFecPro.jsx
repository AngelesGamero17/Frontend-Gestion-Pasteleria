import React from "react";
import Header from "../../template/Header";
import { Apiurl } from "../../services/apirest";
import axios from "axios";

class VisFecPro extends React.Component {
  state = {
    fechaProduccion: [],
  };

  clickfechaProduccion(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "fechaProduccion";
    axios.get(url).then((response) => {
      this.setState({
        fechaProduccion: response.data,
      });
    });
  }
  render() {
    return (
      <React.Fragment>

<nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                    <a className="nav-link" href="/Produccion/VisProduccion">Produccion</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/Comprobante/VisComprobante">Comprobante</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/detalleComprobante/VisDetaComp">Detalle - Comprobante</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link active" href="/fechaProduccion/VisFecPro">Fecha - Produccion</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/familiaProducto/VisFaProduc">FAMILIA - PRODUCTO</a>
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
                <th scope="col">INSUMO</th>
                <th scope="col">PRODUCCION</th>
                <th scope="col">CANTIDAD</th>
              </tr>
            </thead>
            <tbody>
              {this.state.fechaProduccion.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickfechaProduccion(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.insumo}</td>
                    <td>{value.produccion}</td>
                    <td>{value.cantidad}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar fechaProduccion</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisFecPro; 