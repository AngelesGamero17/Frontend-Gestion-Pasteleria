import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import moment from "moment";
import Header from "../../template/Header";

class InsumoNuevo extends React.Component {
  state = {
    form: {
      nombreInsumo: "",
      cantidadInsumo: "",
      fecCompra: moment().format("YYYY-MM-DD"),
      fecVen: "",
      tipoInsumo: "",
      precioInsumo: "",
      img: ""
    },
    imgPreview: "",
    tiposInsumo: [], // Estado para almacenar los tipos de insumo
    errorMessage: "" // Estado para almacenar el mensaje de error
  };

  componentDidMount() {
    let url = Apiurl + "tipoInsumo";
    axios.get(url)
      .then((response) => {
        this.setState({
          tiposInsumo: response.data
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { nombreInsumo, cantidadInsumo, fecCompra,fecVen, tipoInsumo, precioInsumo } = this.state.form;

    if (!nombreInsumo || !cantidadInsumo || !fecCompra || !fecCompra ||!tipoInsumo || !precioInsumo) {
      this.setState({
        errorMessage: "Por favor, complete todos los campos obligatorios."
      });
      return;
    }

    const token = localStorage.getItem("token");
    const config = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };

    axios
      .post(Apiurl + "insumo", this.state.form, config)
      .then((res) => {
        console.log(res);
        alert("Se registró el insumo correctamente.");
        window.location.href = "/Insumo/VisInsumo";
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo registrar el insumo");
      });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "img") {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
        imgPreview: value,
      });
    } else {
      this.setState({
        form: {
          ...this.state.form,
          [name]: value,
        },
      });
    }
  };
  
  render() {
    const { tiposInsumo,imgPreview, errorMessage } = this.state;

    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Registrar Insumo</h3>
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
                    placeholder="Nombre"
                    type="text"
                    value={this.state.form.nombreInsumo}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">CANTIDAD - INSUMO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="cantidadInsumo"
                    placeholder="Cantidad"
                    type="text"
                    value={this.state.form.cantidadInsumo}
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
                    placeholder="Fecha Compra"
                    type="date"
                    value={this.state.form.fecCompra}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">FECHA - VENCIMIENTO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fecVen"
                    placeholder="Fecha Vencimiento"
                    type="date"
                    value={this.state.form.fecVen}
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
                    value={this.state.form.tipoInsumo}
                    onChange={this.handleChange}
                  >
                    <option value="">Seleccione un Tipo de Insumo</option>
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
                    placeholder="Precio"
                    type="text"
                    value={this.state.form.precioInsumo}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">IMG</label>
                <div className="col-md-10">
                  {imgPreview && (
                    <img
                      className="form-control"
                      alt="Preview"
                      src={imgPreview}
                      style={{ width: "300px" }}
                    />
                  )}
                  <input
                    className="form-control"
                    name="img"
                    placeholder="img"
                    type="text"
                    value={this.state.form.img}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <br />
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginRight: "10px" }}
            >
              Registrar
            </button>


            <a className="btn btn-dark" href="/Insumo/VisInsumo">
              Volver
            </a>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default InsumoNuevo;