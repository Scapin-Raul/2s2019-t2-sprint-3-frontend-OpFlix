import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Topo from '../../components/Header/Header'

class Localizacoes extends Component {

    constructor() {
        super();
        this.state = {
            Localizacoes: []
            
        }
    }

    adicionarLocalizacoes = () => {
        fetch("http://192.168.4.93:5000/api/Localizacoes/")
            .then(res => res.json())
            .then(data => this.setState({ Localizacoes: data }))
            .catch(error => console.log(error));
    }

    marcadores = () => {
        let marcadores = [];

        this.state.Localizacoes.forEach(e => {
            marcadores.push(
                <Marker position={{ lat: e.latitude, lng: e.longitude }} />
            )
        })
        return marcadores;
    }

    componentWillMount() {
        this.adicionarLocalizacoes();
    }

    render() {
        return (
            <div>
                <Topo />
                <Map google={this.props.google}
                    style={{ width: '100%', height: '100%', position: 'relative' }}
                    className={'map'}
                    zoom={11}
                    initialCenter={{
                        lat: -23.5345442,
                        lng: -46.6493879
                    }}
                >
                    {this.marcadores()}
                </Map>
            </div>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyC6BWOev4iy16PGYkfagX-s07yLGO92hLk") //developer skey ?
})(Localizacoes)