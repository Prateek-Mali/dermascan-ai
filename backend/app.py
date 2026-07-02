import json
import os

import numpy as np
from flask import Flask, jsonify, request, send_from_directory
from PIL import Image
from keras.src.layers.layer import Layer
from tensorflow.keras.models import load_model

# The provided .keras file was saved with a newer Keras release whose Dense
# layers serialize a `quantization_config` kwarg not recognized by the
# installed keras version. Strip it during layer reconstruction.
_orig_layer_init = Layer.__init__


def _patched_layer_init(self, *args, **kwargs):
    kwargs.pop("quantization_config", None)
    _orig_layer_init(self, *args, **kwargs)


Layer.__init__ = _patched_layer_init

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
FRONTEND_DIR = os.path.join(BASE_DIR, "..", "frontend")
MODEL_PATH = os.path.join(BASE_DIR, "models", "skin_disease_model.keras")
CLASS_NAMES_PATH = os.path.join(BASE_DIR, "models", "class_names.json")

ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}
MAX_CONTENT_LENGTH = 5 * 1024 * 1024
IMG_SIZE = (224, 224)

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
app.config["MAX_CONTENT_LENGTH"] = MAX_CONTENT_LENGTH

with open(CLASS_NAMES_PATH) as f:
    CLASS_NAMES = json.load(f)

model = load_model(MODEL_PATH)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


def preprocess_image(file_stream):
    image = Image.open(file_stream).convert("RGB")
    image = image.resize(IMG_SIZE)
    arr = np.array(image, dtype=np.float32)
    arr = np.expand_dims(arr, axis=0)
    return arr


@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({"error": "No image file was provided."}), 400

    file = request.files["image"]

    if file.filename == "":
        return jsonify({"error": "No image file was selected."}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file type. Please upload a JPG or PNG image."}), 400

    try:
        input_arr = preprocess_image(file.stream)
    except Exception:
        return jsonify({"error": "Could not read this image. Please upload a valid JPG or PNG file."}), 400

    try:
        preds = model.predict(input_arr, verbose=0)[0]
    except Exception:
        return jsonify({"error": "The analysis failed on the server. Please try again."}), 500

    probabilities = {CLASS_NAMES[i]: float(preds[i]) for i in range(len(CLASS_NAMES))}
    top_idx = int(np.argmax(preds))

    return jsonify(
        {
            "prediction": CLASS_NAMES[top_idx],
            "confidence": float(preds[top_idx]),
            "probabilities": probabilities,
        }
    )


@app.route("/")
def serve_index():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def serve_static(path):
    return send_from_directory(app.static_folder, path)


@app.errorhandler(413)
def too_large(e):
    return jsonify({"error": "Image is too large. Please upload a file under 5MB."}), 413


if __name__ == "__main__":
    app.run(debug=True, port=5001)
