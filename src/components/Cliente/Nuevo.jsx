import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class ClienteNuevo extends React.Component {
  state = {
    form: {
      nomCli: "",
      direCli: "",
      telefono: "",
      dni: "",
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
    .post(Apiurl + "cliente", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro cliente correctamente.");
      window.location.href = "/Cliente/VisCliente";
      // Aquí puedes redireccionar al usuario a otra página después de registrar el cliente
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo registrar cliente");
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
          <h3>Registrar Cliente</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> NOMBRE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="nomCli"
                    placeholder="nomCli"
                    type="text"
                    value={this.state.form.nomCli}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> DIRECCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="direCli"
                    placeholder="direCli"
                    type="text"
                    value={this.state.form.direCli}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">TELEFONO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="telefono"
                    placeholder="telefono"
                    type="text"
                    value={this.state.form.telefono}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>
            

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">DNI</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="dni"
                    placeholder="dni"
                    type="text"
                    value={this.state.form.dni}
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

export default ClienteNuevo;