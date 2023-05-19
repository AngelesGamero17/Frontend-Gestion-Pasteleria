import React from "react";
import Header from "../template/Header";

class ProformaInsumo extends React.Component {
    state = {
        proforma1: [],
        decodedValue: null,
      };
    
      componentDidMount() {
        // Obtener la proforma del localStorage
        const proforma1 = localStorage.getItem('proforma1');
      
        // Verificar si la proforma existe y actualizar el estado
        if (proforma1) {
          const proformaArray = JSON.parse(proforma1); // Convertir la cadena JSON a un array de objetos
          this.setState({ proforma1: proformaArray });
        }
      }
    
  render() {

const { proforma1, decodedValue } = this.state;

    return (
      <React.Fragment>
        <h1>Proforma Insumo</h1>
        
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
            {proforma1.map((insumo, index) => (
              <tr key={index}>
                <td>{insumo.nombre}</td>
                <td>{insumo.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </React.Fragment>
    );
  }
}

export default ProformaInsumo;