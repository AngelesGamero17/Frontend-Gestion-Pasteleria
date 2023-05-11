import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class ProduccionNuevo extends React.Component {
  state = {
    form: {
      empleado: "",
      fechaProduccion: "",
      estado: "",
    },
  };

  handleSubmit = (e) => { const token = localStorage.getItem("token"); 
  e.preventDefault();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`// Reemplace "token" con su token de autenticación
    }
  };
  axios
    .post(Apiurl + "produccion", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro produccion correctamente.");
      window.location.href = "/Produccion/VisProduccion";
      // Aquí puedes redireccionar al usuario a otra página después de registrar el insumo
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo registrar produccion");
    });
};
  manejadorChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  manejadorSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Registrar Produccion</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> EMPLEADO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="empleado"
                    placeholder="empleado"
                    type="text"
                    value={this.state.form.empleado}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> FECHA - PRODUCCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fechaProduccion"
                    placeholder="fechaProduccion"
                    type="text"
                    value={this.state.form.fechaProduccion}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> ESTADO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="estado"
                    placeholder="estado"
                    type="text"
                    value={this.state.form.estado}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <br></br>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginRight: "10px" }}>Registrar</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ProduccionNuevo;