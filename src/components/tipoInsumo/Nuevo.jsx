import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class tipoInsumoNuevo extends React.Component {
  state = {
    form: {
      descripInsumo: "",
    },
    errorMessage: ""
  };


  handleSubmit = (e) => {
    e.preventDefault();

    const { descripInsumo } = this.state.form;

    if (!descripInsumo) {
      this.setState({
        errorMessage: "El campo descripInsumo no puede estar vacío."
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
      .post(Apiurl + "tipoInsumo", this.state.form, config)
      .then((res) => {
        console.log(res);
        alert("Se registró el tipoInsumo correctamente.");
        window.location.href = "/tipoInsumo/VisTipoIns";
        // You can redirect the user to another page after registering the tipoInsumo
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo registrar el tipoInsumo");
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
    const { descripInsumo } = this.state.form;
    const { errorMessage } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Registrar tipoInsumo</h3>
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
                    name="descripInsumo"
                    placeholder="Tipo Insumo"
                    type="text"
                    value={descripInsumo}
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

            <a className="btn btn-dark" href="/tipoInsumo/VisTipoIns">
              Volver
            </a>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default tipoInsumoNuevo;