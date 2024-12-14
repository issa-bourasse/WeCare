import numpy as np
import joblib
from sklearn.preprocessing import StandardScaler
import pandas as pd

def generate_test_data(n_samples=10):
    """Generate synthetic test data"""
    np.random.seed(42)
    test_data = pd.DataFrame({
        'Signal_0': np.random.normal(0, 1, n_samples),
        'Signal_1': np.random.normal(0, 1, n_samples)
    })
    return test_data

def test_model():
    try:
        # Load model and scaler
        model = joblib.load('model/random_forest_model.pkl')
        scaler = joblib.load('models/scaler.pkl')

        # Generate synthetic test data
        test_data = generate_test_data()
        
        # Ensure correct features (Signal_0 and Signal_1)
        required_features = ['Signal_0', 'Signal_1']
        if not all(feature in test_data.columns for feature in required_features):
            raise ValueError(f"Missing required features: {required_features}")
        
        # Scale the test data (ensure it's the same number of features used during training)
        X_test_scaled = scaler.transform(test_data)
        
        # Make predictions
        predictions = model.predict(X_test_scaled)
        probabilities = model.predict_proba(X_test_scaled)
        
        # Print results
        print("Test Data:")
        print(test_data)
        print("\nPredictions:", predictions)
        print("Probabilities (for each class):")
        print(probabilities)
        
        # Optionally, interpret the predictions
        for i in range(len(predictions)):
            print(f"Sample {i+1}: {'Normal' if predictions[i] == 1 else 'Abnormal'}, "
                  f"Confidence: {max(probabilities[i]) * 100:.2f}%")
        
        return True

    except FileNotFoundError as e:
        print(f"Error: Model files not found. {str(e)}")
        return False
    except ValueError as e:
        print(f"Error: Invalid input data. {str(e)}")
        return False
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return False

if __name__ == "__main__":
    test_model()
