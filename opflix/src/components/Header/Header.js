import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/img/kkkkkkkkkkkkkklogo.png'
import './Header.css'

class Header extends Component{
    constructor(){
        super();
        this.state = {
          token: localStorage.getItem('usuario-token')
        }
      }
      
    loginLogado = () => {
        if(this.state.token != null){
            return(
                <Link id='login_nav--a' onClick={this.deslogar} >Deslogar</Link>
                // <button id='login_nav--a' onClick={this.deslogar()} value="Deslogar"/>
                );
            }
            else{
                return(
                    <Link id='login_nav--a' to="/login">Login</Link>
                    );
            }
    }
                
    deslogar = () =>{
        // console.log("oi");
        localStorage.removeItem("usuario-token");    
        window.location.reload();
    }
      
    render(){
        return(
            <header>
                <nav>
                    <Link to="/"><img src={Logo} alt="opflix_logo"/></Link>
                    {this.loginLogado()}
                </nav>
                <h1>OPFLIX</h1>
            </header>
        );
    }   
}

export default Header;