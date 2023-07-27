import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

class ProductoEditar extends React.Component {
  //llamar datos de la api que utilizaremos
  state = {
    form: { 
      nombre:"",
      cantidad: "",
      precio: "",
      fechaProduccion:"",
      tipoProducto:"",
      img:""
    },
    tiposProducto:[],
    error: false,
    errorMsg: "",
  };

  //funcion para que actualice los datos  automaticamente
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      form: {
        ...prevState.form,
        [name]: value,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.put();
  };

  //funcion para actualizar los datos
  put = () => {
    console.log(this.state);
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    const urlApi = Apiurl + "producto/" + id;
    const token = localStorage.getItem("token"); // Obtener el token desde localStorage


    //permite hacer solicitudes http  para actualizar los datos
    axios
      .put(urlApi, this.state.form, {
        headers: {
          Authorization: `Bearer ${token}`, // Incluir el token en el header
        },
      })
      .then((response) => {
        console.log(response);
        alert("Los datos han sido actualizados correctamente.");
      })
      .catch((error) => {
        console.log(error);
        alert("Hubo un error al intentar actualizar los datos.");
      });
  };

  //funcion para elimar los datos
  delete = () => {
    console.log(this.state);
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    const urlApi = Apiurl + "producto/" + id;
    const token = localStorage.getItem("token");
    axios
      .delete(urlApi, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        // Mostrar alerta de éxito
        alert("El empleado ha sido eliminado correctamente");
        // Redirigir a la lista de empleados
        window.location.href = "/Producto/VisProducto";
      })
      .catch((error) => {
        console.log(error);
        // Mostrar alerta de error
        alert("Ha ocurrido un error al eliminar el producto");
      });
  };

  //funcion para obtener los datos , para poder editar
  componentDidMount() {
    const url = window.location.href;
    const match = url.match(/\/editar\/(\d+)$/);
    const id = match ? match[1] : null;
    if (id) {
      const urlApi = Apiurl + "producto/" + id; // Usamos el id en la URL de la API
      axios
        .get(urlApi)
        .then((response) => {
          const producto = response.data;
          if (producto) {
            this.setState({
              form: {
                nombre: producto.nombre,
                cantidad: producto.cantidad,
                precio: producto.precio,
                fechaProduccion: producto.fechaProduccion,
                tipoProducto: producto.tipoProducto,
                img: producto.img,
                token: localStorage.getItem("token"),
                id: id,
              },
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }


  const urlTiposProducto = Apiurl + "tipoProducto";
  axios
    .get(urlTiposProducto)
    .then((response) => {
      const tiposProducto = response.data;
      this.setState({ tiposProducto });
    })
    .catch((error) => {
      console.error(error);
    });
}



  //para vizualizar
  render() {
    const { form, tiposProducto } = this.state;
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Editar Producto</h3>
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
                    name="nombre"
                    placeholder="nombre"
                    type="text"
                    value={form.nombre}
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
                    value={form.cantidad}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">PRECIO</label>
                <div className="col-md-10">
                  <input
                    className="form-control"
                    name="precio"
                    placeholder="precio"
                    type="text"
                    value={form.precio}
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
                    value={form.fechaProduccion}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">TIPO - PRODUCTO</label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    name="tipoProducto"
                    value={form.tipoProducto}
                    onChange={this.handleChange}
                  >
                    <option value="">Seleccione un tipo de producto</option>
                    {tiposProducto.map((tipo) => (
                      <option key={tipo.ID} value={tipo.ID}>
                        {tipo.descripProducto}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">IMG</label>
                <div className="col-md-10">
                <img
                    className="form-control"
                    name="img"
                    alt=""
                    src={form.img}
                    style={{ width: "300px" }} // Ajusta el ancho deseado
                  />
                  <input
                    className="form-control"
                    name="img"
                    placeholder="img"
                    type="text"
                    value={form.img}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>


            <br></br>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "10px" }}
              onClick={() => this.put()}>Guardar Cambios
              </button>

            <button
              type="submit"
              className="btn btn-danger"
              style={{ marginRight: "10px" }}
              onClick={() => this.delete()}>Eliminar
              </button>

            <a className="btn btn-dark" href="/Producto/VisProducto">Salir</a>
            
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default ProductoEditar;