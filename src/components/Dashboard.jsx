import React from "react";
import Header from "../template/Header";
import dashboardImg from '../assets/img/dashboard.jpg';

class Dashboard extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Header />
          <div>
              <br></br>
              <img src={dashboardImg} width="2000px" height="900px" alt="Img dashboard" />
              <br></br>
          </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
