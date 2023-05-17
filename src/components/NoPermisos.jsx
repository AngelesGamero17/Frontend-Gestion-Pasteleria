import React from "react";
import Header from "../template/Header";

class NoPermisos extends React.Component {
 
  render() {
    return (
      <React.Fragment>
        <Header />
        <img src="https://png.pngtree.com/png-vector/20220723/ourmid/pngtree-login-access-denied-vector-illustration-png-image_6041364.png" class="d-block w-100" alt="No autorizado"></img>

      </React.Fragment>
    );
  }
}

export default NoPermisos;