import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import Header from "../../template/Header";

class InsumoNuevo extends React.Component {
  state = {
    form: {
      nombreInsumo: "",
      cantidadInsumo: "",
      fecCompra: "",
      tipoInsumo: "",
      precioInsumo: "",
      img: ""
    },
    tiposInsumo: [] // Estado para almacenar los tipos de insumo
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
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {

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
                    placeholder="nombreInsumo"
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
                    placeholder="cantidadInsumo"
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
                    placeholder="fecCompra"
                    type="date"
                    value={this.state.form.fecCompra}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            {/* Resto del formulario */}
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
                    <option value="">Seleccione un tipo de insumo</option>
                    {this.state.tiposInsumo.map((tipo) => (
                      <option key={tipo.ID} value={tipo.ID}>
                        {tipo.descripInsumo}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {/* Resto del formulario */}
          </form>
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

            <br></br>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginRight: "10px" }}
            >
              Registrar
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default InsumoNuevo;