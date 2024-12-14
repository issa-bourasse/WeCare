# ECG Signal Analysis and Prediction

This project is a web-based application for analyzing Electrocardiogram (ECG) signals and predicting cardiac conditions (Normal or Abnormal) using a pre-trained machine learning model. The project integrates a Flask-based backend and a responsive frontend to provide healthcare professionals with a user-friendly tool for ECG signal analysis.

---

## Features

- **Model-Driven Prediction**: Predicts cardiac conditions (Normal or Abnormal) using a machine learning model.
- **Data Validation**: Validates user inputs to ensure the quality of the analysis.
- **Scalable Architecture**: Modular design for easy extension or updates.
- **Visualization**: Displays ECG signals in an interactive chart.

---

## Tech Stack

### Backend
- **Python**
- **Flask**
- **Joblib** (for model and scaler loading)
- **Scikit-learn** (for training the model)

### Frontend
- **HTML/CSS**
- **JavaScript**
- **Chart.js** (for ECG visualization)

### Model
- Pre-trained Machine Learning Model (e.g., Logistic Regression or Random Forest)
- Scaler for feature normalization (StandardScaler from scikit-learn)

---

## Requirements

### Python Libraries
Ensure the following Python packages are installed:
```bash
Flask
numpy
joblib
scikit-learn
```

### Node Modules (for frontend)
Install dependencies for `Chart.js` or any additional packages required for the frontend.

---

## Directory Structure
```
project-directory/
├── app.py                # Flask backend
├── models/
│   ├── ecg_models.pkl    # Pre-trained ML model
│   ├── scaler.pkl        # Scaler for normalization
├── templates/
│   ├── index.html        # Frontend template
├── static/
│   ├── styles.css        # Custom CSS (if applicable)
│   ├── script.js         # Custom JavaScript
├── README.md             # Project documentation
```

---

## Usage

### Running the Application
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repository-name.git
   cd project-directory
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Ensure the `models` directory contains:
   - `ecg_models.pkl` (pre-trained model)
   - `scaler.pkl` (scaler for normalization)

4. Run the Flask app:
   ```bash
   python app.py
   ```

5. Open your browser and navigate to:
   ```
   http://localhost:5000
   ```

---

## API Endpoints

### **`/`**
- **Method**: `GET`
- **Description**: Renders the homepage.

### **`/predict`**
- **Method**: `POST`
- **Description**: Accepts ECG signal features and returns the prediction.
- **Request Body**:
  ```json
  {
    "features": [0.1, 0.2]
  }
  ```
- **Response**:
  ```json
  {
    "prediction": 1,
    "probability": [0.3, 0.7],
    "class_labels": ["Normal", "Abnormal"]
  }
  ```

---

## Known Issues
- If the model or scaler is not found, the server responds with a `503` error.
- Input validation requires exactly 2 features for predictions. Additional features will cause errors.

---

## Future Enhancements
- Support for multi-dimensional ECG data.
- Real-time integration with smartwatch or IoT devices for ECG signal input.
- Enhanced UI/UX for a more professional healthcare experience.
- Add authentication for secure access.

---

## Contributing

We welcome contributions to improve this project. To contribute:
1. Fork the repository.
2. Create a feature branch.
3. Commit your changes.
4. Open a pull request.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contact
For inquiries or support, please contact:
- **Email**: your-email@example.com
- **GitHub**: [your-github-profile](https://github.com/your-github-profile)

