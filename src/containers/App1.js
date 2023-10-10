import React, { Component } from 'react';
import { Navbar } from '../components';
// import { Navbar, Header, About, Work, Skills, Testimonial, Footer } from './components';
import logo from '../logo.svg';
import '../App.css';

class App extends Component {
    render() {
        return (
            <div className="app">
                <Navbar />
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h2>Fack Me</h2>
                </div>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default App;
