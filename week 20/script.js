// Задаем цены и коэффициенты
const prices = {
  renault: {
    Clio: 10000,
    Megane: 15000,
    Kadjar: 20000,
    Talisman: 25000,
  },
  opel: {
    Corsa: 12000,
    Astra: 17000,
    Insignia: 22000,
    Crossland: 27000,
  },
  mazda: {
    2: 13000,
    3: 18000,
    6: 23000,
    "CX-5": 28000,
  },
  jaguar: {
    XE: 30000,
    XF: 35000,
    "F-PACE": 40000,
    "I-PACE": 45000,
  },
};

// Получаем элементы формы
const fuelInputs = document.querySelectorAll('input[name="fuel"]');
const engineVolumeInput = document.getElementById("engineVolume");
const conditionInputs = document.querySelectorAll('input[name="condition"]');
const ownersInputs = document.querySelectorAll('input[name="owners"]');
const paymentMethodSelect = document.getElementById("payment-method");
const resultDiv = document.getElementById("result");

// Получаем модели автомобилей для выбранной марки
const brandSelect = document.getElementById("brand");
const modelSelect = document.getElementById("model");
brandSelect.addEventListener("change", () => {
  const models = prices[brandSelect.value];
  modelSelect.innerHTML = "";
  modelSelect.disabled = false;
  for (const model in models) {
    const option = document.createElement("option");
    option.value = model;
    option.text = model;
    modelSelect.add(option);
  }
});

// Получаем радиокнопки для типа автомобиля
const usedRadio = document.getElementById("used");
const ownersGroup = document.getElementById("owners-group");

// Обработчик события для выбора типа автомобиля
usedRadio.addEventListener("change", () => {
  if (usedRadio.checked) {
    ownersGroup.style.display = "block";
  } else {
    ownersGroup.style.display = "none";
  }
});

const newRadio = document.getElementById("new");

newRadio.addEventListener("change", () => {
  if (newRadio.checked) {
    ownersGroup.style.display = "none";
  } else {
    ownersGroup.style.display = "block";
  }
});

const calculateBtn = document.getElementById("calculate-btn");
// добавляем обработчик события "click" для кнопки "Рассчитать стоимость"
calculateBtn.onclick = () => {
  calculatePrice();
};

// получаем значения выбранных параметров
function calculatePrice() {
  const brand = document.getElementById("brand").value;
  const model = document.getElementById("model").value;
  const fuel = document.querySelector('input[name="fuel"]:checked').value;
  const engineVolume = parseFloat(
    document.getElementById("engineVolume").value
  );
  const condition = document.querySelector(
    'input[name="condition"]:checked'
  ).value;
  const paymentMethod = document.getElementById("payment-method").value;

  const basePrice = prices[brand][model];
  let conditionCoefficient = 1;
  let ownersCoefficient = 1;
  let paymentCoefficient = 1;

  if (condition === "used") {
    conditionCoefficient = 0.7;
  }

  let owners = "1-2"; // Значение по умолчанию для нового автомобиля (тип "new")
  if (condition === "used") {
    owners = document.querySelector('input[name="owners"]:checked').value;
  }

  if (owners === "3+") {
    ownersCoefficient = 0.9;
  }

  if (paymentMethod === "cash") {
    paymentCoefficient = 0.95;
  }

  const finalPrice =
    basePrice * conditionCoefficient * ownersCoefficient * paymentCoefficient;

  const resultElement = document.getElementById("result");
  resultElement.innerHTML = `Стоимость автомобиля: ${finalPrice} $.`;
}
