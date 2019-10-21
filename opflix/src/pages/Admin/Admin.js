import React,{Component} from 'react';
import './Admin.css';
import {Link} from 'react-router-dom';
import Topo from '../../components/Header/Header';
import Rodape from '../../components/Footer/Footer';
import { parseJwt } from '../../services/auth.js';

class Admin extends Component{

    constructor(){
        super();
        this.state = {
            listaTitulo: [],
            listaPlataforma: [],
            listaCategoria: [],
            listaTipoTitulo:[{idTipoTitulo: 1, Tipo: "Filme"},{idTipoTitulo: 2, Tipo: "Serie"},{idTipoTitulo: 3, Tipo: "Documentario"}],
            tituloSelecionado: [],
            token: localStorage.getItem('usuario-token'),
            permissao: false
          }
    }

    
    componentDidMount(){
        fetch('http://localhost:5000/api/Titulos/')
        .then(response => response.json())
        .then(data => this.setState({listaTitulo: data}))
        .catch(error => console.log(error));
        
        fetch('http://localhost:5000/api/Categorias/',{
            method: 'GET', 
            headers: {
                'Accept': 'application/json',
                "Authorization":"Bearer " + this.state.token
            }
        })
        .then(response => response.json())
        .then(data => this.adicionarCategoria(data))
        .catch(error => console.log(error));
        
        fetch('http://localhost:5000/api/Plataformas')
        .then(response => response.json())
        .then(data => this.adicionarPlataformas(data))
        .catch(error => console.log(error));
    }

    adicionarPlataformas = (data) =>{
        this.setState({listaPlataforma: data})
        // console.log(this.state.listaPlataformas)
    }

    adicionarCategoria = (e) =>{
        this.setState({listaCategoria: e});
        // console.log(this.state.listaCategoria)
    }

    selecionarTitulo = (e) =>{
        var e = document.getElementById("selectTitulo");
        var result = e.options[e.selectedIndex].value;
        this.guardarTitulo(result);
    }

    guardarTitulo = (idTitulo)=>{
        this.state.listaTitulo.forEach(e => {
            if(e.idTitulo == idTitulo){
                this.setState({tituloSelecionado: e});
            }
        });
    }

    editarTitulo = (e)=>{
        e.preventDefault();
        var nome = document.getElementById("admin__input--nome").value;
        var sinopse = document.getElementById("admin__input--sinopse").value;
        var duracao = document.getElementById("admin__input--duracao").value;
        var dataLancamento = document.getElementById("admin__input--dataLancamento").value;
        var classificacao = document.getElementById("admin__input--classificacao").value;
        
        var listaplataformas = document.getElementById("admin__select--plataformas");
        var idPlataforma = listaplataformas.options[listaplataformas.selectedIndex].value;

        var listacategorias = document.getElementById("admin__select--categorias");
        var idCategoria = listacategorias.options[listacategorias.selectedIndex].value;

        var listatipostitulos = document.getElementById("admin__select--tipostitulos");
        var idTipoTitulo = listatipostitulos.options[listatipostitulos.selectedIndex].value;

        console.log(nome,sinopse,duracao,dataLancamento,classificacao, idPlataforma ,idCategoria,idTipoTitulo)
        
        fetch('http://localhost:5000/api/Titulos/'+this.state.tituloSelecionado.idTitulo,{
            method: 'PUT', 
            headers: {
                'Accept': 'application/json',
                "Authorization":"Bearer " + this.state.token
            },
            body: JSON.stringify({
                nome: nome,
                sinopse: sinopse,
                duracao: duracao,
                dataLancamento: dataLancamento,
                idplataforma: idPlataforma,
                idcategoria: idCategoria,
                idtipoTitulo: idTipoTitulo,
                classificacao: classificacao
            })
        })
        .then(response => response.json())
        .then(data => data.status == 200? console.log('deu bom') : console.log('deu ruim'))
        .catch(error => console.log(error));
    }
    
    atualizarInputs = ()=>{
        var nome = document.getElementById("admin__input--nome").value;
        var sinopse = document.getElementById("admin__input--sinopse").value;
        var duracao = document.getElementById("admin__input--duracao").value;
        var dataLancamento = document.getElementById("admin__input--dataLancamento").value;
        var classificacao = document.getElementById("admin__input--classificacao").value;
        this.setState({tituloSelecionado:[{nome: nome, sinopse: sinopse, duracao: duracao, dataLancamento: dataLancamento, classificacao: classificacao}]})
    }

    render(){
        return(
            <div className="App">
                <Topo/>
                <h2>Administrador</h2>
                <div id="admin__div--separador">
                    <section className="admin__separador--sections">

                        <select name="plataforma" onChange={this.selecionarTitulo} id="selectTitulo">
                            <option value="0">Titulo à editar</option> 
                            {this.state.listaTitulo.map(e => {
                                return(
                                    <option value={e.idTitulo}>{e.nome}</option>
                                    )})} 
                        </select>
                    </section>

                    <section className="admin__separador--sections">
                        <form  id="admin__section--form">
{/* COLOCAR INPUT COM ID DO TITULO DESABILITADO */}
                            <input className="admin__form--inputs" type="text" id="admin__input--nome" name="nome" onChange={this.atualizarInputs} value={this.state.tituloSelecionado.nome}/>
                            <input className="admin__form--inputs" type="text" id="admin__input--sinopse" name="sinopse" onChange={this.atualizarInputs} value={this.state.tituloSelecionado.sinopse}/>
                            <input className="admin__form--inputs" type="text" id="admin__input--duracao" name="duracao" value={this.state.tituloSelecionado.duracao}/>
                            <input className="admin__form--inputs" type="text" id="admin__input--dataLancamento" name="dataLancamento" value={this.state.tituloSelecionado.dataLancamento}/>
                            <input className="admin__form--inputs" type="text" id="admin__input--classificacao" name="classificacao" value={this.state.tituloSelecionado.classificacao}/>
                            <select id="admin__select--plataformas" name="plataformas">
                                <option value="0">Plataforma</option> 
                                {this.state.listaPlataforma.map(e => {
                                    return(
                                        <option value={e.idPlataforma}>{e.nome}</option>
                                    )})} 
                            </select>
                            <select id="admin__select--categorias" name="categorias">
                                <option value="0">Categoria</option> 
                                {this.state.listaCategoria.map(e => { 
                                return(
                                    <option value={e.idCategoria}>{e.nome}</option>
                                )})} 
                            </select>
                            <select id="admin__select--tipostitulos" name="tiposTitulos">

                            <option value="0">Tipo Titulo</option> 
                                {this.state.listaTipoTitulo.map(e => { 
                                return(
                                    <option value={e.idTipoTitulo}>{e.Tipo}</option>
                                )})} 


                            </select>
                            <input type="submit" onClick={this.editarTitulo} value="Editar"/>
                        </form>
                    </section>
                </div>
                <Rodape/>
            </div>
        )
    }
}
export default Admin;