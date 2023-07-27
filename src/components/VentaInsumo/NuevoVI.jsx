import React, { useState, useEffect } from "react";
import moment from "moment";
import "moment/locale/es"; // Importar el idioma español de moment.js
import { Apiurl } from "../../services/apirest";
import axios from "axios";
//template
import Header from "../../template/Header";

const NuevoVI = () => {
  let idEmpleado = JSON.parse(localStorage.getItem("id"));
  const [form, setForm] = useState({
    idCliente: "",
    idEmpleado: idEmpleado,
    descripcion: "",
    precioTotal: "",
    fechaVenta: moment().format("YYYY-MM-DD"), // Inicializar la fecha con la fecha actual
  });
  const [cliente, setCliente] = useState([]);
  const [empleado, setEmpleado] = useState([]);
  const [venta2, setVenta2] = useState([]);

  const calcularTotal = () => {
    let total = 0;

    venta2.forEach((insumo) => {
      total += insumo.precioInsumo * insumo.cantidadIngresada; // Utilizar la cantidad ingresada para calcular el total
    });

    return total;
  };

  useEffect(() => {
    let clienteUrl = Apiurl + "cliente";
    let empleadoUrl = Apiurl + "empleado";

    // Obtener datos de venta del localStorage
    const ventaData = localStorage.getItem("venta2");

    axios
      .all([axios.get(clienteUrl), axios.get(empleadoUrl)])
      .then(
        axios.spread((clienteResponse, empleadosResponse) => {
          setCliente(clienteResponse.data);
          setEmpleado(empleadosResponse.data);
          setVenta2(
            ventaData
              ? JSON.parse(ventaData).map((insumo) => ({
                  ...insumo,
                  cantidadOriginal: insumo.cantidadInsumo, // Almacenar el valor original de la cantidad
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

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  
    // Calcular la cantidad total que se va a actualizar para cada insumo
    const cantidadTotalPorInsumo = venta2.reduce((acc, insumo) => {
      const cantidadIngresada = insumo.cantidadIngresada;
      return acc + cantidadIngresada;
    }, 0);
  
    // Actualizar cantidad disponible en el estado venta2 antes de enviar los datos al servidor
    const updatedVenta2 = venta2.map((insumo) => ({
      ...insumo,
      cantidadInsumo: insumo.cantidadInsumo - insumo.cantidadIngresada,
    }));
  
    // Registrar la venta en el servidor
    try {
      const res = await axios.post(Apiurl + "ventaInsumo", form, config);
      console.log(res);
      alert("Se registró la venta correctamente.");
  
      // Actualizar la cantidad disponible de los insumos en el servidor (solo una vez)
      await handleUpdateInsumo(updatedVenta2[0].id, updatedVenta2[0].cantidadInsumo + cantidadTotalPorInsumo);
    } catch (error) {
      console.log(error);
      alert("No se pudo registrar la venta.");
    } finally {
      window.location.href = "/VentaInsumo/VisVentIns";
      // Eliminar datos de la tabla del LocalStorage solo si el registro es exitoso
      localStorage.removeItem("venta2");
  
      // Limpiar tabla y campos del formulario solo si el registro es exitoso
      setForm({
        idCliente: "",
        idEmpleado: "",
        fechaVenta: moment().format("YYYY-MM-DD"), // Restablecer la fecha actual
      });
    }
  };
  
  const manejadorChange = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

    if (
      e.target.name === "idCliente" ||
      e.target.name === "idEmpleado" ||
      e.target.name === "venta2"
    ) {
      const descripcion = venta2
        .map((insumo) => `${insumo.cantidadIngresada} ${insumo.nombreInsumo} S/${(insumo.precioInsumo * insumo.cantidadIngresada).toFixed(2)}`)
        .join(", ");

      setForm((prevState) => ({
        ...prevState,
        descripcion: descripcion.trim(),
      }));
    }
  };

  const handleDeleteInsumo = (index) => {
    const updatedVenta2 = [...venta2];
    const deletedInsumo = updatedVenta2.splice(index, 1)[0];
    setVenta2(updatedVenta2);
    localStorage.setItem("venta2", JSON.stringify(updatedVenta2));

    // Actualizar descripción en el estado form
    const descripcion = updatedVenta2
      .map((insumo) => `${insumo.cantidadIngresada} ${insumo.nombreInsumo} S/${(insumo.precioInsumo * insumo.cantidadIngresada).toFixed(2)}`)
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
    const nombreInsumo = deletedInsumo.nombreInsumo;
    setForm((prevState) => ({
      ...prevState,
      [`nombreInsumo${index}`]: nombreInsumo,
    }));
  };

  const handleCantidadChange = (index, value) => {
    const updatedVenta2 = [...venta2];
    const cantidadIngresada = value.trim() !== "" ? parseInt(value, 10) : "";
    const cantidadRestante = updatedVenta2[index].cantidadOriginal - cantidadIngresada;

    // Verificar si la cantidad ingresada excede la cantidad disponible
    if (cantidadIngresada > updatedVenta2[index].cantidadOriginal) {
      alert("La cantidad ingresada no puede ser mayor a la cantidad disponible.");
      return;
    }

    updatedVenta2[index].cantidadIngresada = cantidadIngresada;
    updatedVenta2[index].cantidadInsumo = cantidadRestante;
    setVenta2(updatedVenta2);

    const descripcion = updatedVenta2
      .map((insumo) => `${insumo.cantidadIngresada} ${insumo.nombreInsumo} S/${(insumo.precioInsumo * insumo.cantidadIngresada).toFixed(2)}`)
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
  }, [venta2]);

  const handleUpdateInsumo = async (insumoId, newCantidadInsumo) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // Petición al servidor para actualizar la cantidadInsumo del insumo
      await axios.put(
        `${Apiurl}insumo/${insumoId}`,
        { cantidadInsumo: newCantidadInsumo },
        config
      );

      alert("Se actualizó la cantidad disponible del insumo correctamente.");
    } catch (error) {
      console.log(error);
      alert("Hubo un error al actualizar la cantidad disponible del insumo.");
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        <h3>Registrar venta insumo</h3>
        <br />
        <form className="form-horizontal" onSubmit={handleSubmit}>
          {/* Código del formulario de clientes */}
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

          <br></br>

          <table className="venta-table custom3-table">
            {/* Tabla para mostrar los insumos */}
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Cantidad Disponible</th>
                <th>Cantidad</th>
                <th>Costo Total</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {venta2.map((insumo, index) => {
                const cantidadOriginal = insumo.cantidadOriginal;

                return (
                  <tr key={index}>
                    <td>{insumo.id}</td>
                    <td>{insumo.nombreInsumo}</td>
                    <td>S/ {insumo.precioInsumo}</td>
                    <td>
                      <span>{insumo.cantidadInsumo}</span> {/* Mostrar la cantidad ingresada */}
                    </td>
                    <td>
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        max={cantidadOriginal} // Establecer el valor máximo como el valor original
                        value={insumo.cantidadIngresada} // Usar la cantidad ingresada
                        onChange={(e) => handleCantidadChange(index, e.target.value)}
                      />
                    </td>
                    <td>
                      S/ {(insumo.precioInsumo * insumo.cantidadIngresada).toFixed(2)}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteInsumo(index)}
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

          <a className="btn btn-dark" href="/Insumo/VisInsumo">
            Volver
          </a>
        </form>
      </div>
    </React.Fragment>
  );
};

export default NuevoVI;