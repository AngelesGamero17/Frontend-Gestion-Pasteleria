import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import Header from "../../template/Header";

class EditarImg extends React.Component {
  state = {
    form: {
      imgIns: "",
      imgPro: "",
      imgProProduc: "",
      imgProIns: "",
      imgLogin: ""
    },
    error: false,
    errorMsg: ""
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value
      }
    }));
  };

  handleSave = () => {
    const { form } = this.state;
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    const urlApi = Apiurl + "imagen/" + id;
    const token = localStorage.getItem("token");

    axios
      .put(urlApi, form, {
        headers: {
          Authorization: `Bearer ${token}`
        }
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

  handleDelete = () => {
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    const urlApi = Apiurl + "imagen/" + id;
    const token = localStorage.getItem("token");
    axios
      .delete(urlApi, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response);
        alert("La imagen ha sido eliminada correctamente");
        window.location.href = "/imagen/VisImg";
      })
      .catch((error) => {
        console.log(error);
        alert("Ha ocurrido un error al eliminar la imagen");
      });
  };

  componentDidMount() {
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    if (id) {
      const urlApi = Apiurl + "imagen/" + id;
      axios
        .get(urlApi)
        .then((response) => {
          const imagen = response.data;
          if (imagen) {
            this.setState((prevState) => ({
              form: {
                ...prevState.form,
                imgIns: imagen.imgIns,
                imgPro: imagen.imgPro,
                imgProProduc: imagen.imgProProduc,
                imgProIns: imagen.imgProIns,
                imgLogin: imagen.imgLogin
              }
            }));
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  render() {
    const { form } = this.state;
    return (
      <>
        <Header />
        <div className="container">
          <h3>Editar Imagen</h3>
        </div>

        <br />

        <div className="container">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-4">
                <h5>IMAGEN INSUMO</h5>
                <div className="image-container">
                  <img
                    className="img-fluid"
                    name="imgIns"
                    alt=""
                    src={form.imgIns}
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
                <input
                  className="form-control"
                  name="imgIns"
                  placeholder="URL de la imagen"
                  type="text"
                  value={form.imgIns}
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-sm-4">
                <h5>IMAGEN PRODUCTO</h5>
                <div className="image-container">
                  <img
                    className="img-fluid"
                    name="imgPro"
                    alt=""
                    src={form.imgPro}
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
                <input
                  className="form-control"
                  name="imgPro"
                  placeholder="URL de la imagen"
                  type="text"
                  value={form.imgPro}
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-sm-4">
                <h5>IMAGEN PROFORMA INSUMO</h5>
                <div className="image-container">
                  <img
                    className="img-fluid"
                    name="imgProIns"
                    alt=""
                    src={form.imgProIns}
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
                <input
                  className="form-control"
                  name="imgProIns"
                  placeholder="URL de la imagen"
                  type="text"
                  value={form.imgProIns}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <br />

            <div className="row">
              <h5>IMAGEN PROFORMA PRODUCTO</h5>
              <div className="col-sm-6">
                <div className="image-container">
                  <img
                    className="img-fluid"
                    name="imgProProduc"
                    alt=""
                    src={form.imgProProduc}
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
                <input
                  className="form-control"
                  name="imgProProduc"
                  placeholder="URL de la imagen"
                  type="text"
                  value={form.imgProProduc}
                  onChange={this.handleChange}
                />
              </div>

              <div className="col-sm-6">
                <h5>IMAGEN LOGIN</h5>
                <div className="image-container">
                  <img
                    className="img-fluid"
                    name="imgLogin"
                    alt=""
                    src={form.imgLogin}
                    style={{ width: "300px", height: "300px" }}
                  />
                </div>
                <input
                  className="form-control"
                  name="imgLogin"
                  placeholder="URL de la imagen"
                  type="text"
                  value={form.imgLogin}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <br />

            <div className="row">
              <div className="col-sm-12 text-center">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ marginRight: "10px" }}
                  onClick={this.handleSave}
                >
                  Guardar Cambios
                </button>

            {/* <button
              type="button"
              className="btn btn-danger"
              style={{ marginRight: "10px" }}
              onClick={this.handleDelete}
            >
              Eliminar
            </button>
 */}
                <a className="btn btn-dark" href="/imagen/VisImg">
                  Salir
                </a>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default EditarImg;