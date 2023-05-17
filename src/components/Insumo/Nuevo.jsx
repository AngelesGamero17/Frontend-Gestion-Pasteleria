import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class InsumoNuevo extends React.Component {
  state = {
    form: {
      nombreInsumo: "",
      cantidadInsumo: "",
      fecCompra: "",
      tipoInsumo: "",
      precioInsumo: "",
    },
  };

  handleSubmit = (e) => { const token = localStorage.getItem("token"); 
  e.preventDefault();
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`// Reemplace "token" con su token de autenticación
    }
  };
  axios
    .post(Apiurl + "insumo", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro insumo correctamente.");
      window.location.href = "/Insumo/VisInsumo";
      // Aquí puedes redireccionar al usuario a otra página después de registrar el insumo
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo registrar insumo");
    });
};
  manejadorChange = async (e) => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };
  manejadorSubmit = (e) => {
    e.preventDefault();
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
                <label className="col-md-2 control-label"> NOMBRE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="nombreInsumo"
                    placeholder="nombreInsumo"
                    type="text"
                    value={this.state.form.nombreInsumo}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">CANTIDAD -INSUMO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="cantidadInsumo"
                    placeholder="cantidadInsumo"
                    type="text"
                    value={this.state.form.cantidadInsumo}
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
                    value={this.state.form.fecCompra}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">TIPO - INSUMO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="tipoInsumo"
                    placeholder="tipoInsumo"
                    type="text"
                    value={this.state.form.tipoInsumo}
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
                    value={this.state.form.precioInsumo}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <br></br>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginRight: "10px" }}>Registrar</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default InsumoNuevo;