# DermaScan AI — Skin Disease Detector

AI-powered skin disease classification using EfficientNetB0 trained on HAM10000.

---

## ▶️ How to Run (Anyone, Any Computer)

### Mac / Linux
```bash
bash start.sh
```
Then open: **http://127.0.0.1:5001**

### Windows
Double-click **start.bat**  
Then open: **http://127.0.0.1:5001**

That's it. The script handles everything automatically.

---

## What the script does automatically
- Checks if Python is installed
- Creates a virtual environment
- Installs all dependencies
- Starts the Flask server
- Opens on port 5001

---

## Requirements
- Python 3.9 or higher → [python.org](https://python.org)
- Internet connection (first run only, to install packages)

---

## Project Structure
```
dermascan/
├── start.sh                    ← Mac/Linux — run this
├── start.bat                   ← Windows — double click this
├── backend/
│   ├── app.py                  ← Flask API
│   ├── requirements.txt        ← Python packages
│   ├── skin_disease_model.keras ← trained model
│   └── class_names.json        ← disease labels
└── frontend/
    └── index.html              ← React UI
```

---

## Model Info
- Architecture: EfficientNetB0 (Transfer Learning)
- Dataset: HAM10000 (10,015 dermoscopy images)
- Classes: 7 skin disease categories
- Accuracy: 68.6% validation accuracy

---

## ⚠️ Disclaimer
This is a student research project. Not for medical diagnosis.
Always consult a certified dermatologist.

---

## Tech Stack
- Deep Learning: TensorFlow / Keras
- Backend: Flask REST API  
- Frontend: React
- Model: EfficientNetB0
