import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class ProductoNuevo extends React.Component {

    //llamar datos que llamamos de la api
  state = {
    form: {
      nombre: "",
      cantidad: "",
      precio: "",
      fechaProduccion: "",
      tipoProducto: "",
      img: "",
    },
    tiposProducto:[]
  };

  componentDidMount() {
    let url = Apiurl + "tipoProducto";
    axios.get(url)
      .then((response) => {
        this.setState({
          tiposProducto: response.data
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


  //permite consumir un servicio de una api
  axios
    .post(Apiurl + "producto", this.state.form, config)
    .then((res) => {
      console.log(res);
      alert("Se registro producto correctamente.");
      window.location.href = "/Producto/VisProducto";
      // Aquí puedes redireccionar al usuario a otra página después de registrar el empleado
    })
    .catch((error) => {
      console.log(error);
      alert("No se pudo registrar producto");
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


  //vizualizar
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Registrar Producto</h3>
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
                    name="nombre"
                    placeholder="nombre"
                    type="text"
                    value={this.state.form.nombre}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">CANTIDAD</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="cantidad"
                    placeholder="cantidad"
                    type="text"
                    value={this.state.form.cantidad}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label"> PRECIO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="precio"
                    placeholder="precio"
                    type="number"
                    value={this.state.form.precio}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">FECHA - PRODUCCION</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="fechaProduccion"
                    placeholder="fechaProduccion"
                    type="date"
                    value={this.state.form.fechaProduccion}
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
                <label className="col-md-2 control-label">TIPO - PRODUCTO</label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    name="tipoProducto"
                    value={this.state.form.tipoProducto}
                    onChange={this.handleChange}
                  >
                    <option value="">Seleccione un tipo de producto</option>
                    {this.state.tiposProducto.map((tipo) => (
                      <option key={tipo.ID} value={tipo.ID}>
                        {tipo.descripProducto}
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
              style={{ marginRight: "10px" }}>Registrar</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductoNuevo;