import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class NuevoFP extends React.Component {
  state = {
    form: {
      insumo: "",
      produccion: "",
      cantidad: "",
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
    .post(Apiurl + "fechaProduccion", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro fechaProduccion correctamente.");
      window.location.href = "/fechaProduccion/VisFecPro";
      // Aquí puedes redireccionar al usuario a otra página después de registrar el empleado
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo registrar fechaProduccion");
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
          <h3>Registrar fechaProduccion</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> INSUMO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="insumo"
                    placeholder="insumo"
                    type="text"
                    value={this.state.form.insumo} 
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> PRODUCCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="produccion"
                    placeholder="produccion"
                    type="text"
                    value={this.state.form.produccion}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> CANTIDAD</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="cantidad"
                    placeholder="cantidad"
                    type="text"
                    value={this.state.form.cantidad}
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

export default NuevoFP;