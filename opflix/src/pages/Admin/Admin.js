import React,{Component} from 'react';
import './Admin.css';
import {Link} from 'react-router-dom';
import Topo from '../../components/Header/Header';
import Rodape from '../../components/Footer/Footer';
import { parseJwt } from '../../services/auth.js';
import axios from 'axios';

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
            permissao: false,
            tituloAdicionar: []
          }
    }

    atualizarPagina = () =>{
        window.location.reload();
    }

    componentDidMount(){
        fetch('http://192.168.4.203:5000/api/Titulos/')
        .then(response => response.json())
        .then(data => this.setState({listaTitulo: data}))
        .catch(error => console.log(error));
        
        fetch('http://192.168.4.203:5000/api/Categorias/',{
            method: 'GET', 
            headers: {
                'Accept': 'application/json',
                "Authorization":"Bearer " + this.state.token
            }
        })
        .then(response => response.json())
        .then(data => this.adicionarCategoria(data))
        .catch(error => console.log(error));
        
        fetch('http://192.168.4.203:5000/api/Plataformas')
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

        var id = document.getElementById("admin__input--id").value; 
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
        
        const url = 'http://192.168.4.203:5000/api/Titulos/'+id;
        console.log(url);

        axios.put(url,{    
            nome: nome,
            sinopse: sinopse,
            duracao: duracao,
            dataLancamento: dataLancamento,
            idplataforma: parseInt(idPlataforma),
            idcategoria: parseInt(idCategoria),
            idtipoTitulo: parseInt(idTipoTitulo),
            classificacao: classificacao
        }, 
         {headers: {Authorization: "Bearer " + this.state.token}
    })
    .then(response => console.log(response.data))
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

    adicionarTitulo = () =>{

        var nome = document.getElementById("admin__input--nome--adicionar").value;
        var sinopse = document.getElementById("admin__input--sinopse--adicionar").value;
        var duracao = document.getElementById("admin__input--duracao--adicionar").value;
        var dataLancamento = document.getElementById("admin__input--dataLancamento--adicionar").value;
        var classificacao = document.getElementById("admin__input--classificacao--adicionar").value;

        var listaplataformas = document.getElementById("admin__select--plataformas--adicionar");
        var idPlataforma = listaplataformas.options[listaplataformas.selectedIndex].value;

        var listacategorias = document.getElementById("admin__select--categorias--adicionar");
        var idCategoria = listacategorias.options[listacategorias.selectedIndex].value;

        var listatipostitulos = document.getElementById("admin__select--tipostitulos--adicionar");
        var idTipoTitulo = listatipostitulos.options[listatipostitulos.selectedIndex].value;

        const url = 'http://192.168.4.203:5000/api/Titulos/';

        axios.post(url,{    
                nome: nome,
                sinopse: sinopse,
                duracao: duracao,
                dataLancamento: dataLancamento,
                idplataforma: parseInt(idPlataforma),
                idcategoria: parseInt(idCategoria),
                idtipoTitulo: parseInt(idTipoTitulo),
                classificacao: classificacao
            }, 
             {headers: {Authorization: "Bearer " + this.state.token}
        })
        .then(response => console.log(response.data), this.atualizarPagina)
        .catch(error => console.log(error));

    }

    deletarTitulo = () =>{
        var e = document.getElementById("admin__select--deletar");
        var idTituloDeletar = e.options[e.selectedIndex].value;
                
        const url = 'http://192.168.4.203:5000/api/Titulos/'+idTituloDeletar;
        
        console.log(url);

        axios.delete(url, 
            {headers: {Authorization: "Bearer " + this.state.token}
        })
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    }

    cadastrarCategoria = (e)=>{
        e.preventDefault();
        const nomeCategoria = document.getElementById('admin__input--nomecategoria').value;
        console.log(nomeCategoria);
        
        const url = "http://192.168.4.203:5000/api/Categorias/"
        axios.post(url,{    
            nome: nomeCategoria
        }, 
        {headers: {Authorization: "Bearer " + this.state.token}
        })
        .then(response => console.log(response.data), this.atualizarPagina)
        .catch(error => console.log(error));
    }

    deletarCategoria = (e)=>{
        var e = document.getElementById("admin__deletar--categorias");
        var idCategoriaDeletar = e.options[e.selectedIndex].value;
                
        const url = 'http://192.168.4.203:5000/api/Categorias/'+idCategoriaDeletar;

        axios.delete(url, 
            {headers: {Authorization: "Bearer " + this.state.token}
        })
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    }

    cadastrarPlataforma = (e)=>{
        e.preventDefault();
        const nomePlataforma = document.getElementById('admin__input--nomeplataforma').value;
        console.log(nomePlataforma);
        
        const url = "http://192.168.4.203:5000/api/Plataformas/"
        axios.post(url,{    
            nome: nomePlataforma
        }, 
        {headers: {Authorization: "Bearer " + this.state.token}
        })
        .then(response => console.log(response.data), this.atualizarPagina)
        .catch(error => console.log(error));
    }

    deletarPlataforma = (e)=>{
        var e = document.getElementById("admin__deletar--plataformas");
        var idPlataformaDeletar = e.options[e.selectedIndex].value;
                
        const url = 'http://192.168.4.203:5000/api/Plataformas/'+idPlataformaDeletar;

        axios.delete(url, 
            {headers: {Authorization: "Bearer " + this.state.token}
        })
        .then(response => console.log(response.data))
        .catch(error => console.log(error));
    }
    

     render(){
        return(
            <div className="App">
                <Topo/>
                <h2>Administrador</h2>

                <div id="admin__div__lancamentos">
                    <div id="admin__div--adicionar" className="admin__add--del">
                        <h3>Adicionar lançamento</h3>
                        <input placeholder="Titulo" className="admin__form--inputs--adicionar" type="text" id="admin__input--nome--adicionar" name="nome-adicionar" onChange={this.atualizarInputs_adicionar}/>
                        <input placeholder="Sinopse" className="admin__form--inputs--adicionar" type="text" id="admin__input--sinopse--adicionar" name="sinopse-adicionar"  onChange={this.atualizarInputs_adicionar}/>
                        <input placeholder="Duracao" className="admin__form--inputs--adicionar" type="text" id="admin__input--duracao--adicionar" name="duracao-adicionar" onChange={this.atualizarInputs_adicionar}/>
                        <input placeholder="Data Lançamento (yyyy/mm/dd)" className="admin__form--inputs--adicionar" type="text" id="admin__input--dataLancamento--adicionar" name="dataLancamento-adicionar" onChange={this.atualizarInputs_adicionar}/>
                        <input placeholder="Classificação etária" className="admin__form--inputs--adicionar" type="text" id="admin__input--classificacao--adicionar" name="classificacao-adicionar" onChange={this.atualizarInputs_adicionar}/>
                        <select id="admin__select--plataformas--adicionar" name="plataformas---adicionar">
                            <option value="0">Plataforma</option> 
                            {this.state.listaPlataforma.map(e => {
                                return(
                                    <option value={e.idPlataforma}>{e.nome}</option>
                                    )})} 
                        </select>
                        <select id="admin__select--categorias--adicionar" name="categorias">
                            <option value="0">Categoria</option> 
                            {this.state.listaCategoria.map(e => { 
                                return(
                                    <option value={e.idCategoria}>{e.nome}</option>
                                    )})} 
                        </select>
                        <select id="admin__select--tipostitulos--adicionar" name="tiposTitulos">

                        <option value="0">Tipo Titulo</option> 
                            {this.state.listaTipoTitulo.map(e => { 
                                return(
                                    <option value={e.idTipoTitulo}>{e.Tipo}</option>
                                    )})} 


                        </select>
                                
                        <input type="submit" onClick={this.adicionarTitulo} value="Adicionar"/>
                    </div>

                    <div id="admin__div--editar"  className="admin__add--del">
                        
                        <section className="admin__separador--sections">
                    
                        <h3>Editar Lançamentos</h3>

                            <select name="titulos" onChange={this.selecionarTitulo} id="selectTitulo">
                                <option value="0">Titulo à editar</option> 
                                {this.state.listaTitulo.map(e => {
                                    return(
                                        <option value={e.idTitulo}>{e.nome}</option>
                                        )})} 
                            </select>
                    
                            <form  id="admin__section--form">
                                
                                <input className="admin__form--inputs" disabled type="number" id="admin__input--id" name="id" onChange={this.atualizarInputs} value={this.state.tituloSelecionado.idTitulo}/>
                                <input className="admin__form--inputs" type="text" id="admin__input--nome" name="nome" onChange={this.atualizarInputs} value={this.state.tituloSelecionado.nome}/>
                                <input className="admin__form--inputs" type="text" id="admin__input--sinopse" name="sinopse" onChange={this.atualizarInputs} value={this.state.tituloSelecionado.sinopse}/>
                                <input className="admin__form--inputs" type="text" id="admin__input--duracao" name="duracao" onChange={this.atualizarInputs} value={this.state.tituloSelecionado.duracao}/>
                                <input className="admin__form--inputs" type="text" id="admin__input--dataLancamento" name="dataLancamento" onChange={this.atualizarInputs} value={this.state.tituloSelecionado.dataLancamento}/>
                                <input className="admin__form--inputs" type="text" id="admin__input--classificacao" name="classificacao" onChange={this.atualizarInputs} value={this.state.tituloSelecionado.classificacao}/>
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

                    <div id="admin__div--deletar" className="admin__add--del">
                        <h3>Deletar Lançamentos</h3>
                        <select name="titulos" onChange={this.selecionarTitulo} id="admin__select--deletar">
                                <option value="0">Deletar titulo</option> 
                                {this.state.listaTitulo.map(e => {
                                    return(
                                        <option value={e.idTitulo}>{e.nome}</option>
                                        )})} 
                        </select>
                        <input type="submit" id="admin__submit--deletar" onClick={this.deletarTitulo} value="Editar"/>
                    </div>
                </div>

                <div id="admin__div--cateplat">

                    <div id="admin__div--categorias">

                        <div id="admin__categorias">
                            <div id="admin__categorias--adicionar">
                                <h3>Adicionar categoria</h3>
                                <form>
                                    <input type="text" id="admin__input--nomecategoria" placeholder="Nome da categoria"/>
                                    <input onClick={this.cadastrarCategoria} type="submit" value="Cadastrar"/>
                                </form>
                            </div>

                            <div id="admin__categorias--deletar">
                                <h3>Deletar categoria</h3>

                                <select id="admin__deletar--categorias" name="categorias">
                                            <option value="0">Categoria</option> 
                                            {this.state.listaCategoria.map(e => { 
                                                return(
                                                    <option value={e.idCategoria}>{e.nome}</option>
                                                    )})} 
                                </select>
                                <input onClick={this.deletarCategoria} type="submit" value="Deletar"/>
                            </div>
                        </div>

                    </div>

                    <div id="admin__plataformas">
                        <div id="admin__plataformas--adicionar">
                            <h3>Adicionar plataforma</h3>
                            <form>
                                <input type="text" id="admin__input--nomeplataforma" placeholder="Nome da plataforma"/>
                                <input onClick={this.cadastrarPlataforma} type="submit" value="Cadastrar"/>
                            </form>
                        </div>

                        <div id="admin__plataformas--deletar">
                            <h3>Deletar plataforma</h3>

                            <select id="admin__deletar--plataformas" name="plataformas">
                                        <option value="0">Plataforma</option> 
                                        {this.state.listaPlataforma.map(e => { 
                                            return(
                                                <option value={e.idPlataforma}>{e.nome}</option>
                                                )})} 
                            </select>
                            <input onClick={this.deletarPlataforma} type="submit" value="Deletar"/>
                        </div>

                    </div>


                </div>
               
               
                <Rodape/>
            </div>
        )
    }
}
export default Admin;