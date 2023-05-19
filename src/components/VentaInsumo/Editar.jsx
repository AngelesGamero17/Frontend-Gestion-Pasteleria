import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class VentInsEditar extends React.Component {
  state = {
    form: {
      idCliente: "",
      idEmpleado: "",
      descripcion: "",
      precioTotal: "",
      fechaVenta: "",
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
    const urlApi = Apiurl + "ventaInsumo/" + id;
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
    const urlApi = Apiurl + "ventaInsumo/" + id;
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
        alert("El ventaInsumo ha sido eliminado correctamente");
        // Redirigir a la lista de insumo
        window.location.href = "/VentaInsumo/VisVentIns";
      })
      .catch((error) => {
        console.log(error);
        // Mostrar alerta de error
        alert("Ha ocurrido un error al eliminar el ventaInsumo");
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
      const urlApi = Apiurl + "ventaInsumo/" + id; // Usamos el id en la URL de la API
      axios
        .get(urlApi)
        .then((response) => {
          const ventaInsumo = response.data;
          if (ventaInsumo) {
            this.setState({
              form: {
                idCliente: ventaInsumo.idCliente,
                idEmpleado: ventaInsumo.idEmpleado,
                descripcion: ventaInsumo.descripcion,
                precioTotal: ventaInsumo.precioTotal,
                fechaVenta: ventaInsumo.fechaVenta,
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
          <h3>Editar ventaInsumo</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">CLIENTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="idCliente"
                    placeholder="idCliente"
                    type="text"
                    value={form.idCliente}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">EMPLEADO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="idEmpleado"
                    placeholder="idEmpleado"
                    type="text"
                    value={form.idEmpleado}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">DESCRIPCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="descripcion"
                    placeholder="descripcion"
                    type="text"
                    value={form.descripcion}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">PRECIO - TOTAL</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="precioTotal"
                    placeholder="precioTotal"
                    type="text"
                    value={form.precioTotal}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">FECHA - VENTA</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fechaVenta"
                    placeholder="fechaVenta"
                    type="text"
                    value={form.fechaVenta}
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

            <a className="btn btn-dark" href="/VentaInsumo/VisVentIns">Salir</a>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default VentInsEditar;