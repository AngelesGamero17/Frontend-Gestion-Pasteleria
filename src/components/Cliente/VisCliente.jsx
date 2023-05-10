import React from "react";
import Header from "../../template/Header";
import { Apiurl } from "../../services/apirest";
import axios from "axios";

class VisCliente extends React.Component {
  state = {
    clientes: [],
  };

  clickCliente(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "cliente";
    axios.get(url).then((response) => {
      this.setState({
        clientes: response.data,
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
                <th scope="col">APELLIDO</th>
                <th scope="col">DIRECCION</th>
                <th scope="col">TELEFONO</th>
                <th scope="col">EMAIL</th>
                <th scope="col">DNI</th>

              </tr>
            </thead>
            <tbody>
              {this.state.clientes.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickCliente(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.nomCli}</td>
                    <td>{value.apellCli}</td>
                    <td>{value.direCli}</td>
                    <td>{value.telefono}</td>
                    <td>{value.Email}</td>
                    <td>{value.dni}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar cliente</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisCliente; 