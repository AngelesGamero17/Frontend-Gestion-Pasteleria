import React from "react";
import Header from "../../template/Header";
import { Apiurl } from "../../services/apirest";
import axios from "axios";

class VisTipoEmp extends React.Component {
  state = {
    tipoEmp: [],
  };

  clickTipoEmpleado(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "tipoEmpleado";
    axios.get(url).then((response) => {
      this.setState({
        tipoEmp: response.data,
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
                <th scope="col">ROL</th>
              </tr>
            </thead>
            <tbody>
              {this.state.tipoEmp.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickTipoEmpleado(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.rol}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar tipoEmpleado</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisTipoEmp; 