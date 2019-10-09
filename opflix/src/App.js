import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import img from '../src/assets/img/estrela_fav.png'

class  App extends Component{
  
  constructor(){
    super();
    this.state = {
      listaPlataformas: [],
      listaLancamento: []
    }
  }

  componentDidMount(){
    fetch('http://localhost:5000/api/Plataformas')
    .then(response => response.json())
    .then(data => this.setState({ listaPlataformas: data}))
    .catch(error => console.log(error));

    fetch('http://localhost:5000/api/Titulos')
    .then(response => response.json())
    .then(data => this.setState({ listaLancamento: data}))
    .catch(error => console.log(error));

    console.log(this.state.listaLancamento,this.state.listaPlataformas)
  }


  render(){
    return (
      <div className="App">
      
        <div id="filtros">
          <h3>Filtrar por:</h3>
          
          <select name="plataforma" id="">
          <option value="0">Plataformas</option> 
          <option value="">Plataforma 1</option>
          <option value="">plataforma 2</option>
          </select>
          
          <div id="data">
          <label for="data">Data</label>
          <input type="date" name="data" id=""/>
          </div>
        </div>
        
        <div id="lancamentos">
          <div class="lancamento">
            <p>Titulo: </p>
            <p>Sinopse: </p>
            <p>Duração do filme: </p>
            <p>Plataforma: </p>
            <p>Categoria: </p>
            <p>Classificação: L</p> 
            <img className="img_fav" src={img} alt=""/>
          </div>
        </div>
          
      </div>
    );
  }
}
    
    export default App;
    