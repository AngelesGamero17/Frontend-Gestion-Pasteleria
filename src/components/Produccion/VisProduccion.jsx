import React from "react";
import Header from "../../template/Header";
import { Apiurl } from "../../services/apirest";
import axios from "axios";

class VisProduccion extends React.Component {
  state = {
    produccion: [],
  };

  clickProduccion(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let url = Apiurl + "produccion";
    axios.get(url).then((response) => {
      this.setState({
        produccion: response.data,
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
                <th scope="col">FECHA - PRODUCCION</th>
                <th scope="col">ESTADO</th>
              </tr>
            </thead>
            <tbody>
              {this.state.produccion.map((value, index) => {
                return (
                  <tr key={index} onClick={() => this.clickProduccion(value.ID)}>
                    <th scope="row">{value.ID}</th>
                    <td>{value.empleado}</td>
                    <td>{value.fechaProduccion}</td>
                    <td>{value.estado}</td>
                  </tr>
                );
              })}

              <br></br>
              <button type="submit" className="btn btn-success"onClick={() => this.clickAgregar()}>Registrar Produccion</button>

            </tbody>
          </table>
        </div>
      </React.Fragment>
    );
  }
}

export default VisProduccion; 