import React from "react";

class ProformaProducto extends React.Component {
  state = {
    proforma: [],
    decodedValue: null,
  };

  componentDidMount() {
    // Obtener la proforma del localStorage
    const proforma = localStorage.getItem('proforma');
  
    // Verificar si la proforma existe y actualizar el estado
    if (proforma) {
      const proformaArray = JSON.parse(proforma); // Convertir la cadena JSON a un array de objetos
      this.setState({ proforma: proformaArray });
    }
  }

  render() {
    const { proforma, decodedValue } = this.state;

    return (
      <React.Fragment>
        <h1>Proforma de Productos</h1>
        
        {/* Mostrar el valor decodificado */}
        {decodedValue && (
          <div>
            <h2>Valor decodificado: {decodedValue}</h2>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {proforma.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{producto.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </React.Fragment>
    );
  }
}

export default ProformaProducto;