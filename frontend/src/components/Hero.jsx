import React from 'react';
import { motion } from 'framer-motion';
import { FaHeartbeat, FaDna, FaBrain } from 'react-icons/fa';
import '../styles/Hero.css';

const Hero = () => {
  const scrollToPredict = () => {
    document.getElementById('predict')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="hero-bg-icons">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaHeartbeat className="bg-icon icon-1" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <FaDna className="bg-icon icon-2" />
        </motion.div>
        <motion.div
          animate={{ y: [0, -25, 0], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <FaBrain className="bg-icon icon-3" />
        </motion.div>
      </div>

      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="hero-title gradient-text">DiabetaAI</h1>
        <h2 className="hero-subtitle">AI-Powered Diabetes Risk Detection</h2>
        <p className="hero-description">
          Get instant diabetes risk assessment powered by Machine Learning trained on 253,000+ real patient records
        </p>
        
        <motion.button 
          className="cta-button"
          onClick={scrollToPredict}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Check Your Risk Now
        </motion.button>

        <motion.div 
          className="stats-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <div className="stat-item">
            <span className="stat-value">253K+</span>
            <span className="stat-label">Records</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">85%</span>
            <span className="stat-label">Accuracy</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">7</span>
            <span className="stat-label">Health Factors</span>
          </div>
          <div className="stat-item">
            <span className="stat-value">Instant</span>
            <span className="stat-label">Results</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
