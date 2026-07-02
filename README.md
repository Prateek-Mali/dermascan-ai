# 🔬 DermaScan AI — Skin Disease Detector

> AI-powered skin disease classification using Deep Learning trained on 10,015 clinical dermoscopy images.

![Python](https://img.shields.io/badge/Python-3.9+-blue?style=flat&logo=python)
![TensorFlow](https://img.shields.io/badge/TensorFlow-2.x-orange?style=flat&logo=tensorflow)
![Flask](https://img.shields.io/badge/Flask-REST_API-green?style=flat&logo=flask)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?style=flat&logo=react)

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

## 🚀 How to Run

### Mac / Linux
```bash
bash start.sh
```

### Windows
Double click `start.bat`

### Then open browser
```
http://127.0.0.1:5001
```

The script handles everything automatically — Python check, virtual environment, dependencies, server start.

---

## 📋 Requirements

- Python 3.9+ → [python.org](https://python.org)
- Internet connection (first run only)

---

## 🗂️ Project Structure

```
dermascan-ai/
├── start.sh                         ← Mac/Linux one command
├── start.bat                        ← Windows one click
├── README.md
├── backend/
│   ├── app.py                       ← Flask REST API
│   ├── requirements.txt
│   ├── skin_disease_model.keras     ← Trained model
│   └── class_names.json
├── frontend/
│   └── index.html                   ← React UI (3 pages)
└── notebook/
    └── skin_disease_training.ipynb  ← Training code
```

---

## 🔌 API

### POST /predict
```json
Request : multipart/form-data { image: file }

Response:
{
  "disease": "melanocytic_nevi",
  "confidence": 79.4,
  "all_predictions": [
    { "disease": "melanocytic_nevi", "confidence": 79.4 },
    { "disease": "melanoma", "confidence": 14.2 }
  ]
}
```

### GET /health
```json
{ "status": "ok", "model_loaded": true }
```

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Deep Learning | TensorFlow 2.x, Keras, EfficientNetB0 |
| Backend | Flask, Flask-CORS, Pillow, NumPy |
| Frontend | React 18, plain CSS |
| Training | Google Colab T4 GPU |

---

## 📊 Training Results

```
Phase 1 — Frozen base (15 epochs)
  Validation accuracy : 68.6% ✅ Best

Phase 2 — Fine-tuning top 20 layers
  Validation accuracy : 67.1%
  → Reverted to Phase 1 automatically
```

---

## ⚠️ Medical Disclaimer

This is a **student research project** for educational purposes only.
Not a substitute for professional medical diagnosis.
Always consult a certified dermatologist for any skin concerns.

---

## 👨‍💻 Author

**Pratik Mali** — B.Tech AI/ML
- GitHub: [@Prateek-Mali](https://github.com/Prateek-Mali)

---

## 📄 Dataset

HAM10000 — [Kaggle](https://www.kaggle.com/datasets/kmader/skin-cancer-mnist-ham10000) — CC BY-NC-SA 4.0

---

⭐ If you found this useful, give it a star!
