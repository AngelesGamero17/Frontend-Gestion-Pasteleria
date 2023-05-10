import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class InsumoEditar extends React.Component {
  state = {
    form: {
      nombreInsumo: "",
      stkInsumo: "",
      fechaVen: "",
      fecCompra: "",
      tipoInsumo: "",
      precioInsumo: "",

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
    const urlApi = Apiurl + "insumo/" + id;
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
    const urlApi = Apiurl + "insumo/" + id;
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
        alert("El insumo ha sido eliminado correctamente");
        // Redirigir a la lista de insumo
        window.location.href = "/Insumo/VisInsumo";
      })
      .catch((error) => {
        console.log(error);
        // Mostrar alerta de error
        alert("Ha ocurrido un error al eliminar el insumo");
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
      const urlApi = Apiurl + "insumo/" + id; // Usamos el id en la URL de la API
      axios
        .get(urlApi)
        .then((response) => {
          const insumo = response.data;
          if (insumo) {
            this.setState({
              form: {
                nombreInsumo: insumo.nombreInsumo,
                stkInsumo: insumo.stkInsumo,
                fechaVen: insumo.fechaVen,
                fecCompra: insumo.fecCompra,
                tipoInsumo: insumo.tipoInsumo,
                precioInsumo: insumo.precioInsumo,
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
          <h3>Editar Insumo</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">NOMBRE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="nombreInsumo"
                    placeholder="nombreInsumo"
                    type="text"
                    value={form.nombreInsumo}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> STOCK</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="stkInsumo"
                    placeholder="stkInsumo"
                    type="text"
                    value={form.stkInsumo}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> FECHA - VENCIMIENTO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fechaVen"
                    placeholder="fechaVen"
                    type="text"
                    value={form.fechaVen}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">FECHA - COMPRA</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fecCompra"
                    placeholder="fecCompra"
                    type="text"
                    value={form.fecCompra}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">TIPO -INSUMO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="tipoInsumo"
                    placeholder="tipoInsumo"
                    type="text"
                    value={form.tipoInsumo}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">PRECIO - INSUMO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="precioInsumo"
                    placeholder="precioInsumo"
                    type="text"
                    value={form.precioInsumo}
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

            <a className="btn btn-dark" href="/Insumo/VisInsumo">Salir</a>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default InsumoEditar;