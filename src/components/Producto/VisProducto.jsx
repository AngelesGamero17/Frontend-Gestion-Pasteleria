import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/Producto.css"; // Importar archivo CSS para los estilos
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class VisProducto extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productos: [],
      tipoPro: [],
      searchQuery: "",
      searchFields: ["nombre", "cantidad", "precio", "fechaProduccion"],
      currentPage: 1,
      perPage: 5,
      showInventario: false,
      showEmpleado: false,
      showVentas: false,
    };
  }

  handleSearch = (event) => {
    this.setState({
      searchQuery: event.target.value,
      currentPage: 1,
    });
  };

  handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tipoEmpleado");
    localStorage.removeItem("id");
    window.location.href = "/";
    console.log("Sesión cerrada");
  };

  handleInventarioClick = () => {
    this.setState((prevState) => ({
      showInventario: !prevState.showInventario,
    }));
  };

  handleEmpleadoClick = () => {
    this.setState((prevState) => ({
      showEmpleado: !prevState.showEmpleado,
    }));
  };

  handleVentasClick = () => {
    this.setState((prevState) => ({
      showVentas: !prevState.showVentas,
    }));
  };

  clickProducto(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  clickVenta() {
    window.location.href = "/VentaProducto/nuevo/";
  }

  componentDidMount() {
    let productosUrl = Apiurl + "producto";
    let tipoProUrl = Apiurl + "tipoProducto";

    axios
      .all([axios.get(productosUrl), axios.get(tipoProUrl)])
      .then(
        axios.spread((productosResponse, tipoProResponse) => {
          // Ordenar los productos por el ID de menor a mayor
          const sortedProductos = productosResponse.data.sort(
            (a, b) => a.ID - b.ID
          );

          this.setState({
            productos: sortedProductos,
            tipoPro: tipoProResponse.data,
          });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }

  addToVenta = (value) => {
    const nombre = value.nombre;
    const cantidad = value.cantidad;
    const id = value.ID;
    const precio = parseFloat(value.precio).toFixed(2);

    const venta = localStorage.getItem("venta");
    const ventaArray = venta ? JSON.parse(venta) : [];

    const nuevoProducto = { nombre, cantidad, precio, id };
    ventaArray.push(nuevoProducto);

    localStorage.setItem("venta", JSON.stringify(ventaArray));

    toast.success("Producto agregado a la venta exitosamente");
  };

  handlePageChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  render() {
    const {
      searchQuery,
      searchFields,
      productos,
      currentPage,
      perPage,
   
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
    );

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    const productosPaginados = filtroProductos.slice(start, end);

    const totalPages = Math.ceil(filtroProductos.length / perPage);

    return (
      <React.Fragment>
        <div className="fondoProducto">
          <div className="sidebar-Producto">
            <br />
            <br />
            <ul>
              <li>
                <a href="/dashboard"> Inicio </a>
              </li>
              <li>
                <a href="/tipoEmpleado/VisTipoEmp">Tipo Empleado</a>
              </li>
              <li>
                <a href="/Empleado/VisEmpleado">Empleado</a>
              </li>
              <li>
                <a href="/Cliente/VisCliente">Cliente</a>
              </li>
              <li>
                <a href="/tipoProducto/VisTipoPro">Tipo Producto</a>
              </li>
              <li>
                <a className="active" href="/Producto/VisProducto">Producto</a>
              </li>
              <li>
                <a href="/VentaProducto/VisVentPro">Venta Producto</a>
              </li>
              <li>
                <a href="/tipoInsumo/VisTipoIns">Tipo Insumo</a>
              </li>
              <li>
                <a href="/Insumo/VisInsumo">Insumo</a>
              </li>
              <li>
                <a href="/VentaInsumo/VisVentIns">Venta Insumo</a>
              </li>
              <li>
                <a href="/Imagen/VisImg">Imagen</a>
              </li>
              <br/>
              <center>
                <li>
                  <LogoutButton onLogout={this.handleLogout} />
                </li>
              </center>
              <br/>
            </ul>
          </div>

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

            <table className="table table-striped table-bordered custom-Producto-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">CANTIDAD</th>
                  <th scope="col">PRECIO</th>
                  <th scope="col">FECHA- PRODUCCION</th>
                  <th scope="col">TIPO PRODUCTO</th>
                  <th scope="col">IMG</th>
                  <th scope="col">ACCIONES</th>
                </tr>
              </thead>
              <tbody>
                {productosPaginados.map((value, index) => {
                  const tipoProducto = this.state.tipoPro.find(
                    (tipo) => tipo.ID === value.tipoProducto
                  );
                  const descripProducto = tipoProducto
                    ? tipoProducto.descripProducto
                    : "";
                  return (
                    <tr key={index}>
                      <th scope="row">{value.ID}</th>
                      <td>{value.nombre}</td>
                      <td>{value.cantidad}</td>
                      <td>s/ {value.precio}</td>
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
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          style={{
                            backgroundColor: "#ab3ed8",
                            borderColor: "#bc4ed8",
                          }}
                          onClick={() => this.addToVenta(value)}
                        >
                          Agregar a la Venta
                        </button>
                      </td>
                      <td>
                        <div
                          onClick={() => this.clickProducto(value.ID)}
                          className="edit-button"
                        >
                          <button className="btn btn-primary btn-sm">
                            Editar
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button
              type="submit"
              className="btn btn-dark btn-sm"
              onClick={() => this.clickVenta()}
            >
              Realizar Venta
            </button>
            <br></br>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => this.clickAgregar()}
            >
              Registrar Producto
            </button>
            <div className="pagination">
              {currentPage > 1 && (
                <button
                  className="btn btn-primary"
                  onClick={() => this.handlePageChange(currentPage - 1)}
                >
                  Anterior
                </button>
              )}
              {currentPage < totalPages && (
                <button
                  className="btn btn-primary"
                  onClick={() => this.handlePageChange(currentPage + 1)}
                >
                  Siguiente
                </button>
              )}
            </div>
          </div>
        </div>
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default VisProducto;