import React from "react";
import Header from "../../template/Header";
import { Apiurl } from "../../services/apirest";
import axios from "axios";

class VisInsumo extends React.Component {
  state = {
    insumo: [],
  };

  clickInsumo(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "insumo";
    axios.get(url).then((response) => {
      this.setState({
        insumo: response.data,
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
                <th scope="col">NOMBRE</th>
                <th scope="col">STOCK</th>
                <th scope="col">FECHA - VENCIMIENTO</th>
                <th scope="col">FECHA - COMPRA</th>
                <th scope="col">TIPO - INSUMO</th>
                <th scope="col">PRECIO - INSUMO</th>
              </tr>
            </thead>
            <tbody>
              {this.state.insumo.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickInsumo(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.nombreInsumo}</td>
                    <td>{value.stkInsumo}</td>
                    <td>{value.fechaVen}</td>
                    <td>{value.fecCompra}</td>
                    <td>{value.tipoInsumo}</td>
                    <td>{value.precioInsumo}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar Insumo</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisInsumo; 