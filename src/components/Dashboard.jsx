import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import LinesChart from "./Graficas/lineas";
import PiesChart from "./Graficas/circularProduc";
import PiesChart2 from "./Graficas/circularInsumo";
import BarsChart from "./Graficas/LineaVentIns";
import BarsChart2 from "./Graficas/LineaVentPro";
import DonutChart from "./Graficas/Linea";
import "../assets/css/FondoDasboard.css"; // Importar archivo CSS para los estilos
import React from "react";

function Dashboard() {

  return (
    <div className="dashboard-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-custom">
        <div className="container-fluid">
          <a className="nav-link active" href="/dashboard">Inicio</a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/Empleado/VisEmpleado">Empleado</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " aria-current="page" href="/Producto/VisProducto">Producto</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/Cliente/VisCliente">Cliente</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/tipoEmpleado/VisTipoEmp">Tipo Empleado</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/tipoInsumo/VisTipoIns">Tipo Insumo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link " href="/Insumo/VisInsumo">Insumo</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/VentaProducto/VisVentPro">Venta Producto</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/VentaInsumo/VisVentIns">Venta Insumo</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="bg-light mx-auto px-2 border border-2 border-primary my-3" style={{ width: "100%", height: "230px", display: "none" }}>
              <LinesChart />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <hr className="mt-3 mb-2" />
            <div>
              <p className="m-2 text-center"><b>Grafica Circular: </b> <p></p>
              Insumos a que comparamos nombre-precio</p>
              <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "225px" }}>
                <PiesChart2 />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <hr className="mt-3 mb-2" />
            <div>
              <p className="m-2 text-center"><b>Grafica Circular: </b> <p></p>
              Producto aqui comparamos el nombre con el precio</p>
              <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "225px" }}>
                <PiesChart />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <hr className="mt-3 mb-2" />
            <div>
              <p className="m-2 text-center"><b>Grafica Donut: </b> <p></p>
              Clientes de la vista empleado</p>
              <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "400px", height: "400px" }}>
                <DonutChart />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <hr className="mt-3 mb-2" />
            <div>
              <p className="m-2 text-center"><b>Grafica de Lineas: </b> <p></p>
              Venta de Insumos aqu comparamos fecha con total</p>
              <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "225px" }}>
                <BarsChart />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <hr className="mt-3 mb-2" />
            <div>
              <p className="m-2 text-center"><b>Grafica de Lineas: </b> <p></p>
              Venta de Productos aqui comparamos fecha con nombre</p>
              <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "225px" }}>
                <BarsChart2 />
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="bg-light text-center py-3">
        <p>Dashboard</p>
      </footer>
    </div>
  );
}

export default Dashboard;
