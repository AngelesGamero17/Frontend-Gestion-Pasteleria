import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class InsumoEditar extends React.Component {
  state = {
    form: {
      id: "", // Agrega el campo "id" al formulario
      nombreInsumo: "",
      cantidadInsumo: "",
      fecCompra: "",
      tipoInsumo: "",
      precioInsumo: "",
      img: "",
    },
    tiposInsumo: [],
    error: false,
    errorMsg: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.put();
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

  componentDidMount() {
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    if (id) {
      const urlApi = Apiurl + "insumo/" + id;
      const token = localStorage.getItem("token");
      axios
        .get(urlApi, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          const insumo = response.data;
          if (insumo) {
            this.setState({
              form: {
                nombreInsumo: insumo.nombreInsumo,
                cantidadInsumo: insumo.cantidadInsumo,
                fecCompra: insumo.fecCompra,
                tipoInsumo: insumo.tipoInsumo,
                precioInsumo: insumo.precioInsumo,
                img: insumo.img,
              },
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    
    
    
    const urlTiposInsumo = Apiurl + "tipoInsumo";
    axios
      .get(urlTiposInsumo)
      .then((response) => {
        const tiposInsumo = response.data;
        this.setState({ tiposInsumo });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { form, tiposInsumo } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Editar Insumo</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
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
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">
                  CANTIDAD - INSUMO
                </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="cantidadInsumo"
                    placeholder="cantidadInsumo"
                    type="text"
                    value={form.cantidadInsumo}
                    onChange={this.handleChange}
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
                    type="date"
                    value={form.fecCompra}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">TIPO - INSUMO</label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    name="tipoInsumo"
                    value={form.tipoInsumo}
                    onChange={this.handleChange}
                  >
                    <option value="">Seleccione un tipo de insumo</option>
                    {tiposInsumo.map((tipo) => (
                      <option key={tipo.ID} value={tipo.ID}>
                        {tipo.descripInsumo}
                      </option>
                    ))}
                  </select>
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
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">IMG</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="img"
                    placeholder="img"
                    type="text"
                    value={form.img}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <div className="col-md-offset-2 col-md-10">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginRight: "10px" }}
                  >
                    Guardar Cambios
                  </button>

                  <button
                    type="button"
                    className="btn btn-default"
                    onClick={() => {
                      window.location.href = "/Insumo/VisInsumo";
                    }}
                  >
                    Salir
                  </button>

                  <button
              type="submit"
              className="btn btn-danger"
              style={{ marginRight: "10px" }}
              onClick={() => this.delete()}>Eliminar
              </button>
              
                </div>
              </div>
            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default InsumoEditar;
