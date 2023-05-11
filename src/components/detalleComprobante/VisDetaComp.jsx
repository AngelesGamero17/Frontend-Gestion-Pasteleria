import React from "react";
import Header from "../../template/Header";
import { Apiurl } from "../../services/apirest";
import axios from "axios";

class VisDetaComp extends React.Component {
  state = {
    detalleComprobante: [],
  };

  clickDetaComp(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "detalleComprobante";
    axios.get(url).then((response) => {
      this.setState({
        detalleComprobante: response.data,
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
                <th scope="col">PRODUCTO</th>
                <th scope="col">FECHA - PRODUCCION</th>
                <th scope="col">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {this.state.detalleComprobante.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickDetaComp(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.producto}</td>
                    <td>{value.fechaProduccion}</td>
                    <td>{value.estado}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar detalleComprobante</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisDetaComp; 