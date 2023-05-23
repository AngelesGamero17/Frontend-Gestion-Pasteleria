import React from "react";
import "../assets/css/ProformaProducto.css"; // Importar archivo CSS para los estilos

class ProformaProducto extends React.Component {
  state = {
    proforma: [],
    decodedValue: null,
  };

  componentDidMount() {
    // Obtener la proforma del localStorage
    const proforma = localStorage.getItem("proforma");

    // Verificar si la proforma existe y actualizar el estado
    if (proforma) {
      const proformaArray = JSON.parse(proforma); // Convertir la cadena JSON a un array de objetos
      this.setState({ proforma: proformaArray });
    }
  }

  calcularTotal() {
    const { proforma} = this.state;
    let total = 0;

    proforma.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });

    return total;
  }

 ////borrar acciones de proforma
 borrarProforma = (index) => {
  // Obtener la proforma actual del estado
  const { proforma } = this.state;

  // Crear una copia de la proforma actual
  const updatedProforma = [...proforma];

  // Eliminar el elemento seleccionado por su índice
  updatedProforma.splice(index, 1);

  // Actualizar el estado con la nueva proforma
  this.setState({ proforma: updatedProforma });

  // Actualizar el localStorage con la nueva proforma
  localStorage.setItem("proforma", JSON.stringify(updatedProforma));
};


  render() {
    const { proforma, decodedValue } = this.state;
    const total = this.calcularTotal();

    return (
      <React.Fragment>
        <h1>Proforma producto</h1>

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
            {proforma.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>S/ {producto.precio}</td>
                <td>{producto.cantidad}</td>
                <td>S/ {(producto.precio * producto.cantidad).toFixed(2)}</td>
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

export default ProformaProducto;


