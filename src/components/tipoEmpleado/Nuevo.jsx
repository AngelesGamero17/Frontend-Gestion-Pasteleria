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
  };

  handleSubmit = (e) => { const token = localStorage.getItem("token"); 
  e.preventDefault();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`// Reemplace "token" con su token de autenticación
    }
  };
  axios
    .post(Apiurl + "tipoEmpleado", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro tipoEmpleado correctamente.");
      window.location.href = "/tipoEmpleado/VisTipoEmp";
      // Aquí puedes redireccionar al usuario a otra página después de registrar el tipoEmpleado
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo registrar tipoEmpleado");
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
          <h3>Registrar tipoEmpleado</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> ROL</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="rol"
                    placeholder="rol"
                    type="text"
                    value={this.state.form.rol}
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

export default tipoEmpleadoNuevo;