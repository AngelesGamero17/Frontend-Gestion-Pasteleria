import React from "react";
import Header from "../template/Header";
import { Apiurl } from "../services/apirest";
import axios from "axios";

class Dashboard extends React.Component {
  state = {
    empleados: [],
  };

  clickEmpleado(id) {
    window.location.href = "./editar/" + id;
  }

  componentDidMount() {
    let url = Apiurl + "empleado";
    axios.get(url).then((response) => {
      this.setState({
        empleados: response.data,
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
                <th scope="col">EMAIL</th>
                <th scope="col">DIRECCIÓN</th>
                <th scope="col">TELÉFONO</th>
                <th scope="col">INGRESO</th>
                <th scope="col">TIPO_EMPLEADO</th>
              </tr>
            </thead>
            <tbody>
              {this.state.empleados.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickEmpleado(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.nomEmp}</td>
                    <td>{value.apellEmp}</td>
                    <td>{value.email}</td>
                    <td>{value.direccEmp}</td>
                    <td>{value.telefono}</td>
                    <td>{value.ingreso}</td>
                    <td>{value.tipoEmpleado}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard; 