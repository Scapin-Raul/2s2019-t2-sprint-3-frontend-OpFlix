import React,{Component} from 'react';
import './App.css';
import img_fav from '../../assets/img/estrela_fav.png'
import Topo from '../../components/Header/Header'
import Rodape from '../../components/Footer/Footer'


class  App extends Component{
  
  constructor(){
    super();
    this.state = {
      listaPlataformas: [],
      listaLancamento: [],
      token: localStorage.getItem('usuario-token')
    }
  }
  
  adicionarLancamentos = (data) =>{
    if(data.length == 0){
      //MENSAGEM DE ERRO
    }
    else{
      this.setState({listaLancamento: data})
    }
    // console.log(this.state.listaLancamento)
  }
  adicionarPlataformas = (data) =>{
    this.setState({listaPlataformas: data})
    // console.log(this.state.listaPlataformas)
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

  buscarPorPlataforma = (e) =>{
    var e = document.getElementById("selectPlat");
    var result = e.options[e.selectedIndex].value;
    // console.log(result);
    
    if(result != '0'){
      const url = 'http://localhost:5000/api/Plataformas/titulos/'+result;
      // console.log(url)
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
    // console.log(data.value);
    
    if (data.value.length > 5) {
      var days = String(data.value).split('-');
      var dataTratada = [days[2].toString() +'-'+ days[1].toString()+'-'+ days[0].toString()];
      fetch('http://localhost:5000/api/Titulos/data/'+dataTratada)
      .then(response => response.json())
      .then(data => this.adicionarLancamentos(data))
      .catch(error => console.log(error));
      
    }
  }
  
  favoritar = (idTitulo) =>{
    const url = "http://localhost:5000/api/Usuarios/favoritos/"+idTitulo;
    // console.log(url)

    fetch(url,{
            method: 'POST', 
            headers: {
              'Accept': 'application/json',
              "Authorization":"Bearer " + this.state.token
              // "Content-Type": "application/json",
            }
          })
    .then(response => response.json())
    .then(data => this.definirLogin(data))
    .catch(error => console.log(error));
  }
  
  buscarFavoritos = (e) =>{
    if(this.state.token != null){

      const url = "http://localhost:5000/api/Usuarios/favoritos"

      fetch(url,{
        method: 'GET', 
        headers: {
          'Accept': 'application/json',
          "Authorization":"Bearer " + this.state.token
        }
      })
      .then(response => response.json())
      .then(data => this.adicionarLancamentos(data))
      .catch(error => console.log(error));

    }
    else{
      console.log('b')
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

            <h3 id="home__filtros--h3">Filtrar por:</h3>
            
            <div id="home__div--plat" className="home__filtros_individual">

              <label for="plataforma">Plataforma:</label>
              <select name="plataforma" onChange={this.buscarPorPlataforma} id="selectPlat">
                <option value="0">Todas</option> 
                {this.state.listaPlataformas.map(e => {
                  return(
                    <option value={e.nome}>{e.nome}</option>
                    )})} 
              </select>
            </div>
            
            <div id="data" className="home__filtros_individual">
              <form>
                <label for="data">Data:</label>
                <input type="date" name="data" id="inpData"/>
                <input type="submit" value="Buscar" onClick={this.buscarPorData}/>
              </form>
            </div>

            <div id="home__div--fav" className="home__filtros_individual">
              <label for="fav">Favoritos:</label> <br/>
              <button name="fav" onClick={this.buscarFavoritos}>Buscar</button>
            </div>
          
          </div>
        </div>
        
        <section id='sec_lanc'>

          <h2>Confira os últimos lançamentos do mundo cinematográfico!</h2>
          <p id="home__section--erro"></p>
          <div id="lancamentos">

              {
                this.state.listaLancamento.map(e => {
                  return(
                    <div className="lancamento">
                    <div className="lancamentoDiv">
                    <p className="titulo">{e.nome}</p>
                    <img className="home__img--fav" onClick={() => this.favoritar(e.idTitulo)} src={img_fav} alt="Favoritar/Desfavoritar lançamento"/>
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

      <Rodape/>
      </div>
    );
  }
}
    
    export default App;
    