import React from 'react';
import Logo from '../../assets/img/kkkkkkkkkkkkkklogo.png'
import './Header.css'

function Header(){
    return(
        <header>
            <nav>
                <a href=""><img src={Logo} alt="opflix_logo"/></a>
                <a id='login' href="">Login</a>
            </nav>
            <h1>OPFLIX</h1>
        </header>
    );
}

export default Header;