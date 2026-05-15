import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { FaSpinner, FaCheck } from 'react-icons/fa';
import Result from './Result';
import '../styles/PredictionForm.css';

const PredictionForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const resultRef = useRef(null);
  
  const [formData, setFormData] = useState({
    HighBP: "", 
    HighChol: "", 
    BMI: "",
    Smoker: "", 
    PhysActivity: "", 
    GenHlth: "", 
    Age: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const resetForm = () => {
    setFormData({
      HighBP: "", 
      HighChol: "", 
      BMI: "",
      Smoker: "", 
      PhysActivity: "", 
      GenHlth: "", 
      Age: ""
    });
    setCurrentStep(1);
    setErrors({});
    setSubmitted(false);
    setResult(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
    setSubmitted(false);
    setResult(null);
  };

  const validateStep1 = () => {
    const step1Fields = ['Age', 'BMI', 'GenHlth'];
    const newErrors = {};
    let isValid = true;
    step1Fields.forEach(field => {
      if (formData[field] === "") {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });
    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    setError(null);
    setCurrentStep(prev => Math.min(prev + 1, 2));
  };

  const handlePrev = () => {
    setError(null);
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const step2Fields = ['HighBP', 'HighChol', 'Smoker', 'PhysActivity'];
    const newErrors = {};
    let isValid = true;
    step2Fields.forEach(field => {
      if (formData[field] === "") {
        newErrors[field] = "This field is required";
        isValid = false;
      }
    });
    
    if (!isValid) {
      setErrors(prev => ({ ...prev, ...newErrors }));
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
    setSubmitted(false);

    const dataToSend = {
      HighBP: Number(formData.HighBP),
      HighChol: Number(formData.HighChol),
      BMI: parseFloat(formData.BMI),
      Smoker: Number(formData.Smoker),
      PhysActivity: Number(formData.PhysActivity),
      GenHlth: Number(formData.GenHlth),
      Age: Number(formData.Age)
    };

    try {
      const response = await axios.post('https://diabetaai-production.up.railway.app/predict', dataToSend, {
        headers: { 'Content-Type': 'application/json' }
      });
      setResult(response.data);
      setSubmitted(true);
      setFormData({
        HighBP: "", 
        HighChol: "", 
        BMI: "",
        Smoker: "", 
        PhysActivity: "", 
        GenHlth: "", 
        Age: ""
      });
      setCurrentStep(1);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 300)
    } catch (err) {
      setError(err.response?.data?.error || "Failed to connect to the server. Please make sure the backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const slideVariants = {
    initial: { x: 50, opacity: 0 },
    animate: { x: 0, opacity: 1, transition: { duration: 0.4 } },
    exit: { x: -50, opacity: 0, transition: { duration: 0.3 } }
  };

  const renderStepIndicator = () => {
    const steps = ["Basic Information", "Health Information"];
    return (
      <div className="stepper-container stepper-2-steps">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={stepNumber} className={`step ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
              <div className="step-circle">
                {isCompleted ? <FaCheck /> : stepNumber}
              </div>
              <div className="step-label">{step}</div>
              {index < steps.length - 1 && <div className="step-line"></div>}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section className="prediction-section">
      <motion.div 
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title gradient-text">Diabetes Risk Assessment</h2>
        <p className="section-subtitle">Fill in your health information below</p>
      </motion.div>

      <motion.div 
        className="form-container glass-card"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {renderStepIndicator()}
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="form-content" noValidate>
          <AnimatePresence mode="wait">
            {currentStep === 1 && (
              <motion.div 
                key="step1"
                variants={slideVariants}
                initial="initial" animate="animate" exit="exit"
                className="step-content"
              >
                <h3 className="step-title">Step 1: Basic Information</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label className="input-label">Age</label>
                    <select name="Age" value={formData.Age} onChange={handleChange} className={`form-input ${errors.Age ? 'error-border' : ''}`}>
                      <option value="" disabled>Select...</option>
                      <option value={1}>18-24</option><option value={2}>25-29</option>
                      <option value={3}>30-34</option><option value={4}>35-39</option>
                      <option value={5}>40-44</option><option value={6}>45-49</option>
                      <option value={7}>50-54</option><option value={8}>55-59</option>
                      <option value={9}>60-64</option><option value={10}>65-69</option>
                      <option value={11}>70-74</option><option value={12}>75-79</option>
                      <option value={13}>80+</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">BMI</label>
                    <input 
                      type="number" name="BMI" value={formData.BMI} onChange={handleChange} 
                      className={`form-input ${errors.BMI ? 'error-border' : ''}`} placeholder="e.g. 25.5" 
                      min="10" step="0.1"
                    />
                  </div>
                  <div className="input-group">
                    <label className="input-label">General Health</label>
                    <select name="GenHlth" value={formData.GenHlth} onChange={handleChange} className={`form-input ${errors.GenHlth ? 'error-border' : ''}`}>
                      <option value="" disabled>Select...</option>
                      <option value={1}>Excellent</option><option value={2}>Very Good</option>
                      <option value={3}>Good</option><option value={4}>Fair</option>
                      <option value={5}>Poor</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div 
                key="step2"
                variants={slideVariants}
                initial="initial" animate="animate" exit="exit"
                className="step-content"
              >
                <h3 className="step-title">Step 2: Health Information</h3>
                <div className="form-grid">
                  <div className="input-group">
                    <label className="input-label">High Blood Pressure</label>
                    <select name="HighBP" value={formData.HighBP} onChange={handleChange} className={`form-input ${errors.HighBP ? 'error-border' : ''}`}>
                      <option value="" disabled>Select...</option>
                      <option value={0}>No</option><option value={1}>Yes</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">High Cholesterol</label>
                    <select name="HighChol" value={formData.HighChol} onChange={handleChange} className={`form-input ${errors.HighChol ? 'error-border' : ''}`}>
                      <option value="" disabled>Select...</option>
                      <option value={0}>No</option><option value={1}>Yes</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Smoker</label>
                    <select name="Smoker" value={formData.Smoker} onChange={handleChange} className={`form-input ${errors.Smoker ? 'error-border' : ''}`}>
                      <option value="" disabled>Select...</option>
                      <option value={0}>No</option><option value={1}>Yes</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label className="input-label">Physical Activity</label>
                    <select name="PhysActivity" value={formData.PhysActivity} onChange={handleChange} className={`form-input ${errors.PhysActivity ? 'error-border' : ''}`}>
                      <option value="" disabled>Select...</option>
                      <option value={0}>No</option><option value={1}>Yes</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" className="nav-btn prev-btn" onClick={handlePrev}>
                Back
              </button>
            )}
            
            {currentStep < 2 ? (
              <button type="button" className="nav-btn next-btn" onClick={handleNext}>
                Next Step
              </button>
            ) : (
              <button type="submit" className="nav-btn submit-btn" disabled={loading}>
                {loading ? <FaSpinner className="spinner" /> : "Analyze My Risk"}
              </button>
            )}
          </div>
        </form>
      </motion.div>

      {submitted && result && (
        <div ref={resultRef}>
          <Result prediction={result.prediction} probability={result.probability} />
        </div>
      )}
    </section>
  );
};

export default PredictionForm;
