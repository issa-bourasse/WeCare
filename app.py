from flask import Flask, request, jsonify, render_template
import numpy as np
import joblib
import os
from sklearn.preprocessing import StandardScaler

# Initialize Flask app
app = Flask(__name__)

# Define paths
MODEL_DIR = 'models'
model_path = os.path.join(MODEL_DIR, 'ecg_models.pkl')
scaler_path = os.path.join(MODEL_DIR, 'scaler.pkl')

# Create models directory if it doesn't exist
os.makedirs(MODEL_DIR, exist_ok=True)

def load_model():
    """Load and validate model"""
    try:
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}")
        model = joblib.load(model_path)
        if not hasattr(model, 'predict') or not hasattr(model, 'predict_proba'):
            raise ValueError("Invalid model: missing required methods")
        return model
    except Exception as e:
        print(f"Error loading model: {e}")
        return None

def load_scaler():
    """Load and validate scaler"""
    try:
        if not os.path.exists(scaler_path):
            raise FileNotFoundError(f"Scaler file not found at {scaler_path}")
        scaler = joblib.load(scaler_path)
        if not hasattr(scaler, 'transform'):
            raise ValueError("Invalid scaler: missing transform method")
        return scaler
    except Exception as e:
        print(f"Error loading scaler: {e}")
        return None

# Initialize model and scaler
model = load_model()
scaler = load_scaler()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/status')
def status():
    """Check model and scaler status"""
    return jsonify({
        'model_loaded': model is not None,
        'scaler_loaded': scaler is not None
    })

@app.route('/predict', methods=['POST'])
def predict():
    """Handle ECG prediction requests"""
    if not model or not scaler:
        return jsonify({
            "error": "Model or scaler not available. Please ensure model files are present.",
            "model_status": model is not None,
            "scaler_status": scaler is not None
        }), 503

    try:
        # Validate request data
        data = request.get_json()
        if not data or 'features' not in data:
            return jsonify({"error": "Invalid request: missing features"}), 400

        features = np.array(data['features'])
        if features.size != 2:  # Assuming we need exactly 2 features
            return jsonify({"error": "Invalid input: exactly 2 features required"}), 400

        # Reshape and scale features
        features = features.reshape(1, -1)
        features_scaled = scaler.transform(features)

        # Make prediction
        prediction = model.predict(features_scaled)[0]
        probability = model.predict_proba(features_scaled)[0].tolist()

        return jsonify({
            "prediction": int(prediction),
            "probability": probability,
            "class_labels": ["Normal", "Abnormal"]
        })

    except ValueError as e:
        return jsonify({"error": f"Invalid input format: {str(e)}"}), 400
    except Exception as e:
        return jsonify({"error": f"Prediction error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
