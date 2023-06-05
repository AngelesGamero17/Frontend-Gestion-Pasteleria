import React, { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import axios from "axios";
import { Apiurl } from "../../services/apirest";

function VisEmpleado() {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    let empleadosUrl = Apiurl + "empleado";
    let tipoEmpleadosUrl = Apiurl + "tipoEmpleado";

    axios
      .all([axios.get(empleadosUrl), axios.get(tipoEmpleadosUrl)])
      .then(
        axios.spread((empleadosResponse, tipoEmpleadosResponse) => {
          // Calcular los datos que deseas mostrar en el gráfico de donut
          const data = [];

          empleadosResponse.data.forEach((empleado) => {
            // Realiza los cálculos necesarios para obtener los datos
            // Puedes acceder a los datos de empleados y tipoEmpleados aquí

            const valorEmpleado = empleado.nomEmp;
            const valorTipoEmpleado = empleado.tipoEmpleado;

            // Agrega los valores al array de datos
            data.push({
              valorEmpleado,
              valorTipoEmpleado,
            });
          });

          // Actualiza el estado con los datos
          setDatos(data);
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {datos.length > 0 && (
        <Doughnut
          data={{
            labels: datos.map((item) => item.valorEmpleado),
            datasets: [
              {
                data: datos.map((item) => item.valorTipoEmpleado),
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"], // Puedes personalizar los colores de las secciones del donut
              },
            ],
          }}
          options={{
            responsive: true,
          }}
        />
      )}
    </div>
  );
}

export default VisEmpleado;
