import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib
import os

# Create models directory
os.makedirs('models', exist_ok=True)

# Generate synthetic data if real data not available
np.random.seed(42)
n_samples = 1000
X = np.random.randn(n_samples, 2)  # 2 features: Signal_0, Signal_1
y = np.random.choice(['N', 'A'], size=n_samples)  # Binary classification

# Convert to DataFrame
df = pd.DataFrame(X, columns=['Signal_0', 'Signal_1'])
df['Annotation'] = y

# Split data
X = df[['Signal_0', 'Signal_1']]
y = df['Annotation']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train_scaled, y_train)

# Evaluate
y_pred = model.predict(X_test_scaled)
accuracy = accuracy_score(y_test, y_pred)
print(f"Model Accuracy: {accuracy:.2f}")

# Save model and scaler
joblib.dump(model, 'models/ecg_models.pkl')
joblib.dump(scaler, 'models/scaler.pkl')

print("Model and scaler saved successfully!")
