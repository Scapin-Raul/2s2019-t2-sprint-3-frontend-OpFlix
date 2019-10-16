import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/img/kkkkkkkkkkkkkklogo.png'
import './Header.css'

class Header extends Component{
    
    
    render(){
        return(
            <header>
                <nav>
                    <Link to="/"><img src={Logo} alt="opflix_logo"/></Link>
                    {/* <a  onClick={this.redirecionar}>Login</a> */}
                    <Link id='login_nav--a' to="/login">Login</Link>
                </nav>
                <h1>OPFLIX</h1>
            </header>
        );
    }   
}

export default Header;