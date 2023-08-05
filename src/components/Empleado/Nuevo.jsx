import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class EmpleadoNuevo extends React.Component {
  state = {
    form: {
      nomEmp: "",
      apellEmp: "",
      email: "",
      password: "",
      direccEmp: "",
      telefono: "",
      tipoEmpleado: "",
    },
    tipoEmpleado: [], // estado para almacenar los tipos de empleado
    errorMessage: "", // estado para almacenar el mensaje de error
  };

  componentDidMount() {
    let url = Apiurl + "tipoEmpleado";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          tipoEmpleado: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { nomEmp, apellEmp, email, password, direccEmp, telefono, tipoEmpleado } = this.state.form;

    if (!nomEmp || !apellEmp || !email || !password || !direccEmp || !telefono || !tipoEmpleado) {
      this.setState({
        errorMessage: "Por favor, complete todos los campos obligatorios."
      });
      return;
    }

    axios
      .post(Apiurl + "empleado", this.state.form)
      .then((res) => {
        console.log(res);
        alert("Se registró el empleado correctamente.");
        window.location.href = "/Empleado/VisEmpleado";
        // Aquí puedes redireccionar al usuario a otra página después de registrar el empleado
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo registrar el empleado.");
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
    const { tipoEmpleado, errorMessage } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Nuevo Empleado</h3>
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
                    name="nomEmp"
                    placeholder="Nombre"
                    type="text"
                    value={this.state.form.nomEmp}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> APELLIDO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="apellEmp"
                    placeholder="Apellidos"
                    type="text"
                    value={this.state.form.apellEmp}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> EMAIL</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="email"
                    placeholder="email"
                    type="text"
                    value={this.state.form.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> CONTRASEÑA</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="password"
                    placeholder="Contraseña"
                    type="password"
                    value={this.state.form.password}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> DIRECCIÓN</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="direccEmp"
                    placeholder="Direccion"
                    type="text"
                    value={this.state.form.direccEmp}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> TELÉFONO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    maxLength={9}
                    minLength={9}
                    name="telefono"
                    placeholder="Telefono"
                    type="text"
                    value={this.state.form.telefono}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="container">
              <br />
              <form className="form-horizontal" onSubmit={this.handleSubmit}>
                {/* Resto del formulario */}
                <div className="row">
                  <div className="col-sm-12">
                    <label className="col-md-2 control-label">TIPO - EMPLEADO</label>
                    <div className="col-md-10">
                      <select
                        className="form-control"
                        name="tipoEmpleado"
                        value={this.state.form.tipoEmpleado}
                        onChange={this.handleChange}
                      >
                        <option value="">Seleccione un Tipo de Empleado</option>
                        {tipoEmpleado.map((tipo) => (
                          <option key={tipo.ID} value={tipo.ID}>
                            {tipo.rol}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                {/* Resto del formulario */}
              </form>
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

            <a className="btn btn-dark" href="/Empleado/VisEmpleado">
              Volver
            </a>

          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EmpleadoNuevo;