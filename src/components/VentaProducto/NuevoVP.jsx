import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class NuevoVP extends React.Component {
  state = {
    form: {
      idCliente: "",
      idEmpleado: "",
      descripcion: "",
      precioTotal: "",
      fechaVenta: "",
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
    .post(Apiurl + "ventaProducto", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro ventaProducto correctamente.");
      window.location.href = "/VentaProducto/VisVentPro"; 
      // Aquí puedes redireccionar al usuario a otra página después de registrar el insumo
    })
    .catch((error) => {
      console.log(error); 
      alert("No se pudo registrar ventaProducto");
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
          <h3>Registrar ventaProducto</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">CLIENTE</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="idCliente"
                    placeholder="idCliente"
                    type="text"
                    value={this.state.form.idCliente}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">EMPLEADO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="idEmpleado"
                    placeholder="idEmpleado"
                    type="text"
                    value={this.state.form.idEmpleado}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> DESCRIPCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="descripcion"
                    placeholder="descripcion"
                    type="text"
                    value={this.state.form.descripcion}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> PRECIO - TOTAL</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="precioTotal"
                    placeholder="precioTotal"
                    type="text"
                    value={this.state.form.precioTotal}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">FECHA - VENTA</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fechaVenta"
                    placeholder="fechaVenta"
                    type="text"
                    value={this.state.form.fechaVenta}
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

export default NuevoVP;