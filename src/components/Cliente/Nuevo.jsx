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
    errorMessage: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { nomCli, direCli, telefono, dni } = this.state.form;

    if (!nomCli || !direCli || !telefono || !dni) {
      this.setState({
        errorMessage: "Todos los campos son obligatorios."
      });
      return;
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}` // Replace "token" with your authentication token
      }
    };

    axios
      .post(Apiurl + "cliente", this.state.form, config)
      .then((res) => {
        console.log(res);
        alert("Se registró el cliente correctamente.");
        window.location.href = "/Cliente/VisCliente";
        // You can redirect the user to another page after registering the client
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo registrar el cliente");
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
      errorMessage: ""
    }));
  };

  render() {
    const { nomCli, direCli, telefono, dni } = this.state.form;
    const { errorMessage } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>ℝ𝕖𝕘𝕚𝕤𝕥𝕣𝕒𝕣 ℂ𝕝𝕚𝕖𝕟𝕥𝕖</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">NOMBRE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="nomCli"
                    placeholder="Nombre"
                    type="text"
                    value={nomCli}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">DIRECCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="direCli"
                    placeholder="direccion"
                    type="text"
                    value={direCli}
                    onChange={this.handleChange}
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
                    maxLength={9}
                    minLength={9}
                    placeholder="Telefono"
                    type="text"
                    value={telefono}
                    onChange={this.handleChange}
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
                    maxLength={8}
                    minLength={8}
                    placeholder="Dni"
                    type="text"
                    value={dni}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <br />
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginRight: "10px" }}
            >
              Registrar
            </button>

            <a className="btn btn-dark" href="/Cliente/VisCliente">
              Volver
            </a>

          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ClienteNuevo;