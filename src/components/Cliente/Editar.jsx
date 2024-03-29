import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class ClienteEditar extends React.Component {
  state = {
    form: {
      nomCli: "",
      direCli: "",
      telefono: "",
      dni: "",
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
    const urlApi = Apiurl + "cliente/" + id;
    const token = localStorage.getItem("token");


    const { telefono } = this.state.form;
    if (telefono.length !== 9) {
      alert("El campo telefono debe tener exactamente 9 caracteres.");
      return;
    }
  
    const { dni } = this.state.form;
    if (dni.length !== 8) {
      alert("El campo DNI debe tener exactamente 8 caracteres.");
      return;
    }

  
    axios
      .put(urlApi, this.state.form, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    const urlApi = Apiurl + "cliente/" + id;
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
        alert("El cliente ha sido eliminado correctamente");
        // Redirigir a la lista de empleados
        window.location.href = "/Cliente/VisCliente";
      })
      .catch((error) => {
        console.log(error);
        // Mostrar alerta de error
        alert("Ha ocurrido un error al eliminar el cliente");
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
      const urlApi = Apiurl + "cliente/" + id; // Usamos el id en la URL de la API
      axios
        .get(urlApi)
        .then((response) => {
          const cliente = response.data;
          if (cliente) {
            this.setState({
              form: {
                nomCli:cliente.nomCli,
                direCli: cliente.direCli,
                telefono: cliente.telefono,
                dni: cliente.dni,
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
          <h3>𝔼𝕕𝕚𝕥𝕒𝕣 ℂ𝕝𝕚𝕖𝕟𝕥𝕖</h3>
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
                    name="nomCli"
                    placeholder="nomCli"
                    type="text"
                    value={form.nomCli}
                    onChange={this.manejadorChange}
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
                    placeholder="direCli"
                    type="text"
                    value={form.direCli}
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
                    maxLength={9}
                    minLength={9}
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
                <label className="col-md-2 control-label">DNI</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    maxLength={8}
                    minLength={8}
                    name="dni"
                    placeholder="dni"
                    type="text"
                    value={form.dni}
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
              onClick={() => this.put()}>Guardar Cambios
              </button>

            <button
              type="submit"
              className="btn btn-danger"
              style={{ marginRight: "10px" }}
              onClick={() => this.delete()}>Eliminar
              </button>

            <a className="btn btn-dark" href="/Cliente/VisCliente">Salir</a>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ClienteEditar;