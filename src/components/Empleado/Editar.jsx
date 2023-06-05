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
    tipoEmpleado:[],
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


  manejadorSubmit = (e) => {
    e.preventDefault();
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
  

  componentDidMount() {
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    if (id) {
      const urlApi = Apiurl + "empleado/" + id; // Usamos el id en la URL de la API
      const token = localStorage.getItem("token");
      axios
        .get(urlApi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
              },
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }


  const urlTipoEmpleado = Apiurl + "tipoEmpleado";
  axios
    .get(urlTipoEmpleado)
    .then((response) => {
      const tipoEmpleado = response.data;
      this.setState({ tipoEmpleado });
    })
    .catch((error) => {
      console.error(error);
    });
}


  render() {
    const { form, tipoEmpleado } = this.state;
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
                <label className="col-md-2 control-label">TIPO - EMPLEADO</label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    name="tipoEmpleado"
                    value={form.tipoEmpleado}
                    onChange={this.handleChange}
                  >
                    <option value="">Seleccione un tipo de empleado</option>
                    {tipoEmpleado.map((tipo) => (
                      <option key={tipo.ID} value={tipo.ID}>
                        {tipo.rol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <br></br>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "10px" }}
              onClick={() => this.put()}>Guardar Cambios
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