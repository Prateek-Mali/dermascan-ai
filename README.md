# 🩺 DermaScan AI — AI-Powered Skin Disease Detection

A simple, professional web application that uses deep learning to screen skin lesion images across 7 common skin conditions.

![Python](https://img.shields.io/badge/Python-3.9+-blue?style=flat&logo=python)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange?style=flat&logo=tensorflow)
![Flask](https://img.shields.io/badge/Flask-REST_API-green?style=flat&logo=flask)
![HTML/CSS/JS](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-yellow?style=flat)

---

## 🧠 Model Details

| Property | Value |
|---|---|
| Architecture | EfficientNetB0 (Transfer Learning) |
| Dataset | HAM10000 |
| Training Images | 10,015 dermoscopy images |
| Disease Classes | 7 |
| Validation Accuracy | 68.6% |
| Training Platform | Google Colab T4 GPU |
| Framework | TensorFlow / Keras |

---

## 🩺 Detectable Conditions

| Disease | Risk Level |
|---|---|
| Melanocytic Nevi (Common Mole) | 🟢 Low |
| Melanoma (Skin Cancer) | 🔴 High |
| Basal Cell Carcinoma | 🟡 Medium |
| Benign Keratosis | 🟢 Low |
| Actinic Keratosis | 🟡 Medium |
| Dermatofibroma | 🟢 Low |
| Vascular Lesion | 🟢 Low |

---

## 🚀 Quick Start — One Command!

```bash
bash run.sh
```

That's it! The script will:
- ✅ Set up the virtual environment (if needed)
- ✅ Install all dependencies automatically
- ✅ Start the Flask server

Then open your browser and visit: **http://127.0.0.1:5001**

---

## 📋 Requirements

- Python 3.9+ → [python.org](https://python.org)
- Internet connection (first run only)

---

## 🗂️ Project Structure

```
deep/
├── run.sh                           ← RUN THIS! (one command)
├── README.md
├── frontend/
│   ├── index.html                   ← Home page
│   ├── upload.html                  ← Upload page
│   ├── result.html                  ← Result page
│   ├── css/
│   │   └── styles.css
│   └── js/
│       ├── common.js
│       ├── upload.js
│       └── result.js
└── backend/
    ├── app.py                       ← Flask server
    ├── requirements.txt
    ├── venv/                        ← Virtual environment (auto-created)
    └── models/
        ├── skin_disease_model.keras
        └── class_names.json
```

---

## 🔌 API

### POST /predict
**Request:**
```
Content-Type: multipart/form-data
Body: { image: <image_file> }
```

**Response:**
```json
{
  "prediction": "melanocytic_nevi",
  "confidence": 0.6993706226348877,
  "probabilities": {
    "actinic_keratosis": 0.0378,
    "basal_cell_carcinoma": 0.0108,
    "benign_keratosis": 0.1058,
    "dermatofibroma": 0.0181,
    "melanocytic_nevi": 0.6994,
    "melanoma": 0.0313,
    "vascular_lesion": 0.0969
  }
}
```

---

## ⚙️ Tech Stack

| Component | Technology |
|---|---|
| **ML Model** | TensorFlow 2.16.2, Keras 3.10.0, EfficientNetB0 |
| **Backend** | Flask (Python) |
| **Frontend** | Plain HTML, CSS, JavaScript (no build step needed) |
| **Image Processing** | Pillow, NumPy |
| **Input** | 224×224 RGB images (JPG/PNG) |
| **Output** | 7-class probability distribution |

---

## 📝 Model Architecture

```
Input (224×224×3)
    ↓
EfficientNetB0 (Pre-trained, Frozen)
    ↓
GlobalAveragePooling2D
    ↓
BatchNormalization
    ↓
Dropout(0.5)
    ↓
Dense(256, ReLU)
    ↓
BatchNormalization
    ↓
Dropout(0.3)
    ↓
Dense(7, Softmax)  ← Output (7 classes)
```

---

## ⚠️ Important Disclaimer

This is an **educational project** made by **Prateek Mali** (2-year AIML student).

**DO NOT TAKE THIS SERIOUSLY!** 
- Results are for screening purposes only — NOT for medical diagnosis.
- This is NOT a replacement for professional medical advice.
- **Always consult a licensed dermatologist** for accurate diagnosis and treatment.
- The model is trained on limited data and may have errors.
- Never rely on these results for medical decisions.

---

## 👨‍💻 Author

**Prateek Mali** — 2-Year AIML Student

This is an educational project to demonstrate AI/ML skills in a real-world medical screening context.

---

## 🎯 Features

✅ **Drag-and-drop upload** — Intuitive image upload interface
✅ **Real-time predictions** — Get results in seconds
✅ **Confidence scores** — See how confident the AI is
✅ **Full breakdown** — View all 7 condition probabilities
✅ **Color-coded results** — Green/Orange/Red concern levels
✅ **Mobile responsive** — Works on phone, tablet, desktop
✅ **Client-side validation** — File type & size checks
✅ **Error handling** — Clear, friendly error messages

---

## 📋 Requirements

- **Python 3.9+** — [python.org](https://www.python.org)
- **pip** (comes with Python)
- **bash** (pre-installed on macOS/Linux)

Check your Python version:
```bash
python3 --version
```

---

## 🛑 Stop the Server

Press `Ctrl+C` in the terminal where the server is running.

---

## 🤝 Troubleshooting

**Problem:** Port 5001 already in use
```bash
# Kill process using port 5001
lsof -ti:5001 | xargs kill -9
```

**Problem:** ModuleNotFoundError
```bash
# Make sure you ran bash run.sh (which installs dependencies)
bash run.sh
```

**Problem:** Python not found
```bash
# Install Python 3.9+ from python.org
python3 --version
```

---

⭐ **Star this project if you found it useful!**
