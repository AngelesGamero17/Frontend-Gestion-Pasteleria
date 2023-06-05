import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/FondodeVistas.css"; // Importar archivo CSS para los estilos
class VisProducto extends React.Component {
  state = {
    productos: [],
    tipoPro:[],
    searchQuery: "",
    searchFields: ["nombre", "cantidad", "precio", "fechaProduccion"],
  };

  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipoEmpleado");
    localStorage.removeItem("id");
    window.location.href = "/";
    console.log("Sesión cerrada");
  };

  clickProducto(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let productosUrl = Apiurl + "producto";
    let tipoProUrl = Apiurl + "tipoProducto";
  
    axios.all([axios.get(productosUrl), axios.get(tipoProUrl)])
      .then(axios.spread((productosResponse, tipoProResponse) => {
        this.setState({
          productos: productosResponse.data,
          tipoPro: tipoProResponse.data,
        });
      }))
      .catch(error => {
        console.log(error);
      });
  }
  

  render() {
    const { searchQuery, searchFields, productos } = this.state;

    const filtroProductos = productos.filter((producto) =>
      searchFields.some((field) =>
          producto[field] && producto[field]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    );

    return (
      <React.Fragment>
          <div className="fondoVista-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
          <div className="container-fluid">
            <a className="nav-link " href="/dashboard">
              Inicio
            </a>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" href="/Empleado/VisEmpleado"> Empleado </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/Producto/VisProducto" > Producto </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link " href="/Cliente/VisCliente"> Cliente </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/tipoEmpleado/VisTipoEmp"> Tipo Empleado </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/tipoInsumo/VisTipoIns"> Tipo Insumo </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/Insumo/VisInsumo"> Insumo </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/VentaProducto/VisVentPro"> Venta Producto </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/VentaInsumo/VisVentIns"> Venta Insumo </a>
                </li>
                <li className="nav-item">
              <a className="nav-link" href="/TipoProducto/VisTipoPro">Tipo Producto</a>
            </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li>
                <LogoutButton onLogout={this.handleLogout} />
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <br />
          <br />

          <input
            type="text"
            placeholder="Buscar"
            value={searchQuery}
            onChange={this.handleSearch}
            className="form-control"
          />

<table className="table table-striped table-bordered custom-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">NOMBRE</th>
                <th scope="col">CANTIDAD</th>
                <th scope="col">PRECIO</th>
                <th scope="col">FECHA- PRODUCCION</th>
                <th scope="col"> TIPO PRODUCTO</th>
                <th scope="col">IMG</th>
              </tr>
            </thead>
            <tbody>
            {filtroProductos.map((value, index) => {
              // Buscar el tipo de insumo correspondiente al ID del producto actual
              const tipoProducto = this.state.tipoPro.find(tipo => tipo.ID === value.tipoProducto);
              // Obtener la descripción del producto si se encuentra
              const descripProducto = tipoProducto ? tipoProducto.descripProducto : "";
                return (
                  <tr
                    key={index}
                    onClick={() => this.clickProducto(value.ID)}
                  >
                    <th scope="row">{value.ID}</th>
                    <td>{value.nombre}</td>
                    <td>{value.cantidad}</td>
                    <td>{value.precio}</td>
                    <td>{value.fechaProduccion}</td>
                    <td>{descripProducto}</td>
                    <td>
                      <img
                        src={value.img}
                        alt="Img producto"
                        width="90px"
                        height="90px"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <br></br>
          <button
            type="submit"
            className="btn btn-success"
            onClick={() => this.clickAgregar()}
          >
            Registrar Producto
          </button>
        </div>

        <footer className="bg-light text-center py-3">
              <p>Producto</p>
            </footer>

        </div>
      </React.Fragment>
    );
  }
}

export default VisProducto;
