import React from "react";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import '../assets/css/Producto.css';
import IconoInsu from '../assets/img/IconoInsu.jpeg';
import ProductIcon from '../assets/img/ProductIcon.png';
import IconLogo from '../assets/img/IconLogo.png'
import Login from "./Login";

class MostrarInsumo extends React.Component {
  state = {
    insumos: [],
    searchQuery: "",
    searchFields: ["nombreInsumo", "cantidadInsumo", "fecCompra", "tipoInsumo", "precioInsumo"],
    showCards: false, // Track when to show the cards with animation
  };

  // Buscador
  handleSearch = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  componentDidMount() {
    let url = Apiurl + "insumo";
    axios.get(url).then((response) => {
      this.setState({
        insumos: response.data,
        showCards: true, // Set showCards to true after fetching the data
      });
    });
  }

  // Función para agregar a la proforma
  addToProforma1 = (value) => {
    // Obtener los valores del objeto "value"
    const nombre = value.nombreInsumo;
    const precio = parseFloat(value.precioInsumo).toFixed(2);

    // Obtener la proforma actual del localStorage
    const proforma1 = localStorage.getItem('proforma1');

    // Convertir la proforma en un arreglo si existe, o un arreglo vacío si no existe
    const proformaArray = proforma1 ? JSON.parse(proforma1) : [];

    // Agregar el nuevo objeto a la proforma
    const nuevoInsumo = { nombre, precio };
    proformaArray.push(nuevoInsumo);

    // Guardar la proforma actualizada en el localStorage
    localStorage.setItem('proforma1', JSON.stringify(proformaArray));

    // Redirigir a la página "/ProformaProducto"
    window.location.href = "/ProfomaInsumo";
  };


  render() {
    const { searchQuery, searchFields, insumos, showCards } = this.state;

    const filtroInsumo = insumos.filter((insumo) =>
      searchFields.some((field) =>
        insumo[field] && insumo[field]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );

    return (
      <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar navbar-light bg-warning">
          <div className="container-fluid">
          <a className="nav-link active" href="./MostrarInsumo">
              <img src={IconoInsu} width="50px" alt="Icono Insumos" className="navbar-icon" /> Insumos
            </a>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="./MostrarProductos">
                  <img src={ProductIcon} width="50px" alt="Icono Producto" className="navbar-icon" /> Postres
                  </a>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li>
                <a className="nav-link active" href="./Login">
                <img src={IconLogo} width="50px" alt="Icono Logo" className="navbar-icon" /> INICIAR SESION
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <div className="container">
          <br />
          <br />

          <input
            type="text"
            placeholder="Busca Insumos"
            value={searchQuery}
            onChange={this.handleSearch}
            className="form-control"
          />
          <br />
          <br />

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
            {filtroInsumo.map((value, index) => (
              <div
                className={`col ${showCards ? "fade-in" : ""}`}
                key={index}
              >
                <div className="card h-100">
                  <img
                    src={value.img}
                    alt="Img insumo"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{value.nombreInsumo}</h5>
                    <p style={{ color: 'blue' }}>Precio:</p>
                    <p className="card-text">S/ {parseFloat(value.precioInsumo).toFixed(2)}</p>
                    <button
                      className="btn btn-primary btn-sm"
                      style={{ backgroundColor: "#ab3ed8", borderColor: "#bc4ed8" }}
                      onClick={() => this.addToProforma1(value)}
                    >
                      Agregar a la Proforma
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MostrarInsumo;