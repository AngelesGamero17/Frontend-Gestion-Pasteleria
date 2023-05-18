import React from "react";
 

const LogoutButton = ({ onLogout }) => {
    return (
      <button class="btn btn-danger" onClick={onLogout}>Cerrar sesión</button>
      
    );
  };


  
  export default LogoutButton;

