import React from "react";
import Header from "../../template/Header";
import { Apiurl } from "../../services/apirest";
import axios from "axios";

class VisComprobante extends React.Component {
  state = {
    comprobante: [],
  };

  clickComprobante(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "comprobante";
    axios.get(url).then((response) => {
      this.setState({
        comprobante: response.data,
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        <Header></Header>
        <div className="container">
          <br />
          <br />
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">EMPLEADO</th>
                <th scope="col">FECHA - COMPROBANTE</th>
                <th scope="col">CLIENTE</th>
                <th scope="col">ESTADO - COMPROBANTE</th>
                <th scope="col">DETALLE - COMPROBANTE</th>
              </tr>
            </thead>
            <tbody>
              {this.state.comprobante.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickComprobante(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.empleado}</td>
                    <td>{value.fechaComp}</td>
                    <td>{value.cliente}</td>
                    <td>{value.estadoComp}</td>
                    <td>{value.detalleComprobante}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar Comprobante</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisComprobante; 