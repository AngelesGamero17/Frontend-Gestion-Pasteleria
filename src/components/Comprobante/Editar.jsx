import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class ComprobanteEditar extends React.Component {
  state = {
    form: {
      empleado: "",
      fechaComp: "",
      cliente: "",
      estadoComp: "",
      detalleComprobante: "",
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
    const urlApi = Apiurl + "comprobante/" + id;
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
    const urlApi = Apiurl + "comprobante/" + id;
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
        alert("El comprobante ha sido eliminado correctamente");
        // Redirigir a la lista de empleados
        window.location.href = "/Comprobante/VisComprobante";
      })
      .catch((error) => {
        console.log(error);
        // Mostrar alerta de error
        alert("Ha ocurrido un error al eliminar el comprobante");
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
      const urlApi = Apiurl + "comprobante/" + id; // Usamos el id en la URL de la API
      axios
        .get(urlApi)
        .then((response) => {
          const comprobante = response.data;
          if (comprobante) {
            this.setState({
              form: {
                empleado: comprobante.empleado,
                fechaComp: comprobante.fechaComp,
                cliente: comprobante.cliente,
                estadoComp: comprobante.estadoComp,
                detalleComprobante: comprobante.detalleComprobante,
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
          <h3>Editar Comprobante</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> EMPLEADO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="empleado"
                    placeholder="empleado"
                    type="text"
                    value={form.empleado}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> FECHA - COMPROBANTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fechaComp"
                    placeholder="fechaComp"
                    type="text"
                    value={form.fechaComp}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> CLIENTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="cliente"
                    placeholder="cliente"
                    type="text"
                    value={form.cliente}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">ESTADO - COMPROBANTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="estadoComp"
                    placeholder="estadoComp"
                    type="text"
                    value={form.estadoComp}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">DETALLE - COMPROBANTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="detalleComprobante"
                    placeholder="detalleComprobante"
                    type="text"
                    value={form.detalleComprobante}
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

            <a className="btn btn-dark" href="/Producto/VisProducto">Salir</a>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ComprobanteEditar;