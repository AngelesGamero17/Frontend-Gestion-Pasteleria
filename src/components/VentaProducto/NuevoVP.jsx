import React, { useState, useEffect } from "react";
import { Apiurl } from "../../services/apirest";
import moment from "moment";
import axios from "axios";
//template
import Header from "../../template/Header";

const NuevoVP = () => {
  let idEmpleado = JSON.parse(localStorage.getItem('id'));
  const [form, setForm] = useState({
    idCliente: "",
    idEmpleado: idEmpleado,
    descripcion: "",
    precioTotal: "",
    fechaVenta: moment().format("YYYY-MM-DD"),
  });
  const [cliente, setCliente] = useState([]);
  const [empleado, setEmpleado] = useState([]);
  const [venta, setVenta] = useState([]);

  const calcularTotal = () => {
    let total = 0;

    venta.forEach((producto) => {
      total += producto.precio * producto.cantidadIngresada; // Utilizar la cantidad ingresada para calcular el total
    });

    return total;
  };

  useEffect(() => {
    let clienteUrl = Apiurl + "cliente";
    let empleadoUrl = Apiurl + "empleado";

    // Obtener datos de venta del localStorage
    const ventaData = localStorage.getItem("venta");

    axios
      .all([axios.get(clienteUrl), axios.get(empleadoUrl)])
      .then(
        axios.spread((clienteResponse, empleadosResponse) => {
          setCliente(clienteResponse.data);
          setEmpleado(empleadosResponse.data);
          setVenta(
            ventaData
              ? JSON.parse(ventaData).map((producto) => ({
                  ...producto,
                  cantidadOriginal: producto.cantidad, // Almacenar el valor original de la cantidad
                  cantidadIngresada: "", // Inicializar la cantidad ingresada en 0
                }))
              : []
          );
        })
      )
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Sumar los valores de venta al estado form
    const formWithVenta = {
      ...form,
      venta: venta.map((producto) => ({
        ...producto,
        cantidad: producto.cantidadIngresada, // Utilizar la cantidad ingresada en lugar de la cantidad original
      })),
    };

    axios
      .post(Apiurl + "ventaProducto", formWithVenta, config)
      .then((res) => {
        console.log(res);
        alert("Se registró la venta correctamente.");
        window.location.href = "/VentaProducto/VisVentPro";
        // Eliminar datos de la tabla del LocalStorage solo si el registro es exitoso
        localStorage.removeItem("venta");
      })
      .catch((error) => {
        console.log(error);
        alert("No se pudo registrar la venta.");
      })
      .finally(() => {
        // Limpiar tabla y campos del formulario solo si el registro es exitoso
        setForm({
          idCliente: "",
          idEmpleado: "",
          fechaVenta: moment().format("YYYY-MM-DD"),
        });
      });
  };

  const manejadorChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (
      e.target.name === "idCliente" ||
      e.target.name === "idEmpleado" ||
      e.target.name === "venta"
    ) {
      const descripcion = venta
        .map((producto) => `${producto.cantidadIngresada} ${producto.nombre} S/${(producto.precio * producto.cantidadIngresada).toFixed(2)}`)
        .join(", ");

      setForm((prevState) => ({
        ...prevState,
        descripcion: descripcion.trim(),
      }));
    }
  };

  const handleDeleteProduct = (index) => {
    const updatedVenta = [...venta];
    const deletedProduct = updatedVenta.splice(index, 1)[0];
    setVenta(updatedVenta);
    localStorage.setItem("venta", JSON.stringify(updatedVenta));

    // Actualizar descripción en el estado form
    const descripcion = updatedVenta
      .map((producto) => `${producto.cantidadIngresada} ${producto.nombre} S/${(producto.precio * producto.cantidadIngresada).toFixed(2)}`)
      .join(", ");
    setForm((prevState) => ({
      ...prevState,
      descripcion: descripcion.trim(),
    }));

    // Calcular y actualizar precio total en el estado form
    const total = calcularTotal();
    setForm((prevState) => ({
      ...prevState,
      precioTotal: total.toFixed(2),
    }));

    // Actualizar nombre del producto en el estado form
    const nombreProducto = deletedProduct.nombre;
    setForm((prevState) => ({
      ...prevState,
      [`nombreProducto${index}`]: nombreProducto,
    }));
  };

  const handleCantidadChange = (index, value) => {
    const updatedVenta = [...venta];
    const cantidadIngresada = value.trim() !== '' ? parseInt(value, 10) : '';
    const cantidadRestante = updatedVenta[index].cantidadOriginal - cantidadIngresada;
  
    // Verificar si la cantidad ingresada excede la cantidad disponible
    if (cantidadIngresada > updatedVenta[index].cantidadOriginal) {
      alert('La cantidad ingresada no puede ser mayor a la cantidad disponible.');
      return;
    }
  
    updatedVenta[index].cantidadIngresada = cantidadIngresada;
    updatedVenta[index].cantidad = cantidadRestante;
    setVenta(updatedVenta);
  
    const descripcion = updatedVenta
      .map((producto) => `${producto.cantidadIngresada} ${producto.nombre}  S/${(producto.precio * producto.cantidadIngresada).toFixed(2)}`)
      .join(", ");
    setForm((prevState) => ({
      ...prevState,
      descripcion: descripcion.trim(),
    }));
  
    const total = calcularTotal();
    setForm((prevState) => ({
      ...prevState,
      precioTotal: total.toFixed(2),
    }));
  };

  useEffect(() => {
    const total = calcularTotal();
    setForm((prevState) => ({
      ...prevState,
      precioTotal: total.toFixed(2),
    }));
  }, [venta]);

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <h3>Registrar ventaProducto</h3>
        <br />
        <form className="form-horizontal" onSubmit={handleSubmit}>
          <div className="container">
            <br />
            <div className="row">
              <div className="col-sm-12">
                <label className="col-md-2 control-label">CLIENTE</label>
                <div className="col-md-10">
                  <select
                    className="form-control"
                    name="idCliente"
                    value={form.idCliente}
                    onChange={manejadorChange}
                  >
                    <option value="">Seleccione cliente</option>
                    {cliente.map((tipo) => (
                      <option key={tipo.ID} value={tipo.ID}>
                        {tipo.nomCli}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
      <br />
      <div className="row">
        <div className="col-sm-12">
          <label className="col-md-2 control-label">EMPLEADO</label>
          <div className="col-md-10">
            <select
              className="form-control"
              name="idEmpleado"
              value={form.idEmpleado}
              onChange={manejadorChange}
              disabled // Deshabilitar el campo de selección
            >
              {empleado.map((tipo) => (
                // Mostrar solo la opción con el idEmpleado
                tipo.ID === idEmpleado && (
                  <option key={tipo.ID} value={tipo.ID}>
                    {tipo.nomEmp}
                  </option>
                )
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
    
          <br></br>

          <table className="venta-table custom3-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad Disponible</th>
                <th>Cantidad</th>
                <th>Costo Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {venta.map((producto, index) => {
                const cantidadOriginal = producto.cantidadOriginal;

                return (
                  <tr key={index}>
                    <td>{producto.nombre}</td>
                    <td>S/ {producto.precio}</td>
                    <td>
                      <span>{producto.cantidad}</span> {/* Mostrar la cantidad ingresada */}
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        max={cantidadOriginal} // Establecer el valor máximo como el valor original
                        value={producto.cantidadIngresada} // Usar la cantidad ingresada
                        onChange={(e) =>
                          handleCantidadChange(index, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      S/ {(producto.precio * producto.cantidadIngresada).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteProduct(index)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="4">Total</td>
                <td>S/ {calcularTotal().toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          <div className="row">
            <div className="col-sm-12">
              <label className="col-md-2 control-label">DESCRIPCION</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  name="descripcion"
                  placeholder="descripcion"
                  type="text"
                  value={form.descripcion}
                  onChange={manejadorChange}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <label className="col-md-2 control-label">PRECIO - TOTAL</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  name="precioTotal"
                  placeholder="precioTotal"
                  type="text"
                  value={form.precioTotal}
                  onChange={manejadorChange}
                />
              </div>
            </div>
          </div>

          <br></br>
          <div className="row">
            <div className="col-sm-12">
              <label className="col-md-2 control-label">FECHA - VENTA</label>
              <div className="col-md-10">
                <input
                  className="form-control"
                  name="fechaVenta"
                  placeholder="Fecha de venta"
                  type="date"
                  value={form.fechaVenta}
                  onChange={manejadorChange}
                />
              </div>
            </div>
          </div>

          <br></br>
          <button
            type="submit"
            className="btn btn-success"
            style={{ marginRight: "10px" }}
          >
            Registrar
          </button>

          <a className="btn btn-dark" href="/Producto/VisProducto">
              Volver
            </a>

        </form>
      </div>
    </React.Fragment>
  );
};

export default NuevoVP;