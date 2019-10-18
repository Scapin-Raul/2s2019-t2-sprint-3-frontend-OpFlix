import React,{Component} from 'react';
import './Admin.css';
import {Link} from 'react-router-dom';
import Topo from '../../components/Header/Header'
import Rodape from '../../components/Footer/Footer'


class Admin extends Component{

    constructor(){
        super();
    }

    render(){
        return(
            <div className="App">
                <Topo/>
                <Rodape/>
            </div>
        )
    }
}
export default Admin;