import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaCheckCircle, FaStethoscope, FaTint, FaRunning, FaAppleAlt, FaHeartbeat } from 'react-icons/fa';
import '../styles/Result.css';

const Result = ({ prediction, probability }) => {
  const isHighRisk = prediction === 1;

  const highRiskRecs = [
    { icon: <FaStethoscope />, text: "Consult a Doctor" },
    { icon: <FaTint />, text: "Monitor Blood Sugar" },
    { icon: <FaRunning />, text: "Lifestyle Changes" }
  ];

  const lowRiskRecs = [
    { icon: <FaRunning />, text: "Stay Active" },
    { icon: <FaAppleAlt />, text: "Eat Healthy" },
    { icon: <FaHeartbeat />, text: "Regular Checkups" }
  ];

  const recs = isHighRisk ? highRiskRecs : lowRiskRecs;
  const cardClass = isHighRisk ? 'high-risk' : 'low-risk';

  return (
    <motion.div 
      className="result-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`result-card glass-card ${cardClass}`}>
        <div className="result-icon">
          {isHighRisk ? <FaExclamationTriangle /> : <FaCheckCircle />}
        </div>
        
        <h2 className="result-title">
          {isHighRisk ? "High Diabetes Risk Detected" : "Low Diabetes Risk"}
        </h2>
        
        <div className="result-prob">
          Probability: {(probability * 100).toFixed(1)}%
        </div>
        
        <p className="result-message">
          {isHighRisk 
            ? "Our AI model suggests you may have elevated diabetes risk. Please consult a healthcare professional for proper diagnosis."
            : "Great news! Our AI model suggests low diabetes risk. Maintain your healthy lifestyle."}
        </p>

        <div className="recommendations">
          {recs.map((rec, index) => (
            <motion.div 
              key={index} 
              className="rec-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              <div className="rec-icon">{rec.icon}</div>
              <div className="rec-text">{rec.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Result;
