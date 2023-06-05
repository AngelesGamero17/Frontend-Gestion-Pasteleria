import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { Apiurl } from "../../services/apirest";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export default function Pies() {
  const [insumos, setInsumos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let url = Apiurl + "insumo";
    axios.get(url).then((response) => {
      setInsumos(response.data);
    });
  };

  const getPieChartData = () => {
    const labels = insumos.map((insumo) => insumo.nombreInsumo);
    const data = insumos.map((insumo) => insumo.cantidadInsumo);
    const backgroundColor = [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(253, 102, 155, 0.2)',
    ];
    const borderColor = [
      'rgba(255, 99, 132, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(75, 192, 192, 1)',
      'rgba(153, 102, 255, 1)',
    ];

    return {
      labels,
      datasets: [
        {
          label: 'Popularidad en navidad',
          data,
          backgroundColor,
          borderColor,
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <Pie data={getPieChartData()} options={options} />
  );
}
