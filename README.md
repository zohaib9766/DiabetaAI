# DiabetaAI 🧬

AI-powered diabetes risk prediction web application.

## 🌐 Live Demo
- 🖥️ Frontend: https://diabeta-ai.vercel.app
- ⚙️ Backend: https://zohaib0900-diabetaai-backend.hf.space

## 📊 About
DiabetaAI predicts diabetes risk using Machine Learning trained on 
CDC BRFSS 2015 dataset with 253,680 real patient records.

## 🎯 Accuracy
- Model: GradientBoosting Classifier
- Accuracy: 85.20%
- Dataset: CDC BRFSS 2015 (253,680 records)

## 🛠️ Tech Stack
- Frontend: React.js, Vite, Framer Motion
- Backend: Python, Flask, Flask-CORS
- ML: Scikit-learn, GradientBoosting, Pandas, NumPy
- Deployment: Vercel (Frontend), Hugging Face Spaces (Backend)

## 📋 Features
- 7 key health indicators
- 2-step prediction form
- Real-time AI prediction
- Animated results with risk percentage

## 🚀 Run Locally

### ⚠️ Important Note for Local Setup:
After cloning, update the API URL in frontend:

Open this file:
`frontend/src/components/PredictionForm.jsx`

Find this URL:
`https://zohaib0900-diabetaai-backend.hf.space/predict`

Replace with your local backend URL:
`http://127.0.0.1:5000/predict`

### Backend:
```bash
cd backend
pip install -r requirements.txt
py app.py
```

### Frontend:
```bash
cd frontend
npm install
npm run dev
```

## ⚠️ Disclaimer
This tool is for educational purposes only. 
Not a substitute for professional medical advice.

## 👨💻 Developer
**Zohaib Khan**

- 📧 Email: zk795438@gmail.com
- 💻 GitHub: https://github.com/zohaib9766
- 🌐 Portfolio: https://portfolio-website-lemon-seven-13.vercel.app
- 🔗 LinkedIn: https://linkedin.com/in/zohaib-khan00
