import pandas as pd
import numpy as np
import pickle
import os
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.pipeline import make_pipeline

def main():
    print("Loading dataset...")
    df = pd.read_csv('dataset/diabetes.csv')
    
    print("Preprocessing data...")
    # Keep ONLY these 8 columns
    columns_to_keep = ['HighBP', 'HighChol', 'BMI', 'Smoker', 'PhysActivity', 'GenHlth', 'Age', 'Diabetes_012']
    df = df[columns_to_keep]
    
    # Convert target: 0 stays 0, 1 and 2 become 1
    df['Diabetes_012'] = df['Diabetes_012'].replace({2.0: 1.0, 2: 1})
    
    # Features and Target
    X = df.drop('Diabetes_012', axis=1)
    y = df['Diabetes_012']
    
    # Save feature names
    os.makedirs('models', exist_ok=True)
    feature_names = X.columns.tolist()
    with open('models/feature_names.pkl', 'wb') as f:
        pickle.dump(feature_names, f)
        
    print("Splitting dataset 80/20...")
    # Split 80/20 random_state=42
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Define models
    models = {
        'RandomForestClassifier': RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42),
        'GradientBoostingClassifier': GradientBoostingClassifier(n_estimators=100, random_state=42),
        'LogisticRegression': LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42)
    }
    
    best_model = None
    best_acc = 0
    best_model_name = ""
    
    print("Training models...")
    for name, model in models.items():
        # Use StandardScaler in a pipeline to ensure it's saved with the model
        pipeline = make_pipeline(StandardScaler(), model)
        pipeline.fit(X_train, y_train)
        
        y_pred = pipeline.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        print(f"{name} Accuracy: {acc:.4f}")
        
        if acc > best_acc:
            best_acc = acc
            best_model = pipeline
            best_model_name = name
            
    print(f"\nBest Model: {best_model_name} with Accuracy: {best_acc:.4f}")
    
    # Save best model
    print("Saving best model...")
    with open('models/diabetes_model.pkl', 'wb') as f:
        pickle.dump(best_model, f)
    
    print("Done!")

if __name__ == '__main__':
    main()
