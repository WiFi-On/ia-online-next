// utils/phoneUtils.ts

// Функция для получения только числовых значений из строки
export const getInputNumbersValue = (inputValue: string) => {
  return inputValue.replace(/\D/g, "");
};

// Функция для форматирования номера телефона
export const formatPhoneNumber = (inputNumbersValue: string) => {
  let formattedInputValue = "";

  if (!inputNumbersValue) return "";

  if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
    if (inputNumbersValue[0] === "9")
      inputNumbersValue = "7" + inputNumbersValue;
    const firstSymbols = inputNumbersValue[0] === "8" ? "8" : "+7";
    formattedInputValue = firstSymbols + " ";
    if (inputNumbersValue.length > 1) {
      formattedInputValue += "(" + inputNumbersValue.substring(1, 4);
    }
    if (inputNumbersValue.length >= 5) {
      formattedInputValue += ") " + inputNumbersValue.substring(4, 7);
    }
    if (inputNumbersValue.length >= 8) {
      formattedInputValue += "-" + inputNumbersValue.substring(7, 9);
    }
    if (inputNumbersValue.length >= 10) {
      formattedInputValue += "-" + inputNumbersValue.substring(9, 11);
    }
  } else {
    formattedInputValue = "+" + inputNumbersValue.substring(0, 16);
  }

  return formattedInputValue;
};

// Обработчик для вставки (удаляет все нечисловые символы при вставке)
export const handlePhonePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  const input = e.target as HTMLInputElement;
  const inputNumbersValue = getInputNumbersValue(input.value);
  const pastedText = e.clipboardData.getData("Text");

  if (/\D/g.test(pastedText)) {
    input.value = inputNumbersValue;
  }
};
