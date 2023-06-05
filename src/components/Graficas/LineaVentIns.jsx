import React from "react";
import { Apiurl } from "../../services/apirest";
import axios from "axios";
import { Line } from "react-chartjs-2";

class VisVentIns extends React.Component {
  state = {
    ventaInsumo: [],
    clientes: [],
    empleados: [],
    searchQuery: "",
    searchFields: ["idCliente","idEmpleado","descripcion", "precioTotal","fechaVenta"],
  };

  componentDidMount() {
    this.fetchData(); // Obtener los datos iniciales al cargar el componente
    this.startPolling(); // Iniciar el polling para actualizar los datos periódicamente
  }

  componentWillUnmount() {
    this.stopPolling(); // Detener el polling cuando el componente se desmonte
  }

  fetchData = () => {
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

  startPolling = () => {
    this.pollingInterval = setInterval(this.fetchData, 5000); // Consultar la API cada 5 segundos
  }

  stopPolling = () => {
    clearInterval(this.pollingInterval); // Detener el intervalo de polling
  }

  render() {
    const { ventaInsumo } = this.state;

    // Obtener los datos para la gráfica de líneas
    const preciosTotales = ventaInsumo.map((venta) => venta.precioTotal);
    const fechasVentas = ventaInsumo.map((venta) => venta.fechaVenta);

    const data = {
      labels: fechasVentas,
      datasets: [
        {
          label: "Precios Totales",
          data: preciosTotales,
          fill: false,
          borderColor: "rgba(148, 0, 211, 0.5)", // Cambiar el color a morado
        },
      ],
    };

    const options = {
      responsive: true,
      animation: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          min: 0,
          max: Math.max(...preciosTotales) + 10,
        },
        x: {
          ticks: { color: "rgb(165, 42, 42)" },
        },
      },
    };

    return (
      <React.Fragment>
        <div className="chart-container">
          <Line data={data} options={options} />
        </div>
      </React.Fragment>
    );
  }
}

export default VisVentIns;
