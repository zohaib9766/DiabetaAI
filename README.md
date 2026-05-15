# DiabetaAI

An AI-powered diabetes risk prediction web application.

## 🚀 Tech Stack
- **Frontend**: React
- **Backend**: Flask, Python
- **Machine Learning**: Scikit-learn, GradientBoosting

## 📊 Dataset & Model
- **Dataset**: CDC Behavioral Risk Factor Surveillance System (BRFSS) 2015
- **Records**: 253,680
- **Model Accuracy**: 85%
- **Input Features**: 7 key health indicators (Age, BMI, General Health, High BP, High Cholesterol, Smoker, Physical Activity)

## 💻 How to Run Locally

### 1. Clone the repository
```bash
git clone https://github.com/zohaib9766/DiabetaAI.git
cd DiabetaAI
```

### 2. Run the Backend (Flask API)
Open a terminal and navigate to the backend directory:
```bash
cd backend

# Create and activate a virtual environment (optional but recommended)
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Run the backend server
python app.py
```
The backend will start running on `http://127.0.0.1:5000`.

### 3. Run the Frontend (React Vite)
Open a new terminal and navigate to the frontend directory:
```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```
The frontend will start running, usually at `http://localhost:5173`.

## 🌐 Live Demo
[LIVE LINK]

## 👨‍💻 Author
- GitHub: [zohaib9766](https://github.com/zohaib9766)
