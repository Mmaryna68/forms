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
const brandSelect = document.getElementById("brand");
const modelSelect = document.getElementById("model");
const fuelInputs = document.querySelectorAll('input[name="fuel"]');
const engineVolumeInput = document.getElementById("engineVolume");
const conditionInputs = document.querySelectorAll('input[name="condition"]');
const ownersInputs = document.querySelectorAll('input[name="owners"]');
const paymentMethodSelect = document.getElementById("payment-method");
const calculateBtn = document.getElementById("calculate-btn");
const resultDiv = document.getElementById("result");

// Событие на изменение марки авто
brandSelect.addEventListener("change", () => {
  // Разблокируем элемент модели автомобиля
  modelSelect.disabled = false;

  // Очищаем список опций модели автомобиля
  modelSelect.innerHTML = "";

  // Получаем выбранную марку автомобиля
  const selectedBrand = this.value;

  // Получаем модели автомобилей для выбранной марки
  const models = prices[selectedBrand];

  // Создаем новый элемент опции для каждой модели и добавляем его в список
  for (const model in models) {
    const option = document.createElement("option");
    option.value = model;
    option.textContent = model;
    modelSelect.appendChild(option);
  }
});

// Задаем обработчик события при изменении выбора марки
brandSelect.addEventListener("change", () => {
  // Получаем выбранную марку автомобиля
  const selectedBrand = brandSelect.value;

  // Очищаем список моделей автомобилей
  modelSelect.innerHTML = "";

  // Если выбрана марка автомобиля, которой нет в нашей базе данных, то выходим из функции
  if (!prices[selectedBrand]) {
    return;
  }

  // Добавляем опции для элемента select с id="model"
  const models = Object.keys(prices[selectedBrand]);
  for (let i = 0; i < models.length; i++) {
    const option = document.createElement("option");
    option.text = models[i];
    option.value = models[i];
    modelSelect.add(option);
  }

  // Включаем элемент select с id="model"
  modelSelect.disabled = false;
});

const getCarPrice = () => {
  const brand = brandSelect.value.toLowerCase();
  const model = modelSelect.value.toLowerCase();
  const engine = engineSelect.value;
  const engineVolume = parseFloat(engineVolumeInput.value);

  let price = 0;

  if (brand in prices && model in prices[brand]) {
    price = prices[brand][model];
  }

  return price;
};

// функция для получения стоимости автомобиля
function getCarPrice() {
  let brand = document.getElementById("brand").value;
  let model = document.getElementById("model").value;
  let fuel = document.querySelector('input[name="fuel"]:checked').value;
  let engineVolume = parseFloat(document.getElementById("engineVolume").value);
  let condition = document.querySelector(
    'input[name="condition"]:checked'
  ).value;
  let ownerCount =
    condition === "used"
      ? document.querySelector('input[name="owner-count"]:checked').value
      : null;
  let paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  ).value;

  let car = data.find(
    (item) => item.brand === brand && item.models.some((m) => m.model === model)
  );

  let modelData = car.models.find((m) => m.model === model);

  let engineData = modelData.engines.find((e) => e.value === engineVolume);

  let conditionMultiplier =
    condition === "new" ? 1 : ownerCount === "1-2" ? 0.8 : 0.6;

  let price =
    modelData.basePrice +
    engineData.price +
    (fuel === "electricity" ? modelData.electricityPrice : 0) +
    (conditionMultiplier - 1) * modelData.basePrice * 0.2;

  if (paymentMethod === "card") {
    price = price * 1.02;
  } else if (paymentMethod === "legal-entity") {
    price = price * 0.98;
  }

  return price.toFixed(2);
}

// функция для обновления результата на странице
function updateResult() {
  let price = getCarPrice();

  let result = document.getElementById("result");

  result.innerHTML = `Стоимость автомобиля: ${price} $.`;
}
