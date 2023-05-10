import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class ProductoEditar extends React.Component {
  state = {
    form: {
      descripPro: "",
      precio: "",
      stock: "",
      familiaProducto: "",
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
    const urlApi = Apiurl + "producto/" + id;
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
    const urlApi = Apiurl + "producto/" + id;
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
        window.location.href = "/Producto/VisProducto";
      })
      .catch((error) => {
        console.log(error);
        // Mostrar alerta de error
        alert("Ha ocurrido un error al eliminar el producto");
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
      const urlApi = Apiurl + "producto/" + id; // Usamos el id en la URL de la API
      axios
        .get(urlApi)
        .then((response) => {
          const producto = response.data;
          if (producto) {
            this.setState({
              form: {
                descripPro: producto.descripPro,
                precio: producto.precio,
                stock: producto.stock,
                familiaProducto: producto.familiaProducto,
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
          <h3>Editar Producto</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.manejadorSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> DESCRIPCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="descripPro"
                    placeholder="descripPro"
                    type="text"
                    value={form.descripPro}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> PRECIO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="precio"
                    placeholder="precio"
                    type="text"
                    value={form.precio}
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
                    name="stock"
                    placeholder="stock"
                    type="text"
                    value={form.stock}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">FAMILIA-PRODUCTO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="familiaProducto"
                    placeholder="familiaProducto"
                    type="text"
                    value={form.familiaProducto}
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

export default ProductoEditar;