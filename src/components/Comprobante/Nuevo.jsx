import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class ComprobanteNuevo extends React.Component {
  state = {
    form: {
      empleado: "",
      fechaComp: "",
      cliente: "",
      estadoComp: "",
      detalleComprobante: "",
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
    .post(Apiurl + "comprobante", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro preoducto correctamente.");
      window.location.href = "/Comprobante/VisComprobante";
      // Aquí puedes redireccionar al usuario a otra página después de registrar el empleado
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo registrar comprobante");
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
          <h3>Registrar Comprobante</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">EMPLEADO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="empleado"
                    placeholder="empleado"
                    type="text"
                    value={this.state.form.empleado}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> FECHA - COMPROBANTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fechaComp"
                    placeholder="fechaComp"
                    type="text"
                    value={this.state.form.fechaComp}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">CLIENTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="cliente"
                    placeholder="cliente"
                    type="text"
                    value={this.state.form.cliente}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">ESTADO - COMPROBANTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="estadoComp"
                    placeholder="estadoComp"
                    type="text"
                    value={this.state.form.estadoComp}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">DETALLE - COMPROBANTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="detalleComprobante"
                    placeholder="detalleComprobante"
                    type="text"
                    value={this.state.form.detalleComprobante}
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

export default ComprobanteNuevo;