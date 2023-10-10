import React, { Component } from 'react';
import { Navbar } from './components';
import { Header, About, Work, Skills, Testimonial, Footer } from './containers';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Header />
        <About />
        <Work />
        <Skills />
        <Testimonial />
        <Footer />
      </div>
    );
  }
}

export default App;
