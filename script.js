let result = document.getElementById("result");
let currentInput = "";

function appendToResult(value) {
    currentInput += value;
    result.value = currentInput;
}

function clearResult() {
    currentInput = "";
    result.value = "";
}

function calculateResult() {
    try {
        currentInput = eval(currentInput);
        result.value = currentInput;
    } catch (error) {
        result.value = "Error";
        currentInput = "";
    }
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    result.value = currentInput;
}

function handleKeyPress(key) {
    if (key === "Enter") {
        calculateResult();
    } else if (key === "Escape") {
        clearResult();
    } else if (key === "Backspace") {
        backspace();
    } else if (key === "Delete") { // Added handling for "Delete" key
        clearResult();
    } else if (!isNaN(key) || key === "." || "+-*/".includes(key)) {
        appendToResult(key);
    }
}

document.addEventListener("keydown", (event) => {
    handleKeyPress(event.key);
});

document.querySelectorAll(".buttons button").forEach((button) => {
    button.addEventListener("click", () => {
        handleKeyPress(button.innerText);
    });
});
