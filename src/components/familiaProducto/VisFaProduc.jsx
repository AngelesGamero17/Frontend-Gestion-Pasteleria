import React from "react";
import Header from "../../template/Header";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import VisFecPro from "../fechaProduccion/VisFecPro";

class VisFaProduc extends React.Component {
  state = {
    familiaProducto: [],
  };

  clickfamiliaProducto(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "familiaProducto";
    axios.get(url).then((response) => {
      this.setState({
        familiaProducto: response.data,
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
                <th scope="col">DESCRIPCION</th>
              </tr>
            </thead>
            <tbody>
              {this.state.familiaProducto.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickfamiliaProducto(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.descripcion}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar familiaProducto</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisFaProduc; 