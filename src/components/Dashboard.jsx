import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import LinesChart from "./Graficas/lineas";
import PiesChart from "./Graficas/circularProduc";
import PiesChart2 from "./Graficas/circularInsumo";
import BarsChart from "./Graficas/LineaVentIns";
import BarsChart2 from "./Graficas/LineaVentPro";
import DonutChart from "./Graficas/Linea";
import "../assets/css/Dashboard.css"; // Import CSS file for styles
import LogoutButton from "./CerrarSesion";

function Dashboard() {
  // Function to handle logout
  const handleLogout = () => {
    // Perform necessary actions to log out the user
    localStorage.removeItem('token');
    localStorage.removeItem('tipoEmpleado');
    localStorage.removeItem('id');
    window.location.href = "/";
    console.log('Session closed');
  };

  return (
    <React.Fragment>
      <div className="dashboard-container">
        <div className="sidebar-Dashboard">
          <br />
          <br />
          <ul>
            <li>
              <a className="active" href="/dashboard">Inicio</a>
            </li>
            <li>
              <a href="/tipoEmpleado/VisTipoEmp">Tipo Empleado</a>
            </li>
            <li>
              <a href="/Empleado/VisEmpleado">Empleado</a>
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
              <a href="/Cliente/VisCliente">Cliente</a>
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
                <LogoutButton onLogout={handleLogout} />
              </li>
            </center>
            <br/>
          </ul>
        </div>

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
              <p className="m-2 text-center"><b>Grafica Circular:</b> Insumos a que comparamos nombre-precio</p>
              <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "225px" }}>
                <PiesChart2 />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <hr className="mt-3 mb-2" />
            <div>
              <p className="m-2 text-center"><b>Grafica Circular:</b> Producto aqui comparamos el nombre con el precio</p>
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
              <p className="m-2 text-center"><b>Grafica Donut:</b> Clientes de la vista empleado</p>
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
              <p className="m-2 text-center"><b>Grafica de Lineas:</b> Venta de Insumos aqui comparamos fecha con total</p>
              <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "225px" }}>
                <BarsChart />
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <hr className="mt-3 mb-2" />
            <div>
              <p className="m-2 text-center"><b>Grafica de Lineas:</b> Venta de Productos aqui comparamos fecha con nombre</p>
              <div className="bg-light mx-auto px-2 border border-2 border-primary" style={{ width: "450px", height: "225px" }}>
                <BarsChart2 />
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-light text-center py-3">
          <p>Dashboard</p>
        </footer>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;