import React,{Component} from 'react';
import './App.css';
import img_fav from '../../assets/img/estrela_fav.png'
import Topo from '../../components/Header/Header'

class  App extends Component{
  
  constructor(){
    super();
    this.state = {
      listaPlataformas: [],
      listaLancamento: []
    }
  }
  
  adicionarLancamentos = (data) =>{
    this.setState({listaLancamento: data})
    console.log(this.state.listaLancamento)
  }
  adicionarPlataformas = (data) =>{
    this.setState({listaPlataformas: data})
    console.log(this.state.listaPlataformas)
  }

  getParsedDate = (date) =>{
    date = String(date).split('T');
    var days = String(date[0]).split('-');
    return [days[2].toString() +'/'+ days[1].toString()+'/'+ days[0].toString()];
  }
  
  componentDidMount(){
    fetch('http://localhost:5000/api/Plataformas')
    .then(response => response.json())
    .then(data => this.adicionarPlataformas(data))
    .catch(error => console.log(error));

    fetch('http://localhost:5000/api/Titulos/')
    .then(response => response.json())
    .then(data => this.adicionarLancamentos(data))
    .catch(error => console.log(error));
  }

  favoritar = (idTitulo) =>{
  }


  buscarPorPlataforma = (e) =>{
    var e = document.getElementById("selectPlat");
    var result = e.options[e.selectedIndex].value;
    console.log(result);

    if(result != '0'){
      const url = 'http://localhost:5000/api/Plataformas/titulos/'+result;
      console.log(url)
      fetch(url)
      .then(response => response.json())
      .then(data => this.adicionarLancamentos(data))
      .catch(error => console.log(error));
    }
    else{
      fetch('http://localhost:5000/api/Titulos/')
      .then(response => response.json())
      .then(data => this.adicionarLancamentos(data))
      .catch(error => console.log(error));
    }
  }

  buscarPorData= (e) => {
    e.preventDefault();
    const data = document.querySelector('#inpData');
    console.log(data.value);

    if (data.value.length > 5) {
      var days = String(data.value).split('-');
      var dataTratada = [days[2].toString() +'-'+ days[1].toString()+'-'+ days[0].toString()];
      fetch('http://localhost:5000/api/Titulos/data/'+dataTratada)
        .then(response => response.json())
        .then(data => this.adicionarLancamentos(data))
        .catch(error => console.log(error));
      
    }
  }

  render(){
    return (
      <div className="App">
        <Topo/>
        <main>


      <div id="separador">

        <div id="ladoEsq">
          <div id='preto'></div>
          <div id='filtros'>

            <h3>Filtrar por:</h3>
            
            <select name="plataforma" onChange={this.buscarPorPlataforma} id="selectPlat">
              <option value="0">Plataforma</option> 
              {this.state.listaPlataformas.map(e => {
                return(
                  <option value={e.nome}>{e.nome}</option>
                  )})} 
            </select>
            
            <div id="data">
              <form>
                <label for="data">Data</label>
                <input type="date" name="data" id="inpData"/>
                <input type="submit" value="Buscar" onClick={this.buscarPorData}/>
              </form>
            </div>
          </div>
        </div>
        
        <section id='sec_lanc'>

          <h2>Confira os últimos lançamentos do mundo cinematográfico!</h2>
          <div id="lancamentos">

              {this.state.listaLancamento.map(e => {
                return(
                  <div className="lancamento">
                    <div className="lancamentoDiv">
                    <p className="titulo">{e.nome}</p>
                    <img className="img_fav" src={img_fav} alt="Favoritar lançamento" onClick={this.favoritar(e.id)}/>
                    </div>
                    <p>Sinopse: {e.sinopse}</p>
                    <p>Duração do filme: {e.duracao} </p>
                    <p>Plataforma: {e.plataforma}</p>
                    <p>Categoria: {e.categoria}</p>
                    <p>Classificação: {e.classificacao}</p> 
                    <p>Data de Lançamento: {this.getParsedDate(e.dataLancamento)}</p>
                  </div>
              )})}
          </div>
      </section>
    
      </div>
      </main>
      </div>
    );
  }
}
    
    export default App;
    