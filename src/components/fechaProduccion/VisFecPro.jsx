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
        <Header></Header>
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