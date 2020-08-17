import React from 'react';
import ReactDOM from 'react-dom';
import {Navbar , Nav} from 'react-bootstrap'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import Img from './IndyDevs_Logo.png';

ReactDOM.render(
  <React.Fragment>
    <Navbar bg="dark" variant="dark">
    <Navbar.Brand href="#home"><span>IndyDevs</span>&nbsp;&nbsp;
    <img src= {Img} alt="pic" style={{height:"30px",width:"30px"}}/>
    </Navbar.Brand>&nbsp;&nbsp;
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="/" active>Marketplace</Nav.Link>
      <Nav.Link href="#pricing">Dashboard</Nav.Link>
    </Nav>
   </Navbar>
    <App />
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
