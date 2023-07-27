import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class tipoProductoNuevo extends React.Component {
  state = {
    form: {
      descripProducto: "",
    },
    errorMessage: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { descripProducto } = this.state.form;

    if (!descripProducto) {
      this.setState({
        errorMessage: "El campo descripProducto no puede estar vacío."
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
      .post(Apiurl + "tipoProducto", this.state.form, config)
      .then((res) => {
        console.log(res);
        alert("Se registró el tipoProducto correctamente.");
        window.location.href = "/tipoProducto/VisTipoPro";
        // You can redirect the user to another page after registering the tipoProducto
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo registrar el tipoProducto");
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
    const { descripProducto } = this.state.form;
    const { errorMessage } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Registrar tipoProducto</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">DESCRIPCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="descripProducto"
                    placeholder="descripProducto"
                    type="text"
                    value={descripProducto}
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

            <a className="btn btn-dark" href="/tipoProducto/VisTipoPro">
              Volver
            </a>

          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default tipoProductoNuevo;