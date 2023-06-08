// Select the main and root elements
const main = document.querySelector("main")
const root = document.querySelector(":root")

// Get references to input fields and allowed keys
const inputUser = document.getElementById("input")
const inputResult = document.getElementById("result")
const listAllowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]

// Event listener for character keys
document.querySelectorAll(".charKey").forEach(function (btnCharKey) {
  btnCharKey.addEventListener("click", function () {
    const value = btnCharKey.dataset.value
    input.value += value
  })
})

// Event listener for clear button
document.getElementById("clear").addEventListener("click", function () {
  input.value = ""
  input.focus()
  inputResult.classList.remove("error")
  inputResult.placeholder = ""
})

// Event listener for keyboard input
input.addEventListener("keydown", function (evt) {
  evt.preventDefault()

  if (listAllowedKeys.includes(evt.key)) {
    input.value += evt.key
    return
  }

  if (evt.key == "Backspace") {
    input.value = input.value.slice(0, -1)
  }

  if (evt.key == "Enter") {
    calculate()
  }
})

// Event listener for equal button
document.getElementById('equal').addEventListener("click", calculate)

// Calculation function
function calculate() {
  inputResult.value = "ERROR"
  inputResult.classList.add("error")

  const inputExpression = input.value
  let result;

  try {
    result = math.evaluate(inputExpression)
    inputResult.value = result;
    inputResult.classList.remove("error")
  } catch (error) {
    console.log(error)
    inputResult.value = "ERROR";
    inputResult.classList.add("error")
  }

  // Restore buttons and texts to default
  resetCalculator();
}

// Event listener for copy button
document.getElementById("btnCopyToClipboard").addEventListener("click", function (evt) {
  const button = evt.currentTarget
  if (button.innerText === "Copy") {
    button.innerText = "Copied!"
    button.classList.add("success")
    navigator.clipboard.writeText(inputResult.value)
  } else {
    button.innerText = "Copy"
    button.classList.remove("success")
  }
})

// Event listener for theme switcher button
document.getElementById("btnThemeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    // Switch to light theme
    root.style.setProperty("--bg-color", "#f1f5f9")
    root.style.setProperty("--border-color", "#aaa")
    root.style.setProperty("--font-color", "#212529")
    root.style.setProperty("--primary-color", "#26834a")
    main.dataset.theme = "light"
  } else {
    // Switch to dark theme
    root.style.setProperty("--bg-color", "#212529")
    root.style.setProperty("--border-color", "#666")
    root.style.setProperty("--font-color", "#f1f5f9")
    root.style.setProperty("--primary-color", "#4dff91")
    main.dataset.theme = "dark"
  }
})

// Function to reset the calculator to default state
function resetCalculator() {
  // Reset input
  inputResult.classList.remove("error");

  // Reset copy button
  const copyButton = document.getElementById("btnCopyToClipboard");
  copyButton.innerText = "Copy";
  copyButton.classList.remove("success");
}
