import React, { useState, useEffect } from "react";
import { Apiurl } from "../services/apirest";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import "../assets/css/ProformaProducto.css";
import html2pdf from "html2pdf.js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const StripePromise = loadStripe(
  "pk_test_51NIkg2EE8ZogoiscLHUfilWWAvhTXYKRxuXPzO1P44bxYhTo3Q5ThsLXTBHhAeuhxheRzQljSZQKVqWbpNHHLyK0000vcALwcQ"
);

const CheckoutForm = ({ total, proforma }) => {
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
            amount: total , // Multiply the total by 100 to get the amount in cents
            products: proforma.map((producto) => producto.nombre),
          });
          console.log("Array de productos:", proforma);
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

const ProformaProducto = () => {
  const [proforma, setProforma] = useState([]);
  const [decodedValue, setDecodedValue] = useState(null);
  const [imagen, setImagen] = useState([]);

  useEffect(() => {
    const proformaData = localStorage.getItem("proforma");
    let url = Apiurl + "imagen";
    axios.get(url).then((response) => {
      setImagen(response.data);
    });

    if (proformaData) {
      const proformaArray = JSON.parse(proformaData);
      setProforma(proformaArray);
    }
  }, []);

  const calcularTotal = () => {
    let total = 0;

    proforma.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });

    return total;
  };

  const borrarProforma = (index) => {
    const updatedProforma = [...proforma];
    updatedProforma.splice(index, 1);
    setProforma(updatedProforma);
    localStorage.setItem("proforma", JSON.stringify(updatedProforma));
  };

  const generatePDF = () => {
    const total = calcularTotal();

    const tableHTML = `
    <center>
      <br>
      <br>
      <h1>🄿🅁🄾🄵🄾🅁🄼🄰 🄿🅁🄾🄳🅄🄲🅃🄾</h1>
      <br>
      <br>
      <table class="proforma-table custom-table">
          <thead>
            <tr>
              <th style="border: 1px solid black; padding: 8px;">Nombre</th>
              <th style="border: 1px solid black; padding: 8px;">Precio</th>
              <th style="border: 1px solid black; padding: 8px;">Cantidad</th>
              <th style="border: 1px solid black; padding: 8px;">Costo Total</th>
            </tr>
          </thead>
          <tbody>
            ${proforma
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

  let firstImage = imagen.length > 0 ? imagen[0].imgProProduc : "";

  return (
    <React.Fragment>
      <div
        className="fondoVistaProforma1-container"
        style={{
          backgroundImage: `url('${firstImage}')`,
          backgroundAttachment: "fixed",
        }}
      >
        <a className="nav-link active btn btn-warning d-block mx-auto" href="./MostrarProductos">
          Volver a la Página Principal
        </a>

        <div className="container containerFondoProforma1">
          {decodedValue && (
            <div>
              <h2>Valor decodificado: {decodedValue}</h2>
            </div>
          )}

          <Elements stripe={StripePromise}>
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <CheckoutForm total={calcularTotal()} proforma={proforma} />
              </div>
              <h1>🄿🅁🄾🄵🄾🅁🄼🄰 🄿🅁🄾🄳🅄🄲🅃🄾</h1>
            </div>
          </Elements>

          <table className="proforma-table custom2-table">
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
                    <button className="btn btn-danger" onClick={() => borrarProforma(index)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3">Total</td>
                <td>S/ {calcularTotal().toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
          <div className="text-center mt-3">
            <button className="btn btn-success" onClick={generatePDF}>
              Descargar PDF
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProformaProducto;
