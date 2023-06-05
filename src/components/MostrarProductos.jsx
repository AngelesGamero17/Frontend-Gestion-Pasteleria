import React from "react";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import '../assets/css/MostrarProducto.css';
import '../assets/css/whatssap.css';
import IconoInsu from '../assets/img/IconoInsu.jpeg';
import ProductIcon from '../assets/img/ProductIcon.png';
import IconLogo from '../assets/img/IconLogo.png';
import what from '../assets/img/what.png';

class MostrarProductos extends React.Component {
 
  state = {
    productos: [],
    searchQuery: "",
    searchFields: [
      "nombre",
      "cantidad",
      "precio",
      "fechaProduccion",
      "tipoProducto",
    ],
    showCards: false,
    cantidades: [],
    tipoProductoFilter: "",
    tiposProducto: [],
    filtroProducto: [], // Agrega esta línea para inicializar la propiedad filtroInsumo
  };


  handleSearch = (event) => {
    const searchQuery = event.target.value;

    const { productos, tipoProductoFilter, searchFields } = this.state;

    const filtroProducto = productos
      .filter((producto) =>
        searchFields.some(
          (field) =>
            producto[field] &&
            (field === "precioProducto"
              ? producto[field].toString()
              : producto[field]
            )
              .toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      )
      .filter(
        (producto) =>
          tipoProductoFilter === "" ||
          producto.tipoProducto ===
            (tipoProductoFilter !== ""
              ? parseInt(tipoProductoFilter)
              : tipoProductoFilter)
      );

    this.setState({ searchQuery: searchQuery, filtroProducto: filtroProducto });
  };


  handleTipoProductoFilter = (event) => {
    const tipoProducto = event.target.value;
    this.setState({ tipoProductoFilter: tipoProducto });

    const { productos } = this.state;

    const filtroProducto = productos.filter((producto) =>
      tipoProducto !== "" ? producto.tipoProducto === tipoProducto : true
    );

    this.setState({ filtroProducto: filtroProducto || productos });
  };


  componentDidMount() {
    let urlTipoProducto = Apiurl + "tipoProducto";
    let urlProducto = Apiurl + "producto";

    axios
      .all([axios.get(urlTipoProducto), axios.get(urlProducto)])
      .then(
        axios.spread((responseTipoProducto, responseProducto) => {
          const tipoProductoData = responseTipoProducto.data;
          const productoData = responseProducto.data;

          const productos = productoData.map((producto) => ({
            ...producto,
            tipoProducto: tipoProductoData.find(
              (tipo) => tipo.ID === producto.tipoProducto
            ).descripProducto,
          }));

          const tiposProducto = [
            ...new Set(productos.map((producto) => producto.tipoProducto)),
          ];

          const filtroProducto = productos; // Mostrar todos los productos inicialmente

          this.setState({
            productos: productos,
            showCards: true,
            tiposProducto: tiposProducto,
            filtroProducto: filtroProducto, // Actualizar el estado del filtro
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
  addToProforma = (value, cantidad) => {
    // Obtener los valores del objeto "value"
    const nombre = value.nombre;
    const precio = parseFloat(value.precio).toFixed(2);

    // Obtener la proforma actual del localStorage
    const proforma = localStorage.getItem('proforma');

    // Convertir la proforma en un arreglo si existe, o un arreglo vacío si no existe
    const proformaArray = proforma ? JSON.parse(proforma) : [];

    // Agregar el nuevo objeto a la proforma
    const nuevoProducto = { nombre, precio, cantidad };
    proformaArray.push(nuevoProducto);

    // Guardar la proforma actualizada en el localStorage
    localStorage.setItem('proforma', JSON.stringify(proformaArray));

    // Redirigir a la página "/ProformaProducto"
    window.location.href = "/ProformaProducto";
  };

  render() {
    const { 
      searchQuery,
      searchFields,
      productos, 
      showCards ,
      tipoProductoFilter,
      tiposProducto,
      } = this.state;

    const filtroProductos = productos.filter((producto) =>
      searchFields.some(
        (field) =>
          producto[field] &&
          producto[field]
            .toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
      )
      .filter(
        (producto) =>
          tipoProductoFilter === "" ||
          producto.tipoProducto ===
            (tipoProductoFilter !== ""
              ? parseInt(tipoProductoFilter)
              : tipoProductoFilter)
      );

    return (
      <React.Fragment>
            <div className="fondoVistaMostrar-container">
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
              <div className="container-fluid">
              <a className="nav-link" href="./MostrarInsumo">
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

        <br/>
        {/* Sección de búsqueda */}
        <div className="container-redes">
          <a href="https://wa.link/ghgzv4" className="btn">
            <img src={what} width="125px" alt="Img whatssap" />
          </a>
        </div>


        {/* prueba */}
              
        <div className="content-select ">
              <select
              value={tipoProductoFilter}
                          onChange={this.handleTipoProductoFilter}
                        >
                          <option value="">Todas las Categorias </option>
                          {tiposProducto.map((tipo) => (
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
                placeholder="Buscar Postres"
                value={searchQuery}
                onChange={this.handleSearch}
                className="form-control mb-4"
              />
            </div>
          </div>
        
        {/* Sección de productos */}
          <div className="row">
          {this.state.filtroProducto.map((value, index) => (
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
                    <h5 className="card-title">{value.nombre}</h5>
                    <p style={{ color: 'blue' }}>Precio:</p>
                    <p className="card-text">S/ {parseFloat(value.precio).toFixed(2)}</p>
                    <p style={{ color: 'blue' }}>Stock:</p>
                    <p className="card-text">{parseFloat(value.cantidad)}</p>
                    <p style={{ color: 'blue' }}>Cantidad:</p>

                    <input
                        type="number"
                        value={this.state.cantidades[index] || ""}
                        onInput={(event) => {
                          const currentValue = parseFloat(event.target.value);
                          const maxValue = parseFloat(value.cantidad);

                          if (currentValue > maxValue) {
                            event.target.value = maxValue; // Establecer el valor máximo permitido
                          }

                          this.handleChangeCantidad(event, index); // Actualizar el estado con el valor ingresado
                        }}
                        max={value.cantidad}
                        min='0'
                        className="form-control mb-2"
                      />

                    <button
                      className="btn btn-primary btn-sm"
                      style={{ backgroundColor: "#ab3ed8", borderColor: "#bc4ed8" }}
                      onClick={() => this.addToProforma(value, this.state.cantidades[index])}
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

export default MostrarProductos;
