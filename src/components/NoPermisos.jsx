import React from "react";

//template
import Header from "../template/Header";

class NoPermisos extends React.Component {
 
  render() {
    return (
      <React.Fragment>
        <Header />
        <h1>NO tienes permiso autorizado , para realizar esta accion</h1>


      </React.Fragment>
    );
  }
}

export default NoPermisos;