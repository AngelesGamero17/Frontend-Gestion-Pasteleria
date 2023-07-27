import React from "react";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import "../assets/css/MostrarInsumo.css";
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
    imagen: [],
    tipoInsumoFilter: "",
    tiposInsumo: [],
    filtroInsumo: [], // Agrega esta línea para inicializar la propiedad filtroInsumo
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
    let urlImagen = Apiurl + "imagen";

    axios
      .all([
        axios.get(urlTipoInsumo),
        axios.get(urlInsumo),
        axios.get(urlImagen),
      ])
      .then(
        axios.spread((responseTipoInsumo, responseInsumo, responseImagen) => {
          const tipoInsumoData = responseTipoInsumo.data;
          const insumoData = responseInsumo.data;

          this.setState({
            imagen: responseImagen.data,
          });
          const insumos = insumoData.map((insumo) => ({
            ...insumo,
            tipoInsumo: tipoInsumoData.find(
              (tipo) => tipo.ID === insumo.tipoInsumo
            ).descripInsumo,
          }));

          const tiposInsumo = [
            ...new Set(insumos.map((insumo) => insumo.tipoInsumo)),
          ];

          const filtroInsumo = insumos; // Mostrar todos los productos inicialmente

          this.setState({
            insumos: insumos,
            showCards: true,
            tiposInsumo: tiposInsumo,
            filtroInsumo: filtroInsumo, // Actualizar el estado del filtro
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

  // Función para agregar a la proforma
  addToProforma1 = (value, cantidad) => {
    // Obtener los valores del objeto "value"
    const nombre = value.nombreInsumo;
    const precio = parseFloat(value.precioInsumo).toFixed(2);

    // Obtener la proforma actual del localStorage
    const proforma1 = localStorage.getItem("proforma1");

    // Convertir la proforma en un arreglo si existe, o un arreglo vacío si no existe
    const proformaArray = proforma1 ? JSON.parse(proforma1) : [];

    // Agregar el nuevo objeto a la proforma
    const nuevoInsumo = { nombre, precio, cantidad };
    proformaArray.push(nuevoInsumo);

    // Guardar la proforma actualizada en el localStorage
    localStorage.setItem("proforma1", JSON.stringify(proformaArray));

    // Redirigir a la página "/ProformaProducto"
    window.location.href = "/ProformaInsumo";
  };

  render() {
    const {
      searchQuery,
      searchFields,
      insumos,
      showCards,
      tipoInsumoFilter,
      tiposInsumo,
    } = this.state;

    const filtroInsumo = insumos
      .filter((insumo) =>
        searchFields.some(
          (field) =>
            insumo[field] &&
            insumo[field]
              .toString()
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
    let firstImage = this.state.imagen[0] ? this.state.imagen[0].imgIns : "";
    return (
      <React.Fragment>
        <div
          className="fondoVistaMostrar1-container"
          style={{
            backgroundImage: `url('${firstImage}')`,
            backgroundAttachment: "fixed",
          }}
        >
          <nav className="navbar navbar-expand-lg navbar-light bg-custom">
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
                    <a className="nav-link" href="./MostrarProductos">
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

          {/* Sección de búsqueda */}
          <div className="container-redes">
            <a href="https://wa.link/ghgzv4" className="btn">
              <img src={what} width="125px" alt="Img whatssap" />
            </a>
          </div>

          {/* prueba */}

          <div className="content-select ">
            <select
              value={tipoInsumoFilter}
              onChange={this.handleTipoInsumoFilter}
            >
              <option value="">Todas las Categorias </option>
              {tiposInsumo.map((tipo) => (
                <option key={tipo} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
            <i></i>
          </div>

          {/* prueba */}

          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <input
                  type="text"
                  placeholder="Buscar Insumos"
                  value={searchQuery}
                  onChange={this.handleSearch}
                  className="form-control mb-4"
                />
              </div>
            </div>

            <div className="row">
              {this.state.filtroInsumo.map((value, index) => (
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
                      <p style={{ color: "blue" }}>Stock:</p>
                      <p className="card-text">
                        {parseFloat(value.cantidadInsumo)}
                      </p>
                      <p style={{ color: "blue" }}>Cantidad:</p>

                      <input
                        type="number"
                        value={this.state.cantidades[index] || ""}
                        onInput={(event) => {
                          const currentValue = parseFloat(event.target.value);
                          const maxValue = parseFloat(value.cantidadInsumo);

                          if (currentValue > maxValue) {
                            event.target.value = maxValue; // Establecer el valor máximo permitido
                          }

                          this.handleChangeCantidad(event, index); // Actualizar el estado con el valor ingresado
                        }}
                        max={value.cantidadInsumo}
                        min="0"
                        className="form-control mb-2"
                      />

                      <button
                        className="btn btn-primary btn-sm"
                        style={{
                          backgroundColor: "#ab3ed8",
                          borderColor: "#bc4ed8",
                        }}
                        onClick={() =>
                          this.addToProforma1(
                            value,
                            this.state.cantidades[index]
                          )
                        }
                      >
                        Agregar a la Proforma
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MostrarInsumo;