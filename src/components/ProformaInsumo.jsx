import React from "react";
import "../assets/css/ProformaInsumo.css"; // Importar archivo CSS para los estilos

class ProformaInsumo extends React.Component {
  state = {
    proforma1: [],
    decodedValue: null,
  };

  componentDidMount() {
    // Obtener la proforma del localStorage
    const proforma1 = localStorage.getItem("proforma1");

    // Verificar si la proforma existe y actualizar el estado
    if (proforma1) {
      const proformaArray = JSON.parse(proforma1); // Convertir la cadena JSON a un array de objetos
      this.setState({ proforma1: proformaArray });
    }
  }

  calcularTotal() {
    const { proforma1 } = this.state;
    let total = 0;

    proforma1.forEach((insumo) => {
      total += insumo.precio * insumo.cantidad;
    });

    return total;
  }

  ////borrar acciones de proforma
  borrarProforma = (index) => {
    // Obtener la proforma actual del estado
    const { proforma1 } = this.state;

    // Crear una copia de la proforma actual
    const updatedProforma = [...proforma1];

    // Eliminar el elemento seleccionado por su índice
    updatedProforma.splice(index, 1);

    // Actualizar el estado con la nueva proforma
    this.setState({ proforma1: updatedProforma });

    // Actualizar el localStorage con la nueva proforma
    localStorage.setItem("proforma1", JSON.stringify(updatedProforma));
  };


  render() {
    const { proforma1, decodedValue } = this.state;
    const total = this.calcularTotal();

    return (
      <React.Fragment>
        <h1>Proforma Insumo</h1>

        {/* Mostrar el valor decodificado */}
        {decodedValue && (
          <div>
            <h2>Valor decodificado: {decodedValue}</h2>
          </div>
        )}

        <table className="proforma-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Costo Total</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proforma1.map((insumo, index) => (
              <tr key={index}>
                <td>{insumo.nombre}</td>
                <td>S/ {insumo.precio}</td>
                <td>{insumo.cantidad}</td>
                <td>S/ {(insumo.precio * insumo.cantidad).toFixed(2)}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => this.borrarProforma(index)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3">Total</td>
              <td>S/ {(total).toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </React.Fragment>
    );
  }
}

export default ProformaInsumo;


