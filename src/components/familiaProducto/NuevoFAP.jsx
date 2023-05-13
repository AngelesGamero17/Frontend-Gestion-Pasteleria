import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class NuevoFAP extends React.Component {
  state = {
    form: {
      descripcion: "",
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
    .post(Apiurl + "familiaProducto", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro familiaProducto correctamente.");
      window.location.href = "/familiaProducto/VisFaProduc";
      // Aquí puedes redireccionar al usuario a otra página después de registrar el insumo
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo registrar familiaProducto");
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
          <h3>Registrar familiaProducto</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
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

export default NuevoFAP;