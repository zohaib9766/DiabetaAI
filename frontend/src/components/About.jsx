import React from 'react';
import { motion } from 'framer-motion';
import { FaBrain, FaDatabase, FaBolt } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="gradient-text">About DiabetaAI</h2>
          <p className="about-text">
            DiabetaAI is an advanced predictive healthcare application designed to assess the risk of diabetes using Machine Learning. By analyzing 7 key health indicators, our model provides a quick and accessible risk evaluation.
          </p>
          <p className="about-text">
            The prediction model is trained on the CDC's Behavioral Risk Factor Surveillance System (BRFSS) 2015 dataset, which includes comprehensive health surveys from over 253,000 participants in the United States.
          </p>
        </motion.div>

        <motion.div 
          className="about-features"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FaBrain className="feature-icon" />
            </div>
            <div className="feature-info">
              <h3>Machine Learning</h3>
              <p>Powered by a robust GradientBoosting classifier, achieving approximately 85% accuracy on test data.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FaDatabase className="feature-icon" />
            </div>
            <div className="feature-info">
              <h3>Real Data</h3>
              <p>Trained on 253,680 authentic patient records from the CDC BRFSS dataset, ensuring high reliability.</p>
            </div>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <FaBolt className="feature-icon" />
            </div>
            <div className="feature-info">
              <h3>Instant Results</h3>
              <p>Real-time inference via our Flask API provides immediate feedback based on your health profile.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
