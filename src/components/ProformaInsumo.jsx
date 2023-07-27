import React, { useState } from "react";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import html2pdf from "html2pdf.js";
import "../assets/css/ProformaInsumo.css"; // Importar archivo CSS para los estilos
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const StripePromise = loadStripe(
  "pk_test_51NIkg2EE8ZogoiscLHUfilWWAvhTXYKRxuXPzO1P44bxYhTo3Q5ThsLXTBHhAeuhxheRzQljSZQKVqWbpNHHLyK0000vcALwcQ"
);

const CheckoutForm = ({ total, proforma1 }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (stripe && elements) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (!error) {
        const { id } = paymentMethod;
        try {
          const { data } = await axios.post(Apiurl + "stripe", {
            id,
            amount: total, // Multiplica el total por 100 para obtener el monto en centavos
            products: proforma1.map((insumo) => insumo.nombre),
          });
          console.log("Array de productos:", proforma1);
          console.log(data);

          elements.getElement(CardElement).clear();
          setShowSuccessMessage(true);
          setErrorMessage("");
        } catch (error) {
          console.log(error);
          setErrorMessage(
            "Error al realizar el pago. Por favor, intenta nuevamente."
          );
        }
      }

      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4">
      <h3 className="text-center my-2">Precio total: {total}</h3>
      <div className="form-group">
        <CardElement className="form-control" />
      </div>
      <button className="btn btn-success" disabled={!stripe}>
        {loading ? (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          "Pagar"
        )}
      </button>
      <br />
      {showSuccessMessage && (
        <h1
          style={{ fontSize: "24px", textAlign: "center" }}
          className="text-success"
        >
          ¡Pago exitoso!
        </h1>
      )}
      {errorMessage && (
        <h1
          style={{ fontSize: "24px", textAlign: "center" }}
          className="text-danger"
        >
          {errorMessage}
        </h1>
      )}
    </form>
  );
};

class ProformaInsumo extends React.Component {
  state = {
    proforma1: [],
    decodedValue: null,
    imagen: [],
  };

  componentDidMount() {
    // Obtener la proforma del localStorage
    const proforma1 = localStorage.getItem("proforma1");
    let url = Apiurl + "imagen";
    axios.get(url).then((response) => {
      this.setState({
        imagen: response.data,
      });
    });
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

  // Borrar acciones de proforma
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

  generatePDF = () => {
    const { proforma1 } = this.state;
    const total = this.calcularTotal();

    const tableHTML = `
    <center>
      <br>
      <br>
      <h1>🄿🅁🄾🄵🄾🅁🄼🄰 🄸🄽🅂🅄🄼🄾</h1>
      <br>
      <br>
      <table class="proforma-table custom1-table">
          <thead>
            <tr>
              <th style="border: 1px solid black; padding: 8px;">Nombre</th>
              <th style="border: 1px solid black; padding: 8px;">Precio</th>
              <th style="border: 1px solid black; padding: 8px;">Cantidad</th>
              <th style="border: 1px solid black; padding: 8px;">Costo Total</th>
            </tr>
          </thead>
          <tbody>
            ${proforma1
              .map(
                (insumo) => `
                <tr>
                  <td style="border: 1px solid black; padding: 8px;">${insumo.nombre}</td>
                  <td style="border: 1px solid black; padding: 8px;">S/ ${insumo.precio}</td>
                  <td style="border: 1px solid black; padding: 8px;">${insumo.cantidad}</td>
                  <td style="border: 1px solid black; padding: 8px;">S/ ${(insumo.precio * insumo.cantidad).toFixed(2)}</td>
                </tr>
              `
              )
              .join("")}
          </tbody>
          <tfoot>
            <tr>
              <td style="border: 1px solid black; padding: 8px;" colspan="3">Total</td>
              <td style="border: 1px solid black; padding: 8px;">S/ ${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>
      </center>
    `;

    const element = document.createElement("div");
    element.innerHTML = tableHTML;

    html2pdf().from(element).save("proforma.pdf");
  };


  render() {
    const { proforma1, decodedValue } = this.state;

    let firstImage = this.state.imagen[0] ? this.state.imagen[0].imgProIns : "";

    return (
      <React.Fragment>
        <div
          className="fondoVistaProforma-container"
          style={{
            backgroundImage: `url('${firstImage}')`,
            backgroundAttachment: "fixed",
          }}>
          
          <a
            className="nav-link active btn btn-warning d-block mx-auto"
            href="./MostrarInsumo">Volver a la Página Principal</a>

          <div className="container containerFondoProforma ">
            {/* Mostrar el valor decodificado */}
            {decodedValue && (
              <div>
                <h2>Valor decodificado: {decodedValue}</h2>
              </div>
            )}

             <Elements stripe={StripePromise}>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <CheckoutForm total={this.calcularTotal()} proforma1={proforma1} />
              </div>
              <h1>🄿🅁🄾🄵🄾🅁🄼🄰 🄸🄽🅂🅄🄼🄾</h1>
            </div> 
          </Elements>
            
            <table className="proforma-table custom1-table">
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
                      <button
                        className="btn btn-danger"
                        onClick={() => this.borrarProforma(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="3">Total</td>
                  <td>S/ {this.calcularTotal().toFixed(2)}</td>
                </tr>
              </tfoot>
            </table>

            <div className="text-center mt-3">
              <button className="btn btn-success" onClick={this.generatePDF}>Descargar PDF</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ProformaInsumo;
