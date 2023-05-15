//*** Задание под звездочкой (тренировка регулярных выражений)
// Задача 1
function checkYear() {
  const yearInput = document.getElementById("year-input").value;
  const regex = /^20(0\d|1[0-9])$/;

  if (regex.test(yearInput)) {
    document.getElementById("year-result").innerHTML =
      "Год входит в интервал от 2000 до 2100";
  } else {
    document.getElementById("year-result").innerHTML =
      "Год не входит в интервал от 2000 до 2100";
  }
}

// Задача 2
function removeDuplicates() {
  const textInput = document.getElementById("text-input").value;
  const regex = /\b\w*(\w)\1\w*\b/g;
  const result = textInput.replace(regex, "");

  document.getElementById("text-result").innerHTML = result;
}

// Задача 3
function replaceWords() {
  const textInput = document.getElementById("text2-input").value;
  const result = textInput.replace(/ааа\s+ааа/gi, "ххх");

  document.getElementById("text2-result").innerHTML = result;
}

// Задача 4
function removeRepeatedWords() {
  const textInput = document.getElementById("text3-input").value;
  const result = textInput
    .replace(/ааа\s*ааа\s*ааа/gi, "ххх")
    .replace(/ап\s/gi, "");

  document.getElementById("text3-result").innerHTML = result;
}
