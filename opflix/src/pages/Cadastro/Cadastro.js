import React,{Component} from 'react';
import './Cadastro.css';
import {Link} from 'react-router-dom';
import Topo from '../../components/Header/Header';
import Rodape from '../../components/Footer/Footer';
import Logo from '../../assets/img/kkkkkkkkkkkkkklogo.png'
import axios from 'axios';


class Cadastro extends Component{

    constructor(){
        super();
        this.state = {
            token: localStorage.getItem('usuario-token')
          }
    }


    cadastrarUsuario = (e)=>{
        e.preventDefault();
        const mensagemErro = document.querySelector("#cadastro__erro");
        mensagemErro.innerHTML = "";

        var textoErro = "";

        const nome = document.getElementById("cadastro__inpNome").value;
        const email =document.getElementById("cadastro__inpEmail").value;
        const senha =document.getElementById("cadastro__inpSenha").value;
        const data = document.getElementById("cadastro__inpData").value;

        console.log(nome,email,senha,data)

        
        if(nome.length >= 3 && senha.length >= 4 && email.length >= 4  && email.includes("@") && data.length > 4){
            const url = "http://localhost:5000/api/Usuarios/";
            
            axios.post(url,{
                nome: nome,
                email: email,
                senha: senha,
                datanascimento: data
            }, 
            {headers: {Authorization: "Bearer " + this.state.token}
        })     
        .then(response => response.status == 200? this.props.history.push('/login',) : console.log('deu erro ai') )
        .catch(error => console.log(error));
        
        mensagemErro.innerHTML = "Email ou senha inválidos";
    }
    
    
        if(nome.length < 3){
            textoErro= "O nome deve conter pelo menos 3 caracteres";
        }    
        if(senha.length < 4){
            textoErro+= " A senha deve conter pelo menos 4 caracteres";
        }
        if(email.length < 4 || !email.includes("@")){
            textoErro += " O email deve conter pelo menos 4 caracteres e @";
        }
        if(data.length < 4){
            textoErro += " Deve-se escolher uma data de nascimento";
             
        }
            
        mensagemErro.innerHTML = textoErro;
    }
    
    render(){
        return(
            <div>
                <nav id="login__div--nav">
                    <Link className="centro" to="/"><img src={Logo} alt="opflix_logo"/></Link>
                </nav>                
                <h1>OPFLIX</h1>
                
                <form id="cadastro__form">
                    <h2 id="cadastro__h2">CADASTRO</h2>
                    <p id="cadastro__p--informativo">Para ter acesso a mais funcionalidade dentro do site, cadastre-se. :D</p>
                    <br/>
                <p id="cadastro__erro"></p>
                    <label className="cadastro__label"  for="nome">Nome</label>
                    <input id="cadastro__inpNome" type="text" minlength="3" required/>
    
                    <label className="cadastro__label"  for="email">Email</label>
                    <input id="cadastro__inpEmail" type="email" minlength="4" required/>
                    <label className="cadastro__label"  for="senha">Senha</label>
                    <input id="cadastro__inpSenha" type="password" minlength="4" required/>
                    <label className="cadastro__label"  for="dataNascimento">Data de Nascimento</label>
                    <input id="cadastro__inpData" type="date" name="data" required />
                    <br/>

                    <input type="submit" value="Cadastrar" onClick={this.cadastrarUsuario}/>
                </form>
                <Rodape/>
            </div>
        );
        
        
    }
}
export default Cadastro;
    