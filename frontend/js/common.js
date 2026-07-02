const CLASS_INFO = {
  actinic_keratosis: { display: "Actinic Keratosis", concern: "moderate" },
  basal_cell_carcinoma: { display: "Basal Cell Carcinoma", concern: "high" },
  benign_keratosis: { display: "Benign Keratosis", concern: "low" },
  dermatofibroma: { display: "Dermatofibroma", concern: "low" },
  melanocytic_nevi: { display: "Melanocytic Nevus (Mole)", concern: "low" },
  melanoma: { display: "Melanoma", concern: "high" },
  vascular_lesion: { display: "Vascular Lesion", concern: "low" },
};

function classDisplayName(key) {
  return (CLASS_INFO[key] && CLASS_INFO[key].display) || key;
}

function classConcern(key) {
  return (CLASS_INFO[key] && CLASS_INFO[key].concern) || "low";
}
