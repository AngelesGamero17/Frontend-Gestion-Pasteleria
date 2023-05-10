import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class tipoEmpleadoEditar extends React.Component {
  state = {
    form: {
      rol: "",
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
    const urlApi = Apiurl + "tipoEmpleado/" + id;
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
    const urlApi = Apiurl + "tipoEmpleado/" + id;
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
        alert("El tipoEmpleado ha sido eliminado correctamente");
        // Redirigir a la lista de empleados
        window.location.href = "/tipoEmpleado/VisTipoEmp";
      })
      .catch((error) => {
        console.log(error);
        // Mostrar alerta de error
        alert("Ha ocurrido un error al eliminar el tipoEmpleado");
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
      const urlApi = Apiurl + "tipoEmpleado/" + id; // Usamos el id en la URL de la API
      axios
        .get(urlApi)
        .then((response) => {
          const tipoEmpleado = response.data;
          if (tipoEmpleado) {
            this.setState({
              form: {
                rol:tipoEmpleado.rol,
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
          <h3>Editar tipoEmpleado</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> ROL</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="rol"
                    placeholder="rol"
                    type="text"
                    value={form.rol}
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

            <a className="btn btn-dark" href="/tipoEmpleado/VisTipoEmp">Salir</a>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default tipoEmpleadoEditar;