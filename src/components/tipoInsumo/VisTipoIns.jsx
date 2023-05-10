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