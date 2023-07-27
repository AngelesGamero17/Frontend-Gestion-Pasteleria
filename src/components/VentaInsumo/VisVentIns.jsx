import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import LogoutButton from "../CerrarSesion";
import "../../assets/css/VentaInsumo.css"; // Importar archivo CSS para los estilos
class VisVentIns extends React.Component {
  state = {
    ventaInsumo: [],
    clientes: [],
    empleados: [],
    searchQuery: "",
    searchCliente: "",
    searchEmpleado: "",
    searchFields: ["idCliente","idEmpleado","descripcion", "precioTotal","fechaVenta"],
    currentPage: 1,
    perPage: 10
  };

  //buscador
  handleSearch = (event) => {
    const { value } = event.target;
    this.setState((prevState) => ({
      searchQuery: value,
      searchCliente: value,
      searchEmpleado: value,
      currentPage: 1
    }));
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

  clickVentIns(id) {
    window.location.href = "./editar/" + id;
  }

  clickAgregar() {
    window.location.href = "./nuevo/";
  }

  componentDidMount() {
    let ventaInsumoUrl = Apiurl + "ventaInsumo";
    let clienteUrl = Apiurl + "cliente";
    let empleadoUrl = Apiurl + "empleado";
  
    axios.all([axios.get(ventaInsumoUrl), axios.get(clienteUrl), axios.get(empleadoUrl)])
      .then(axios.spread((ventaInsumoResponse, clienteResponse, empleadosResponse) => {
        this.setState({
          ventaInsumo: ventaInsumoResponse.data,
          clientes: clienteResponse.data,
          empleados: empleadosResponse.data,
        });
      }))
      .catch(error => {
        console.log(error);
      });
  }

    handlePageChange = (page) => {
    this.setState({
      currentPage: page
    });
  };


  render() {
    const { searchQuery, searchFields, searchCliente, searchEmpleado, ventaInsumo, currentPage, perPage } = this.state;

    const filtroVentaInsumo = ventaInsumo.filter((ventaInsumos) =>
      searchFields.some((field) =>
        ventaInsumos[field] &&
        (field === "idCliente"
          ? this.state.clientes.some((cliente) => cliente.ID === ventaInsumos[field] && cliente.nomCli.toLowerCase().includes(searchCliente.toLowerCase()))
          : field === "idEmpleado"
            ? this.state.empleados.some((empleado) => empleado.ID === ventaInsumos[field] && empleado.nomEmp.toLowerCase().includes(searchEmpleado.toLowerCase()))
            : ventaInsumos[field].toString().toLowerCase().includes(searchQuery.toLowerCase()))
      )
    );

  const start = (currentPage - 1) * perPage;
    const end = start + perPage;

    const ventaInsumoOrdenado = [...filtroVentaInsumo].sort((a, b) => a.ID - b.ID);
    const ventaInsumoPaginado = ventaInsumoOrdenado.slice(start, end);

    const totalPages = Math.ceil(filtroVentaInsumo.length / perPage);


    return (
      
      <React.Fragment>
      <div className="fondoVentaInsumo">
      
      <div className="sidebar-VentaInsumo">
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
              <a href="/Insumo/VisInsumo">Insumo</a>
            </li>
            <li>
              <a className="active" href="/VentaInsumo/VisVentIns">Venta Insumo</a>
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

<table className="table table-striped table-bordered custom-VentaInsumo-table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">CLIENTE</th>
                <th scope="col">EMPLEADO</th>
                <th scope="col">DESCRIPCION</th>
                <th scope="col">PRECIO - TOTAL</th>
                <th scope="col">FECHA - VENTA</th>
              </tr>
            </thead>
            <tbody>
                {ventaInsumoPaginado.map((value, index) => {
                  const cliente = this.state.clientes.find((tipo) => tipo.ID === value.idCliente);
                  const empleado = this.state.empleados.find((tipo) => tipo.ID === value.idEmpleado);
                  const nomCli = cliente ? cliente.nomCli : "";
                  const nomEmp = empleado ? empleado.nomEmp : "";
                  return (
                    <tr key={index} onClick={() => this.clickVentIns(value.ID)}>
                      <th scope="row">{value.ID}</th>
                      <td>{nomCli}</td>
                      <td>{nomEmp}</td>
                      <td>{value.descripcion}</td>
                      <td>s/ {value.precioTotal}</td>
                      <td>{value.fechaVenta}</td>
                    </tr>
                  );
                })}
              </tbody>
          </table>
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
         
      </React.Fragment>
    );
  }
}

export default VisVentIns; 