const MAX_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png"];

const dropzone = document.getElementById("dropzone");
const fileInput = document.getElementById("file-input");
const previewCard = document.getElementById("preview-card");
const previewImg = document.getElementById("preview-img");
const previewMeta = document.getElementById("preview-meta");
const removeBtn = document.getElementById("remove-btn");
const errorBox = document.getElementById("error-box");
const analyzeBtn = document.getElementById("analyze-btn");
const loadingState = document.getElementById("loading-state");

let selectedFile = null;

function showError(msg) {
  errorBox.textContent = msg;
  errorBox.classList.add("show");
}

function clearError() {
  errorBox.textContent = "";
  errorBox.classList.remove("show");
}

function formatSize(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

function handleFile(file) {
  clearError();

  if (!file) return;

  if (!ALLOWED_TYPES.includes(file.type)) {
    showError("Unsupported file type. Please upload a JPG or PNG image.");
    return;
  }

  if (file.size > MAX_SIZE_BYTES) {
    showError("File is too large. Please upload an image under 5MB.");
    return;
  }

  selectedFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    previewImg.src = e.target.result;
    previewMeta.textContent = `${file.name} · ${formatSize(file.size)}`;
    dropzone.style.display = "none";
    previewCard.style.display = "block";
    analyzeBtn.disabled = false;
  };
  reader.readAsDataURL(file);
}

dropzone.addEventListener("click", () => fileInput.click());

dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzone.classList.add("dragover");
});

dropzone.addEventListener("dragleave", () => {
  dropzone.classList.remove("dragover");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  handleFile(file);
});

fileInput.addEventListener("change", (e) => {
  handleFile(e.target.files[0]);
});

removeBtn.addEventListener("click", () => {
  selectedFile = null;
  fileInput.value = "";
  previewCard.style.display = "none";
  dropzone.style.display = "block";
  analyzeBtn.disabled = true;
  clearError();
});

analyzeBtn.addEventListener("click", async () => {
  if (!selectedFile) return;
  clearError();
  analyzeBtn.disabled = true;
  loadingState.classList.add("show");

  try {
    const formData = new FormData();
    formData.append("image", selectedFile);

    const res = await fetch("/predict", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.error || "The server could not analyze this image. Please try again.");
    }

    const data = await res.json();

    sessionStorage.setItem(
      "dermascan_result",
      JSON.stringify({
        image: previewImg.src,
        prediction: data.prediction,
        confidence: data.confidence,
        probabilities: data.probabilities,
      })
    );

    window.location.href = "result.html";
  } catch (err) {
    showError(err.message || "Something went wrong while analyzing the image. Please try again.");
    analyzeBtn.disabled = false;
  } finally {
    loadingState.classList.remove("show");
  }
});
