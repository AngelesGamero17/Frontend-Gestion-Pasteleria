import React from "react";

//template
import Header from "../template/Header";

class Dashboard extends React.Component {
 
  render() {
    return (
      <React.Fragment>
        <Header />
        <img src="https://scontent.flim16-1.fna.fbcdn.net/v/t39.30808-6/326922253_575087721140686_7960215630832054171_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeG7AHtex5MO6I8a-b_m61cTI4WJj85Q0f0jhYmPzlDR_TiZwhEGO-HBf0xkcww7Jz3Ll5G8RDDqQgRBPtp-cvaj&_nc_ohc=rN069Z5IYWkAX-lg2fk&_nc_oc=AQntDtzpqw_mZ40g6OcDnqKD8cQ0Yp-r4MuqGKuy54i583P6BaJDatImP5h87khkQMw&_nc_ht=scontent.flim16-1.fna&oh=00_AfAwWg-H8ey8cQ5BZ-Y1u05FH6bOLYmrAl2soW3gnqFPQA&oe=646AB1C6" class="d-block w-100" alt="Imagen Dashbord"></img>

      </React.Fragment>
    );
  }
}

export default Dashboard;