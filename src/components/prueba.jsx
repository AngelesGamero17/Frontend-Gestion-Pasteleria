import React from 'react';
import Quagga from 'quagga';
import axios from 'axios';

class ScannerAndForm extends React.Component {
  state = {
    barcode: '',
    productName: '',
    // Agrega aquí otros campos del formulario que necesites
  };

  componentDidMount() {
    Quagga.init({
      inputStream: {
        name: 'Live',
        type: 'LiveStream',
        target: document.querySelector('#scanner-container'),
        constraints: {
          facingMode: 'environment', // Usa la cámara trasera del dispositivo
        },
      },
      decoder: {
        readers: ['ean_reader'], // Especifica el tipo de código de barras que deseas escanear, en este caso EAN
      },
    }, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    });

    Quagga.onDetected(this.handleBarcode);
  }

  componentWillUnmount() {
    Quagga.stop();
    Quagga.offDetected(this.handleBarcode);
  }

  handleBarcode = (result) => {
    const barcode = result.codeResult.code;
    this.setState({ barcode });
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { barcode, productName } = this.state;

    // Aquí puedes enviar el código de barras y el nombre del producto al servidor para el registro
    // Ejemplo: realizar una solicitud HTTP utilizando axios
    axios.post('/api/products', { barcode, productName })
      .then(response => {
        console.log('Producto registrado:', response.data);
        // Realiza cualquier acción adicional después del registro exitoso
      })
      .catch(error => {
        console.error('Error al registrar el producto:', error);
        // Realiza cualquier acción adicional en caso de error
      });
  };

  render() {
    const { barcode, productName } = this.state;

    return (
      <div>
        <div id="scanner-container"></div>

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="barcodeInput">Código de barras:</label>
          <input
            id="barcodeInput"
            name="barcode"
            type="text"
            value={barcode}
            onChange={this.handleInputChange}
          />

          <label htmlFor="productNameInput">Nombre del producto:</label>
          <input
            id="productNameInput"
            name="productName"
            type="text"
            value={productName}
            onChange={this.handleInputChange}
          />

          {/* Agrega aquí otros campos del formulario que necesites */}
          
          <button type="submit">Registrar producto</button>
        </form>
      </div>
    );
  }
}

export default ScannerAndForm;
