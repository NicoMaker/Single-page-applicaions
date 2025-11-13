let array = [];
let currentIndex = 0;
let totalSize = 0;

function showModal(message) {
  document.getElementById("modalMessage").textContent = message;
  document.getElementById("errorModal").style.display = "block";
}

const closeModal = () =>
  (document.getElementById("errorModal").style.display = "none");

window.onclick = function (event) {
  const modal = document.getElementById("errorModal");
  if (event.target === modal) {
    closeModal();
  }
};

function createInputFields() {
  const sizeInput = document.getElementById("arraySize").value;
  const size = parseInt(sizeInput, 10);

  if (isNaN(size) || size < 1 || size > 50) {
    showModal("Inserisci un numero valido tra 1 e 50!");
    document.getElementById("arraySize").value = "";
    document.getElementById("arraySize").focus();
    return;
  }

  totalSize = size;
  currentIndex = 0;
  array = [];

  document.getElementById("inputSection").classList.remove("hidden");
  document.getElementById("resultsSection").classList.add("hidden");
  document.getElementById("currentInput").value = "";
  document.getElementById(
    "inputLabel"
  ).textContent = `Inserisci elemento 1 di ${totalSize}:`;
  document.getElementById("confirmBtn").textContent = "OK";
  document.getElementById("currentInput").focus();
}

function confirmNumber() {
  const value = parseFloat(document.getElementById("currentInput").value);

  if (isNaN(value)) {
    showModal("Inserisci un numero valido!");
    return;
  }

  array.push(value);
  currentIndex++;

  if (currentIndex < totalSize) {
    document.getElementById("currentInput").value = "";
    document.getElementById("inputLabel").textContent = `Inserisci elemento ${
      currentIndex + 1
    } di ${totalSize}:`;

    if (currentIndex === totalSize - 1) {
      document.getElementById("confirmBtn").textContent = "FINE";
    }

    document.getElementById("currentInput").focus();
  } else {
    processArray();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("currentInput")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        confirmNumber();
      }
    });
});

function bubbleSortWithSteps(arr) {
  const steps = [];
  const sortedArr = [...arr];
  const n = sortedArr.length;

  steps.push(`Array iniziale: [${sortedArr.join(", ")}]`);

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (sortedArr[j] > sortedArr[j + 1]) {
        [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
        swapped = true;
        steps.push(
          `Passaggio ${i + 1}: Scambio ${sortedArr[j + 1]} e ${
            sortedArr[j]
          } → [${sortedArr.join(", ")}]`
        );
      }
    }
    if (!swapped) break;
  }

  steps.push(`Array finale ordinato: [${sortedArr.join(", ")}]`);
  return { sorted: sortedArr, steps };
}

const processArray = () => displayResults();

function displayResults() {
  document.getElementById("originalArray").textContent = `[${array.join(
    ", "
  )}]`;

  const { sorted, steps } = bubbleSortWithSteps(array);
  document.getElementById("sortedArray").textContent = `[${sorted.join(", ")}]`;

  const stepsDiv = document.getElementById("sortingSteps");
  stepsDiv.innerHTML =
    '<h3 style="margin-top: 20px; color: #764ba2;">📋 Passaggi dell\'ordinamento (Bubble Sort):</h3>';
  steps.forEach((step, index) => {
    const stepDiv = document.createElement("div");
    stepDiv.className = "step step-animation";
    stepDiv.textContent = step;
    stepDiv.style.animationDelay = `${index * 0.1}s`;
    stepsDiv.appendChild(stepDiv);
  });

  const sum = array.reduce((acc, val) => acc + val, 0);
  document.getElementById("sum").textContent = sum.toFixed(2);

  const average = sum / array.length;
  document.getElementById("average").textContent = average.toFixed(2);

  const min = Math.min(...array);
  document.getElementById("min").textContent = min;

  const max = Math.max(...array);
  document.getElementById("max").textContent = max;

  const product = array.reduce((acc, val) => acc * val, 1);
  document.getElementById("product").textContent = product.toFixed(2);

  const evenCount = array.filter((num) => num % 2 === 0).length;
  document.getElementById("evenCount").textContent = evenCount;

  const oddCount = array.filter((num) => num % 2 !== 0).length;
  document.getElementById("oddCount").textContent = oddCount;

  const positiveCount = array.filter((num) => num > 0).length;
  document.getElementById("positiveCount").textContent = positiveCount;

  const negativeCount = array.filter((num) => num < 0).length;
  document.getElementById("negativeCount").textContent = negativeCount;

  document.getElementById("resultsSection").classList.remove("hidden");
  document
    .getElementById("resultsSection")
    .scrollIntoView({ behavior: "smooth" });
}

function reset() {
  document.getElementById("inputSection").classList.add("hidden");
  document.getElementById("resultsSection").classList.add("hidden");
  document.getElementById("arraySize").value = "";
  array = [];
  currentIndex = 0;
  totalSize = 0;
}


