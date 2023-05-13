import React from "react";

//template
import Header from "../template/Header";

class Dashboard extends React.Component {
 
  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <h3>Bienvenidos a la Pasteleria  </h3>
        </div>

        
      </React.Fragment>
    );
  }
}

export default Dashboard;