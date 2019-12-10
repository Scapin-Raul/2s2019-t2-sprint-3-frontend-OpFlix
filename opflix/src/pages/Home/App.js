import React, { Component } from 'react';
import './App.css';
import img_fav from '../../assets/img/estrela_fav.png'
import Topo from '../../components/Header/Header'
import Rodape from '../../components/Footer/Footer'
import { Link } from 'react-router-dom';


class App extends Component {

  constructor() {
    super();
    this.state = {
      listaPlataformas: [],
      listaLancamento: [],
      token: localStorage.getItem('usuario-token')
    }
  }

  adicionarLancamentos = (data, num) => {
    const pErro = document.querySelector("#home__filtros--erro");

    if (data.mensagem === "Não há titulos nesta plataforma.") {
      this.buscarTitulosPadrao(1);
      pErro.innerHTML = "Não há titulos nesta plataforma.";
    }
    else if (data.mensagem === "Você não favoritou nenhum título") {
      this.buscarTitulosPadrao(1);
      pErro.innerHTML = "Você não favoritou nenhum título.";
    }
    else {
      this.setState({ listaLancamento: data })
      if (num !== 1) {
        pErro.innerHTML = "";
      }
    }
  }

  adicionarPlataformas = (data) => {
    this.setState({ listaPlataformas: data })
    // console.log(this.state.listaPlataformas)
  }

  getParsedDate = (date) => {
    date = String(date).split('T');
    var days = String(date[0]).split('-');
    return [days[2].toString() + '/' + days[1].toString() + '/' + days[0].toString()];
  }

  buscarTitulosPadrao = (num) => {
    fetch('http://192.168.4.93:5000/api/Titulos/')
      .then(response => response.json())
      .then(data => this.adicionarLancamentos(data, num))
      .catch(error => console.log(error));
  }

  componentDidMount() {
    fetch('http://192.168.4.93:5000/api/Plataformas')
      .then(response => response.json())
      .then(data => this.adicionarPlataformas(data))
      .catch(error => console.log(error));

    this.buscarTitulosPadrao();
  }

  buscarPorPlataforma = (e) => {
    var e = document.getElementById("selectPlat");
    var result = e.options[e.selectedIndex].value;
    // console.log(result);

    if (result != '0') {
      const url = 'http://192.168.4.93:5000/api/Plataformas/titulos/' + result;
      // console.log(url)
      fetch(url)
        .then(response => response.json())
        .then(data => this.adicionarLancamentos(data))
        .catch(error => console.log(error));
    }
    else {
      this.buscarTitulosPadrao();
    }
  }

  buscarPorData = (e) => {
    e.preventDefault();
    const data = document.querySelector('#inpData');
    // console.log(data.value);

    if (data.value.length > 5) {
      var days = String(data.value).split('-');
      var dataTratada = [days[2].toString() + '-' + days[1].toString() + '-' + days[0].toString()];
      fetch('http://192.168.4.93:5000/api/Titulos/data/' + dataTratada)
        .then(response => response.json())
        .then(data => this.adicionarLancamentos(data))
        .catch(error => console.log(error));

    }
  }

  favoritar = (idTitulo) => {
    if (this.state.token != null) {
      const url = "http://192.168.4.93:5000/api/Usuarios/favoritos/" + idTitulo;
      // console.log(url)

      fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Authorization": "Bearer " + this.state.token
          // "Content-Type": "application/json",
        }
      })
        .then(response => response.json())
        .then(data => this.definirLogin(data))
        .catch(error => console.log(error));
    }
    else {
      const pErro = document.querySelector("#home__filtros--erro");
      pErro.innerHTML = "Você deve estar logado para favoritar um titulo.";

    }
  }

  buscarFavoritos = (e) => {
    var valorCheckbox = document.querySelector("#home__fav--checkbox").checked;

    if (valorCheckbox) {
      const pErro = document.querySelector("#home__filtros--erro");

      if (this.state.token != null) {
        const url = "http://192.168.4.93:5000/api/Usuarios/favoritos"

        fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            "Authorization": "Bearer " + this.state.token
          }
        })
          .then(response => response.json())
          .then(data => this.adicionarLancamentos(data))
          .catch(error => console.log(error));
        pErro.innerHTML = "";

      }
      else {
        pErro.innerHTML = "Você deve estar logado para usar esta opção.";

      }
    } else {
      this.buscarTitulosPadrao();
    }
  }


  render() {
    return (
      <div className="App">
        <Topo />
        <main>


          <div id="separador">

            <div id="ladoEsq">
              <div id='preto'></div>
              <div id='filtros'>

                <h3 id="home__filtros--h3">Filtrar por:</h3>
                <p id="home__filtros--erro"></p>


                <div id="home__div--plat" className="home__filtros_individual">

                  <label for="plataforma">Plataforma:</label>
                  <select name="plataforma" onChange={this.buscarPorPlataforma} id="selectPlat">
                    <option value="0">Todas</option>
                    {this.state.listaPlataformas.map(e => {
                      return (
                        <option value={e.nome}>{e.nome}</option>
                      )
                    })}
                  </select>
                </div>

                <div id="data" className="home__filtros_individual">
                  <form>
                    <label for="data">Data:</label>
                    <input type="date" name="data" id="inpData" />
                    <input type="submit" value="Buscar" onClick={this.buscarPorData} />
                  </form>
                </div>

                <div id="home__div--fav" className="home__filtros_individual">
                  <label for="fav">Buscar por favoritos:</label> <br />
                  <input type="checkbox" name="fav" id="home__fav--checkbox" onChange={this.buscarFavoritos} />
                </div>

              </div>

              <Link id="localizacoes" to="/localizacoes"><p>Localizações de cinemas em SP</p></Link>

            </div>

            <section id='sec_lanc'>

              <h2>Confira os últimos lançamentos do mundo cinematográfico!</h2>
              <p id="home__titulos--erro"></p>
              <div id="lancamentos">

                {
                  this.state.listaLancamento.map(e => {
                    return (
                      <div className="lancamento">
                        <div className="lancamentoDiv">
                          <p className="titulo">{e.nome}</p>
                          <img className="home__img--fav" onClick={() => this.favoritar(e.idTitulo)} src={img_fav} alt="Favoritar/Desfavoritar lançamento" />
                        </div>
                        <p>Sinopse: {e.sinopse}</p>
                        <p>Duração do filme: {e.duracao} </p>
                        <p>Plataforma: {e.plataforma}</p>
                        <p>Categoria: {e.categoria}</p>
                        <p>Classificação: {e.classificacao}</p>
                        <p>Data de Lançamento: {this.getParsedDate(e.dataLancamento)}</p>
                      </div>
                    )
                  })}

              </div>
            </section>

          </div>
        </main>

        <Rodape />
      </div>
    );
  }
}

export default App;
