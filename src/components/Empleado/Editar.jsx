import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class EmpleadoEditar extends React.Component {
  state = {
    form: {
      nomEmp: "",
      apellEmp: "",
      email: "",
      direccEmp: "",
      telefono: "",
      tipoEmpleado: "",
      password: "",
    },
    error: false,
    errorMsg: "",
  };

  manejadorChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  put = () => {
    console.log(this.state);
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    const urlApi = Apiurl + "empleado/" + id;
    const token = localStorage.getItem("token"); // Obtener el token desde localStorage

    axios
      .put(urlApi, this.state.form, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en el header
        },
      })
      .then((response) => {
        console.log(response);
        alert("Los datos han sido actualizados correctamente.");
      })
      .catch((error) => {
        console.log(error);
        alert("Hubo un error al intentar actualizar los datos.");
      });
  };

  
  delete = () => {
    console.log(this.state);
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    const urlApi = Apiurl + "empleado/" + id;
    const token = localStorage.getItem("token");
    axios
      .delete(urlApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // Mostrar alerta de éxito
        alert("El empleado ha sido eliminado correctamente");
        // Redirigir a la lista de empleados
        window.location.href = "/Empleado/VisEmpleado";
      })
      .catch((error) => {
        console.log(error);
        // Mostrar alerta de error
        alert("Ha ocurrido un error al eliminar el empleado");
      });
  };
  

  manejadorSubmit = (e) => {
    e.preventDefault();
  };

  componentDidMount() {
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    if (id) {
      const urlApi = Apiurl + "empleado/" + id; // Usamos el id en la URL de la API
      axios
        .get(urlApi)
        .then((response) => {
          const empleado = response.data;
          if (empleado) {
            this.setState({
              form: {
                nomEmp: empleado.nomEmp,
                apellEmp: empleado.apellEmp,
                email: empleado.email,
                direccEmp: empleado.direccEmp,
                telefono: empleado.telefono,
                tipoEmpleado: empleado.tipoEmpleado,
                password: empleado.password,
                token: localStorage.getItem("token"),
                id: id,
              },
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const form = this.state.form;
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Editar Empleado</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> NOMBRE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="nomEmp"
                    placeholder="nomEmp"
                    type="text"
                    value={form.nomEmp}
                    onChange={this.manejadorChange}
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
                    placeholder="apellEmp"
                    type="text"
                    value={form.apellEmp}
                    onChange={this.manejadorChange}
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
                    value={form.email}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">CONTRASEÑA</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="password"
                    placeholder="password"
                    type="password"
                    value={form.password}
                    onChange={this.manejadorChange}
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
                    placeholder="direccEmp"
                    type="text"
                    value={form.direccEmp}
                    onChange={this.manejadorChange}
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
                    name="telefono"
                    placeholder="telefono"
                    type="text"
                    value={form.telefono}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">TIPO DE EMPLEADO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="tipoEmpleado"
                    placeholder="tipoEmpleado"
                    type="text"
                    value={form.tipoEmpleado}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>
            <br></br>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "10px" }}
              onClick={() => this.put()}>Editar
              </button>

            <button
              type="submit"
              className="btn btn-danger"
              style={{ marginRight: "10px" }}
              onClick={() => this.delete()}>Eliminar
              </button>

            <a className="btn btn-dark" href="/Empleado/VisEmpleado">Salir</a>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default EmpleadoEditar;