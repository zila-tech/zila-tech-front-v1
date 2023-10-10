import React from 'react';
import { Navbar, Header, About, Work, Skills, Testimonial, Footer } from './components';
import './App.css';
const App = () => {
	return (
		<div className='app'>
			<Navbar />
			<Header />
			<About />
			<Work />
			<Skills />
			<Testimonial />
			<Footer />
		</div>
	);
};

export default App;