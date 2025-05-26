function convertToRoman(num) {
  if (num < 1 || num > 3999) {
    return "Number out of range (1-3999)";
  }

  const romanNumerals = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };

  let roman = "";

  for (let key in romanNumerals) {
    while (num >= romanNumerals[key]) {
      roman += key;
      num -= romanNumerals[key];
    }
  }

  return roman;
}

function explainRomanSymbols(romanNumeral) {
  const explanations = {
    M: "M means 1000, mega huge! Like 1000 building blocks! 🧱",
    D: "D means 500, super big! Imagine 500 ice cream scoops! 🍦",
    C: "C means 100, wow! Like 100 colorful balloons! 🎈",
    L: "L means 50, that's a lot! Like 50 bouncy balls! 🏀",
    X: "X means 10, like counting all your fingers and toes (if you're an alien with 10 toes)! 👽",
    V: "V means 5, like a high-five! 🖐️",
    I: "I means 1, like 1 little star! ⭐",
  };

  const combinedSymbols = {
    CM: "CM means 900 (1000 - 100), that's a clever way to write it!",
    CD: "CD means 400 (500 - 100), another smart combo!",
    XC: "XC means 90 (100 - 10), super efficient!",
    XL: "XL means 40 (50 - 10), pretty neat!",
    IX: "IX means 9 (10 - 1), almost ten!",
    IV: "IV means 4 (5 - 1), just one less than five!",
  };

  let result = "";
  let i = 0;
  while (i < romanNumeral.length) {
    // Check for two-character combined symbols first
    if (i + 1 < romanNumeral.length) {
      let twoChar = romanNumeral.substring(i, i + 2);
      if (combinedSymbols[twoChar]) {
        result += combinedSymbols[twoChar] + "<br>";
        i += 2;
        continue;
      }
    }
    // Check for single-character symbols
    let oneChar = romanNumeral.substring(i, i + 1);
    if (explanations[oneChar]) {
      result += explanations[oneChar] + "<br>";
      i += 1;
    } else {
      // Should not happen with valid Roman numerals from convertToRoman
      i += 1; 
    }
  }
  return result;
}

// DOM Interaction
document.addEventListener('DOMContentLoaded', () => {
  const decimalInput = document.getElementById('decimalInput');
  const convertButton = document.getElementById('convertToRoman');
  const romanResultDiv = document.getElementById('romanResult');
  const symbolExplanationDiv = document.getElementById('symbolExplanation');

  convertButton.addEventListener('click', () => {
    const inputValue = decimalInput.value;

    // Clear previous results and explanations at the start
    romanResultDiv.innerHTML = "";
    symbolExplanationDiv.innerHTML = "";

    if (inputValue.trim() === "") {
      romanResultDiv.innerHTML = "Please enter a number! 😊";
      return;
    }

    // New check for decimal points
    if (inputValue.includes('.')) {
      romanResultDiv.innerHTML = "Hmm, that looks like a decimal number. Please use whole numbers only! 🔢";
      symbolExplanationDiv.innerHTML = "";
      return;
    }

    const num = parseInt(inputValue, 10);

    if (isNaN(num)) {
      romanResultDiv.innerHTML = "Hmm, that doesn't look like a number. Try again! 🔢";
      return;
    }

    if (num < 1) {
      romanResultDiv.innerHTML = "Oops! Please enter a number from 1 to 3999. Romans didn't use zero or negative numbers! 🤔";
      return;
    }

    if (num > 3999) {
      romanResultDiv.innerHTML = "That's a big number! This Roman calculator goes up to 3999. Try a smaller one! ✨";
      return;
    }

    // If all checks pass, proceed with conversion
    const romanNumeral = convertToRoman(num);
    romanResultDiv.innerHTML = `The Roman numeral is: ${romanNumeral}`;

    // convertToRoman itself also checks range, but the messages above are more specific.
    // This check is now more of a fallback or for the specific string it returns.
    if (romanNumeral !== "Number out of range (1-3999)") {
      const explanation = explainRomanSymbols(romanNumeral);
      symbolExplanationDiv.innerHTML = explanation;
    } else {
      // This case should ideally be caught by the num > 3999 or num < 1 checks above,
      // but kept as a safeguard.
      symbolExplanationDiv.innerHTML = "Cannot explain symbols for an invalid or out-of-range number.";
    }
  });
});
