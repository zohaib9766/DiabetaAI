import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PredictionForm from './components/PredictionForm';
import About from './components/About';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      <div id="predict">
        <PredictionForm />
      </div>
      <div id="about">
        <About />
      </div>
      <Footer />
    </div>
  );
}

export default App;
