import React from 'react';
//css
import '../assets/css/Login.css';
//imagenes
import logo from '../assets/img/logo.png';
//servicios
import { Apiurl } from '../services/apirest';
//libreriass
import axios from 'axios';

class Login extends React.Component {

  state = {
    form: {
      "email": "",
      "password": ""
    },
    error:false,
    errorMsg: ""
  }

  manejadorSubmit = e => {
    e.preventDefault();
  }

  manejadorChange = async e => {
    await this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value
      }

    })

  }
  manejadorBoton = () => {
    let url = Apiurl + "login";
    axios
      .post(url, this.state.form)
      .then((response) => {
        if (response.data.message === "Logueado correctamente") {
          localStorage.setItem("token", response.data.token);
          window.location.href = "./Dashboard";
        } else {
          this.setState({
            error: true,
            errorMsg: response.data.message,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          error: true,
          errorMsg: "Error: Al conectar con el Api",
        });
      });
  };

  render() {
    return (
      <React.Fragment>

        <div className="wrapper fadeInDown">
          <div id="formContent">

            <div className="fadeIn first">
              <br></br>
              <img src={logo} width="100px" alt="User Icon" />
              <br></br>
            </div>


            <form onSubmit={this.manejadorSubmit}>
              <input type="text" className="fadeIn second" name="email" placeholder="Email" onChange={this.manejadorChange} />
              <input type="password" className="fadeIn third" name="password" placeholder="Password" onChange={this.manejadorChange} />
              <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton} />
            </form>

        {this.state.error === true &&
            <div className="alert alert-danger" role="alert">
                {this.state.errorMsg}
            </div>
        }

          </div>
        </div>
      </React.Fragment>

    );
  }

}

export default Login;
