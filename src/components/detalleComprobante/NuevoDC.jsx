import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class NuevoDC extends React.Component {
  state = {
    form: {
      producto: "",
      fechaProduccion: "",
      estado: "",
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
    .post(Apiurl + "detalleComprobante", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro detalleComprobante correctamente.");
      window.location.href = "/detalleComprobante/VisDetaComp"; 
      // Aquí puedes redireccionar al usuario a otra página después de registrar el insumo
    })
    .catch((error) => {
      console.log(error); 
      alert("No se pudo registrar detalleComprobante");
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
          <h3>Registrar detalleComprobante</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> PRODUCTO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="producto"
                    placeholder="producto"
                    type="text"
                    value={this.state.form.producto}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> FECHA - PRODUCCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fechaProduccion"
                    placeholder="fechaProduccion"
                    type="text"
                    value={this.state.form.fechaProduccion}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> ESTADO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="estado"
                    placeholder="estado"
                    type="text"
                    value={this.state.form.estado}
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

export default NuevoDC;