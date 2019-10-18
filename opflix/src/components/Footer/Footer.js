import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import './Footer.css'

class Footer extends Component{
    
    
    render(){
        return(
            <div id="footer__div--background">
                <footer id="footer__footer">

                    <div id="footer__footer--enfeite"></div>

                    <ul>
                        <li><Link to="/" className="footer__footer--link">Home</Link></li>
                        <li><Link to="/login" className="footer__footer--link">Login</Link></li>
                        <li id="footer_ul--direitos">Imagens meramente ilustrativas. Copyright 2019 © OpFlix – Todos os direitos reservados. <br/> É proibida a reprodução parcial ou total do conteúdo desse site. <br/> OpFlix S.A - CNPJ: XX.XXX.XXX/XXXX-XX</li>
                    </ul>
                </footer>
            </div>
        );
    }   
}

export default Footer;