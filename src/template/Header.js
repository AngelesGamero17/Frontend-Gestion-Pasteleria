import React from "react";

class Header extends React.Component{
    render(){
        return(
            <nav className="navbar bg-warning" data-bs-theme="dark">
                <a className="navbar-brand" href="#">Consumir Api</a>
            </nav>

        );
    }
}

export default Header;