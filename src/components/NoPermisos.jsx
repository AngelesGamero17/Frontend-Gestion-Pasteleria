import React from "react";
import Header from "../template/Header";
class NoPermisos extends React.Component {
 
  render() {
    return (
      <React.Fragment>
        <Header />
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <br />
          <img src="https://thumbs.gfycat.com/WigglyExaltedGnu-size_restricted.gif" alt="GIF de texto no acceso" />
          <br />
          <img src="https://cdn.jsdelivr.net/gh/sircam-html/ipfs.pg@main/store-front/access_not_allowed.gif" alt="GIF de la chica" />
        </div>


      </React.Fragment>
    );
  }
}

export default NoPermisos;