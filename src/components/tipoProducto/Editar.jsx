import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class tipoProductoEditar extends React.Component {
  state = {
    form: {
        descripProducto: "",
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
    const urlApi = Apiurl + "tipoProducto/" + id;
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
    const urlApi = Apiurl + "tipoProducto/" + id;
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
        alert("El tipoProducto ha sido eliminado correctamente");
        // Redirigir a la lista de empleados
        window.location.href = "/tipoProducto/VisTipoPro";
      })
      .catch((error) => {
        console.log(error);
        // Mostrar alerta de error
        alert("Ha ocurrido un error al eliminar el tipoProducto");
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
      const urlApi = Apiurl + "tipoProducto/" + id; // Usamos el id en la URL de la API
      axios
        .get(urlApi)
        .then((response) => {
          const tipoProducto = response.data;
          if (tipoProducto) {
            this.setState({
              form: {
                descripProducto:tipoProducto.descripProducto,
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
          <h3>Editar tipo tipoProducto</h3>
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
                    name="descripProducto"
                    placeholder="descripProducto"
                    type="text"
                    value={form.descripProducto}
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

            <a className="btn btn-dark" href="/tipoProducto/VisTipoPro">Salir</a>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default tipoProductoEditar;