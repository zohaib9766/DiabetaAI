from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np
import os


app = Flask(__name__)
CORS(app)

# Load the model and feature names
model_path = os.path.join(os.path.dirname(__file__), 'models', 'diabetes_model.pkl')
feature_names_path = os.path.join(os.path.dirname(__file__), 'models', 'feature_names.pkl')

if os.path.exists(model_path):
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
else:
    model = None

if os.path.exists(feature_names_path):
    with open(feature_names_path, 'rb') as f:
        feature_names = pickle.load(f)
else:
    feature_names = None

@app.route('/', methods=['GET'])
def home():
    return jsonify({
        "name": "DiabetaAI API",
        "description": "AI-powered Diabetes Risk Prediction",
        "status": "running",
        "endpoints": {
            "health": "/health",
            "predict": "/predict (POST)"
        },
        "frontend": "https://diabeta-ai.vercel.app" # Apna actual frontend link dalna mat bhoolna!
    })
@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"})

@app.route('/predict', methods=['POST'])
def predict():
    if not model:
        return jsonify({"error": "Model not loaded. Please run train_model.py first."}), 500
    if not feature_names:
        return jsonify({"error": "Feature names not loaded. Please run train_model.py first."}), 500
    
    try:
        data = request.json
        print("Received data:", data)
        
        # 7 Features required for the model
        required_features = [
            'HighBP', 'HighChol', 'BMI', 'Smoker', 'PhysActivity', 'GenHlth', 'Age'
        ]
        
        # Check if all fields exist
        for feature in required_features:
            if feature not in data:
                return jsonify({"error": f"Missing field: {feature}"}), 400
        
        # Convert all values to float before prediction
        processed_data = {key: float(data[key]) for key in required_features}
        
        # Create DataFrame from input data with correct column order using feature_names.pkl
        input_data = pd.DataFrame([processed_data], columns=feature_names)
        
        # Make prediction
        prediction = model.predict(input_data)[0]
        probability = model.predict_proba(input_data)[0][1] # Probability of class 1
        
        print("Input data:", input_data)
        print("Prediction:", prediction)
        print("Probability:", probability)
        
        # Prepare response
        result = {
            "prediction": int(prediction),
            "probability": float(probability),
            "message": "Diabetic" if prediction == 1 else "Non-Diabetic"
        }
        
        return jsonify(result)
        
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(port=5000, debug=True)
