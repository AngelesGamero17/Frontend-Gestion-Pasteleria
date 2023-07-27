import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class tipoEmpleadoNuevo extends React.Component {
  state = {
    form: {
      rol: "",
    },
    errorMessage: ""
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { rol } = this.state.form;

    if (!rol) {
      this.setState({
        errorMessage: "El campo rol no puede estar vacío."
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
      .post(Apiurl + "tipoEmpleado", this.state.form, config)
      .then((res) => {
        console.log(res);
        alert("Se registró el tipoEmpleado correctamente.");
        window.location.href = "/tipoEmpleado/VisTipoEmp";
        // You can redirect the user to another page after registering the tipoEmpleado
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo registrar el tipoEmpleado");
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
    const { rol } = this.state.form;
    const { errorMessage } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Registrar tipoEmpleado</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">ROL</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="rol"
                    placeholder="rol"
                    type="text"
                    value={rol}
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

            <a className="btn btn-dark" href="/tipoEmpleado/VisTipoEmp">
              Volver
            </a>


          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default tipoEmpleadoNuevo;