(function () {
  const raw = sessionStorage.getItem("dermascan_result");
  const emptyState = document.getElementById("empty-state");
  const resultContent = document.getElementById("result-content");
  const breakdownSection = document.getElementById("breakdown-section");
  const resultActions = document.getElementById("result-actions");
  const resultDisclaimer = document.getElementById("result-disclaimer");

  if (!raw) {
    emptyState.style.display = "block";
    return;
  }

  let data;
  try {
    data = JSON.parse(raw);
  } catch (e) {
    emptyState.style.display = "block";
    return;
  }

  const { image, prediction, confidence, probabilities } = data;
  const concern = classConcern(prediction);
  const displayName = classDisplayName(prediction);
  const pct = (confidence * 100).toFixed(1);

  document.getElementById("result-img").src = image;
  document.getElementById("result-title").textContent = displayName;
  document.getElementById("confidence-text").textContent = `${pct}% confidence`;
  document.getElementById("confidence-fill").style.width = `${pct}%`;

  const badge = document.getElementById("concern-badge");
  const recBox = document.getElementById("recommendation-box");

  if (concern === "low") {
    badge.textContent = "Low Concern";
    badge.className = "badge badge-low";
    recBox.className = "recommendation-box low";
    recBox.textContent = "This appears to be a low-risk finding. Routine monitoring is still recommended.";
  } else if (concern === "moderate") {
    badge.textContent = "Moderate Concern";
    badge.className = "badge badge-mod";
    recBox.className = "recommendation-box urgent";
    recBox.textContent = "This result suggests a condition that should be evaluated by a dermatologist as soon as possible.";
  } else {
    badge.textContent = "High Concern";
    badge.className = "badge badge-high";
    recBox.className = "recommendation-box urgent";
    recBox.textContent = "This result suggests a condition that should be evaluated by a dermatologist as soon as possible.";
    resultDisclaimer.classList.add("prominent");
  }

  if (probabilities) {
    const entries = Object.entries(probabilities).sort((a, b) => b[1] - a[1]);
    const list = document.getElementById("breakdown-list");
    list.innerHTML = "";
    entries.forEach(([key, value]) => {
      const p = (value * 100).toFixed(1);
      const row = document.createElement("div");
      row.className = "breakdown-row";
      row.innerHTML = `
        <span class="breakdown-label">${classDisplayName(key)}</span>
        <div class="breakdown-track"><div class="breakdown-fill" style="width:${p}%"></div></div>
        <span class="breakdown-pct">${p}%</span>
      `;
      list.appendChild(row);
    });
    breakdownSection.style.display = "block";
  }

  resultContent.style.display = "grid";
  resultActions.style.display = "flex";
})();
