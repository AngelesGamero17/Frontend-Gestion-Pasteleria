import React from "react";
import Header from "../template/Header";
import accesoNegado from '../assets/img/accesoNegado.png';

class NoPermisos extends React.Component {
 
  render() {
    return (
      <React.Fragment>
        <Header />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <br />
          <img src={accesoNegado} width="1500px" height="900px" alt="Img dashboard" />
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default NoPermisos;