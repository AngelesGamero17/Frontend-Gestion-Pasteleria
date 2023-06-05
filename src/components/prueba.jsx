import React from "react";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import '../assets/css/MostrarInsumo.css';
import "../assets/css/whatssap.css";
import IconoInsu from "../assets/img/IconoInsu.jpeg";
import ProductIcon from "../assets/img/ProductIcon.png";
import IconLogo from "../assets/img/IconLogo.png";
import what from "../assets/img/what.png";

class MostrarInsumo extends React.Component {
  state = {
    insumos: [],
    searchQuery: "",
    searchFields: [
      "nombreInsumo",
      "cantidadInsumo",
      "fecCompra",
      "tipoInsumo",
      "precioInsumo",
      "descripInsumo",
    ],
    showCards: false,
    cantidades: [],
    tipoInsumoFilter: "",
    tiposInsumo: [],
    filtroInsumo: [],
  };

  handleSearch = (event) => {
    const searchQuery = event.target.value;
    const { insumos, tipoInsumoFilter, searchFields } = this.state;

    const filtroInsumo = insumos
      .filter((insumo) =>
        searchFields.some(
          (field) =>
            insumo[field] &&
            (field === "precioInsumo"
              ? insumo[field].toString()
              : insumo[field]
            )
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      )
      .filter(
        (insumo) =>
          tipoInsumoFilter === "" ||
          insumo.tipoInsumo ===
            (tipoInsumoFilter !== ""
              ? parseInt(tipoInsumoFilter)
              : tipoInsumoFilter)
      );

    this.setState({ searchQuery: searchQuery, filtroInsumo: filtroInsumo });
  };

  handleTipoInsumoFilter = (event) => {
    const tipoInsumo = event.target.value;
    this.setState({ tipoInsumoFilter: tipoInsumo });

    const { insumos } = this.state;

    const filtroInsumo = insumos.filter((insumo) =>
      tipoInsumo !== "" ? insumo.tipoInsumo === tipoInsumo : true
    );

    this.setState({ filtroInsumo: filtroInsumo || insumos });
  };

  componentDidMount() {
    let urlTipoInsumo = Apiurl + "tipoInsumo";
    let urlInsumo = Apiurl + "insumo";

    axios
      .all([axios.get(urlTipoInsumo), axios.get(urlInsumo)])
      .then(
        axios.spread((responseTipoInsumo, responseInsumo) => {
          const tipoInsumoData = responseTipoInsumo.data;
          const insumoData = responseInsumo.data;

          const insumos = insumoData.map((insumo) => ({
            ...insumo,
            tipoInsumo: tipoInsumoData.find(
              (tipo) => tipo.ID === insumo.tipoInsumo
            ).descripInsumo,
          }));

          const tiposInsumo = [...new Set(insumos.map((insumo) => insumo.tipoInsumo))];

          const filtroInsumo = insumos;

          this.setState({
            insumos: insumos,
            showCards: true,
            tiposInsumo: tiposInsumo,
            filtroInsumo: filtroInsumo,
          });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  handleChangeCantidad(event, index) {
    const cantidades = [...this.state.cantidades];
    cantidades[index] = event.target.value;
    this.setState({ cantidades });
  }

  addToProforma1 = (value, cantidad) => {
    const nombre = value.nombreInsumo;
    const precio = parseFloat(value.precioInsumo).toFixed(2);
    const descripInsumo = value.descripInsumo;
    
    const proforma1 = localStorage.getItem("proforma1");
    const proformaArray = proforma1 ? JSON.parse(proforma1) : [];

    const nuevoInsumo = { nombre, precio, cantidad, descripInsumo };
    proformaArray.push(nuevoInsumo);

    localStorage.setItem("proforma1", JSON.stringify(proformaArray));

    window.location.href = "/ProformaInsumo";
  };

  render() {
    const {
      searchQuery,
      searchFields,
      showCards,
      tipoInsumoFilter,
      tiposInsumo,
    } = this.state;

    const filtroInsumo = this.state.insumos
      .filter((insumo) =>
        searchFields.some(
          (field) =>
            insumo[field] &&
            insumo[field].toString().toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
      .filter(
        (insumo) =>
          tipoInsumoFilter === "" ||
          insumo.tipoInsumo === (tipoInsumoFilter !== "" ? parseInt(tipoInsumoFilter) : tipoInsumoFilter)
      );

    return (
      <React.Fragment>
        <style>
          {`
          ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            width: 200px;
            background-color: #f1f1f1;
          }
  
          li a {
            display: block;
            color: #000;
            padding: 8px 0 8px 16px;
            text-decoration: none;
          }
  
          li a.active {
            background-color: #4CAF50;
            color: white;
          }
  
          li a:hover:not(.active) {
            background-color: #555;
            color: white;
          }
        `}
        </style>

        <nav className="navbar navbar-expand-lg navbar-light bg-warning">
          <div className="container-fluid">
            <a className="nav-link active" href="./MostrarInsumo">
              <img
                src={IconoInsu}
                width="50px"
                alt="Icono Insumos"
                className="navbar-icon"
              />{" "}
              Insumos
            </a>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="./MostrarProductos">
                    <img
                      src={ProductIcon}
                      width="50px"
                      alt="Icono Producto"
                      className="navbar-icon"
                    />{" "}
                    Postres
                  </a>
                </li>
              </ul>
            </div>
            <ul className="navbar-nav">
              <li>
                <a className="nav-link active" href="./Login">
                  <img
                    src={IconLogo}
                    width="50px"
                    alt="Icono Logo"
                    className="navbar-icon"
                  />{" "}
                  INICIAR SESION
                </a>
              </li>
            </ul>
          </div>
        </nav>

        <br />

        <div className="container-redes">
          <a href="https://wa.link/ghgzv4" className="btn">
            <img src={what} width="125px" alt="Img whatssap" />
          </a>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 d-flex">
              <input
                type="text"
                placeholder="Buscar Insumos"
                value={searchQuery}
                onChange={this.handleSearch}
                className="form-control mb-4"
              />
              <select
                value={tipoInsumoFilter}
                onChange={this.handleTipoInsumoFilter}
                className="form-control mb-4 ml-2"
                style={{ width: "200px", height: "40px", borderRadius: "5px" }}
              >
                <option value="">Todos los tipos de insumo</option>
                {tiposInsumo.map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            {filtroInsumo.map((value, index) => (
              <div
                className={`col-md-3 ${showCards ? "fade-in" : ""}`}
                key={index}
              >
                <div className="card mb-4">
                  <img
                    src={value.img}
                    alt="Img insumo"
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />

                  <div className="card-body">
                    <h5 className="card-title">{value.nombreInsumo}</h5>
                    <p style={{ color: "blue" }}>Precio:</p>
                    <p className="card-text">
                      S/ {parseFloat(value.precioInsumo).toFixed(2)}
                    </p>
                    <p style={{ color: "blue" }}>Descripción:</p>
                    <p className="card-text">{value.tipoInsumo}</p>

                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control"
                        placeholder="Cantidad"
                        onChange={(event) =>
                          this.handleChangeCantidad(event, index)
                        }
                      />
                      <button
                        className="btn btn-primary"
                        onClick={() =>
                          this.addToProforma1(value, this.state.cantidades[index])
                        }
                      >
                        Añadir a Proforma
                      </button>
                    </div>
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
