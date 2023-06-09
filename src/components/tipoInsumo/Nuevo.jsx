import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class tipoInsumoNuevo extends React.Component {
  state = {
    form: {
        descripInsumo: "",
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
    .post(Apiurl + "tipoInsumo", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro tipoInsumo correctamente.");
      window.location.href = "/tipoInsumo/VisTipoIns";
      // Aquí puedes redireccionar al usuario a otra página después de registrar el tipoInsumo
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo registrar tipoInsumo");
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
          <h3>Registrar tipoInsumo</h3>
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
                    name="descripInsumo"
                    placeholder="descripInsumo"
                    type="text"
                    value={this.state.form.descripInsumo}
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

export default tipoInsumoNuevo;