import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class NuevoImg extends React.Component {
  state = {
    form: {
      imgPro: "",
      imgIns: "",
      imgProProduc: "",
      imgProIns: "",
      imgLogin:"",
    },
  };

  handleSubmit = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Reemplace "token" con su token de autenticación
      },
    };
    axios
      .post(Apiurl + "imagen", this.state.form, config)
      .then((res) => {
        console.log(res);
        alert("Se registro imagen correctamente.");
        window.location.href = "/imagen/VisImg";
        // Aquí puedes redireccionar al usuario a otra página después de registrar el imagen
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo registrar imagen");
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
          <h3>Registrar Imagen</h3>
        </div>
        <div className="container">
          <br />
          <form className="form-horizontal" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> IMAGEN INSUMO </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="imgIns"
                    placeholder="imgIns"
                    type="text"
                    value={this.state.form.imgIns}
                    onChange={this.manejadorChange}
                  />
                </div>
                <label className="col-md-2 control-label"> {" "} IMAGEN PRODUCTO </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="imgPro"
                    placeholder="imgPro"
                    type="text"
                    value={this.state.form.imgPro}
                    onChange={this.manejadorChange}
                  />
                </div>
                <label className="col-md-2 control-label"> {" "} IMAGEN PROFORMA INSUMO </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="imgProProduc"
                    placeholder="imgProProduc"
                    type="text"
                    value={this.state.form.imgProProduc}
                    onChange={this.manejadorChange}
                  />
                </div>
                <label className="col-md-2 control-label"> {" "} IMAGEN PROFORMA PRODUCTO </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="imgProIns"
                    placeholder="imgProIns"
                    type="text"
                    value={this.state.form.imgProIns}
                    onChange={this.manejadorChange}
                  />
                </div>

                <label className="col-md-2 control-label"> {" "} IMAGEN IMAGEN </label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="imgLogin"
                    placeholder="imgLogin"
                    type="text"
                    value={this.state.form.imgLogin}
                    onChange={this.manejadorChange}
                  />
                </div>
              </div>
            </div>

            <br></br>
            <button
              type="submit"
              className="btn btn-success"
              style={{ marginRight: "10px" }} > Registrar 
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default NuevoImg;