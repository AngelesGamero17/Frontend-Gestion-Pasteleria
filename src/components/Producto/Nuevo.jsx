import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import moment from "moment";
import Header from "../../template/Header";

class ProductoNuevo extends React.Component {
  state = {
    form: {
      nombre: "",
      cantidad: "",
      precio: "",
      fechaProduccion: moment().format("YYYY-MM-DD"),
      tipoProducto: "",
      img: ""
    },
    tiposProducto: [],
    imgPreview: "",
    errorMessage: "" // Estado para almacenar el mensaje de error
  };

  componentDidMount() {
    let url = Apiurl + "tipoProducto";
    axios
      .get(url)
      .then((response) => {
        this.setState({
          tiposProducto: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, cantidad, precio, fechaProduccion, tipoProducto } =
      this.state.form;

    // Validar si todos los campos requeridos están completos
    if (!nombre || !cantidad || !precio || !fechaProduccion || !tipoProducto) {
      this.setState({
        errorMessage: "Por favor, complete todos los campos obligatorios."
      });
      return;
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };

    axios
      .post(Apiurl + "producto", this.state.form, config)
      .then((res) => {
        console.log(res);
        alert("Se registró el producto correctamente.");
        window.location.href = "/Producto/VisProducto";
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo registrar el producto");
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "img") {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value
        },
        imgPreview: value
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value
        }
      });
    }
  };

  render() {
    const { form, imgPreview, errorMessage } = this.state;

    return (
      <React.Fragment>
        <Header />

        <div className="container">
          <h3>Registrar Producto</h3>
        </div>
        <div className="container product-form">
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre" className="control-label">NOMBRE</label>
              <input
                className="form-control"
                id="nombre"
                name="nombre"
                placeholder="Nombre"
                type="text"
                value={form.nombre}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="cantidad" className="control-label">CANTIDAD</label>
              <input
                className="form-control"
                id="cantidad"
                name="cantidad"
                placeholder="Cantidad"
                type="text"
                value={form.cantidad}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="precio" className="control-label">PRECIO</label>
              <input
                className="form-control"
                id="precio"
                name="precio"
                placeholder="Precio"
                type="number"
                value={form.precio}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fechaProduccion" className="control-label">FECHA - PRODUCCION</label>
              <input
                className="form-control"
                id="fechaProduccion"
                name="fechaProduccion"
                placeholder="Fecha de Producción"
                type="date"
                value={form.fechaProduccion}
                onChange={this.handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="tipoProducto" className="control-label">TIPO - PRODUCTO</label>
              <select
                className="form-control"
                id="tipoProducto"
                name="tipoProducto"
                value={form.tipoProducto}
                onChange={this.handleChange}
              >
                <option value="">Seleccione un tipo de producto</option>
                {this.state.tiposProducto.map((tipo) => (
                  <option key={tipo.ID} value={tipo.ID}>
                    {tipo.descripProducto}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="img" className="control-label">IMG</label>
              {imgPreview && (
                <img
                  className="form-control img-preview"
                  alt="Vista previa"
                  src={imgPreview}
                />
              )}
              <input
                className="form-control"
                id="img"
                name="img"
                placeholder="URL de la imagen"
                type="text"
                value={form.img}
                onChange={this.handleChange}
              />
            </div>

            {errorMessage && (
              <p className="error-message">{errorMessage}</p>
            )}

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-success"
              >
                Registrar
              </button>

              <a className="btn btn-dark" href="/Producto/VisProducto">
              Volver
            </a>

            </div>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductoNuevo;
