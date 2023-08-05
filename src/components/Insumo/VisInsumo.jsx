import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/Insumo.css"; // Importar archivo CSS para los estilos
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class VisInsumo extends React.Component {
  //llamar datos de la api que utilizaremos
  state = {
    insumos: [],
    tipoIns: [],
    searchQuery: "",
    searchFields: ["nombreInsumo", "cantidadInsumo", "fecCompra", "fecVen","tipoInsumo", "precioInsumo"],
    currentPage: 1,
    perPage: 5
  };

  //buscador
  handleSearch = (event) => {
    this.setState({
      searchQuery: event.target.value,
      currentPage: 1
    });
  };


  //funcion Cerra SEsion
  handleLogout = () => {
    // Aquí puedes realizar las acciones necesarias para cerrar la sesión
    localStorage.removeItem('token');
    localStorage.removeItem('tipoEmpleado');
    localStorage.removeItem('id');
    window.location.href = "/";
    // Ejemplo: Simplemente mostramos un mensaje en la consola
    console.log('Sesión cerrada');
  };

  clickInsumo(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }


  clickVenta2() {
    window.location.href = "/VentaInsumo/nuevo/";
  }

  componentDidMount() {
    let insumosUrl = Apiurl + "insumo";
    let tipoInsUrl = Apiurl + "tipoInsumo";

    axios.all([axios.get(insumosUrl), axios.get(tipoInsUrl)])
      .then(
        axios.spread((insumosResponse, tipoInsResponse) => {
          // Ordenar los productos por el ID de menor a mayor
          const sortedInsumos = insumosResponse.data.sort(
            (a, b) => a.ID - b.ID
          );

          this.setState({
            insumos: insumosResponse.data,
            tipoIns: tipoInsResponse.data,
          });
        }))

      .catch(error => {
        console.log(error);
      });
  }



  addToVenta2 = (value) => {
    const nombreInsumo = value.nombreInsumo;
    const cantidadInsumo = value.cantidadInsumo;
    const precioInsumo = parseFloat(value.precioInsumo).toFixed(2);
    const id = value.ID;

    const venta2 = localStorage.getItem("venta2");
    const venta2Array = venta2 ? JSON.parse(venta2) : [];

    const nuevoInsumo = { nombreInsumo, cantidadInsumo, precioInsumo ,id};
    venta2Array.push(nuevoInsumo);

    localStorage.setItem("venta2", JSON.stringify(venta2Array));

    toast.success('Insumo agregado a la venta exitosamente');
  };


  handlePageChange = (page) => {
    this.setState({
      currentPage: page
    });
  };

  render() {
    const { searchQuery, searchFields, insumos, currentPage, perPage } = this.state;

    const filtroInsumo = insumos.filter((insumo) =>
      searchFields.some((field) =>
        insumo[field] && insumo[field]
          .toString()
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
    );

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    const insumosPaginados = filtroInsumo.slice(start, end);

    const totalPages = Math.ceil(filtroInsumo.length / perPage);


    return (
      <React.Fragment>
        <div className="fondoInsumo">
          <div className="sidebar-Insumo">
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
                <a href="/Producto/VisProducto">Producto</a>
              </li>
              <li>
                <a href="/VentaProducto/VisVentPro">Venta Producto</a>
              </li>
              <li>
                <a href="/tipoInsumo/VisTipoIns">Tipo Insumo</a>
              </li>
              <li>
                <a className="active" href="/Insumo/VisInsumo">Insumo</a>
              </li>
              <li>
                <a href="/VentaInsumo/VisVentIns">Venta Insumo</a>
              </li>
              <li>
                <a href="/Imagen/VisImg">Imagen</a>
              </li>
              <br />
              <center>
                <li>
                  <LogoutButton onLogout={this.handleLogout} />
                </li>
              </center>
              <br />
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

            <table className="table table-striped table-bordered custom-Insumo-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">NOMBRE</th>
                  <th scope="col">CANTIDAD - INSUMO</th>
                  <th scope="col">FECHA - COMPRA</th>
                  <th scope="col">FECHA - VENCIMIENTO</th>
                  <th scope="col">TIPO - INSUMO</th>
                  <th scope="col">PRECIO - INSUMO</th>
                  <th scope="col">IMG</th>
                </tr>
              </thead>
              <tbody>

                {insumosPaginados.map((value, index) => {
                  // Buscar el tipo de insumo correspondiente al ID del insumo actual
                  const tipoInsumo = this.state.tipoIns.find
                    (tipo => tipo.ID === value.tipoInsumo
                    );
                  // Obtener la descripción del insumo si se encuentra
                  const descripInsumo = tipoInsumo ? tipoInsumo.descripInsumo : "";
                  return (
                    <tr key={index}>
                      <th scope="row">{value.ID}</th>
                      <td>{value.nombreInsumo}</td>
                      <td>{value.cantidadInsumo}</td>
                      <td>{value.fecCompra}</td>
                      <td>{value.fecVen}</td>
                      <td>{descripInsumo}</td>
                      <td>s/ {value.precioInsumo}</td>
                      <td>
                        <img
                          src={value.img}
                          alt="Img insumo"
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
                          onClick={() => this.addToVenta2(value)}
                        >
                          Agregar a la Venta
                        </button>
                      </td>
                      <td>
                        <div
                          onClick={() => this.clickInsumo(value.ID)}
                          className="edit-button"
                        >
                          <button className="btn btn-primary btn-sm">Editar</button>
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
              onClick={() => this.clickVenta2()}
            >
              Realizar Venta
            </button>
            <br></br>
            <button
              type="submit"
              className="btn btn-success"
              onClick={() => this.clickAgregar()}
            >
              Registrar Insumo
            </button>
            <div className="pagination">
              {currentPage > 1 && (
                <button className="btn btn-primary" onClick={() => this.handlePageChange(currentPage - 1)}>
                  Anterior
                </button>
              )}
              {currentPage < totalPages && (
                <button className="btn btn-primary" onClick={() => this.handlePageChange(currentPage + 1)}>
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

export default VisInsumo; 