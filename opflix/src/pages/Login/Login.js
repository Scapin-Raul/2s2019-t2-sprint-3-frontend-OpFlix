import React,{Component} from 'react';
import './Login.css';
import Logo from '../../assets/img/kkkkkkkkkkkkkklogo.png'
import {Link} from 'react-router-dom';
import Rodape from '../../components/Footer/Footer'


class Login extends Component{

    constructor(){
        super();
        this.state = {
            email: "",
            senha: ""
        }
    }

    definirLogin = (data) =>{
        if(data.token != null){
            console.log(data);
            localStorage.setItem("usuario-token",data.token);
            // this.props.history.push('/');
            window.location.reload();
        }
        else{
            const mensagemErro = document.querySelector("#login__form--mensagemErro");
            mensagemErro.innerHTML = "Email ou senha inválidos";
        }

    }

    atualizarInputs = () =>{
        this.setState({email: document.querySelector("#email").value}); 
        this.setState({senha: document.querySelector("#senha").value}); 
    }

    efetuarLogin = (e) =>{
        e.preventDefault();

        const url = "http://192.168.4.93:5000/api/Login/";

        fetch(url,{
            method: 'POST', body: JSON.stringify({email: this.state.email, senha: this.state.senha}),
            headers: {"Content-Type": "application/json"}
          })
        .then(response => response.json())
        .then(data => this.definirLogin(data))
        .catch(error => console.log(error));

    }
    
    render(){
        return(
            <div className="App">
                <nav id="login__div--nav">
                    <Link className="centro" to="/"><img src={Logo} alt="opflix_logo"/></Link>
                </nav>                
                <h1>OPFLIX</h1>
                
                <section id="login__div--section">
                    <h2>LOGIN</h2>

                    <form>
                        <p id="login__form--mensagemErro"></p>
                        <label className="label"  for="email">Email</label>
                        <input type="text" id="email" name="email" onChange={this.atualizarInputs}/>
                        <label className="label" for="senha">Senha</label>
                        <input type="password" id="senha" name="senha" onChange={this.atualizarInputs}/>
                        <input type="submit" value="Fazer Login" onClick={this.efetuarLogin}/>
                    </form>

                    <p>Está tendo problemas com seu login? <br/>Problema seu kasfdauhhfy7q8gebtwfyq</p>
                    <Link id='a' to="/cadastro">Cadastro</Link>

                </section>


                <Rodape/>

            </div>
        )
}
}
export default Login;