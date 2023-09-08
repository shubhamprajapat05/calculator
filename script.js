let result = document.getElementById("result");
let currentInput = "";
let historyList = document.getElementById("history-list");

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
        const expression = currentInput;
        currentInput = eval(currentInput);
        result.value = currentInput;

        // Store the calculation history
        const historyItem = document.createElement('li');
        historyItem.innerHTML = `
            ${expression} = ${currentInput}
            <button onclick="deleteHistoryItem(this)">Clear</button>
        `;
        historyList.appendChild(historyItem);

    } catch (error) {
        result.value = "Error";
        currentInput = "";
    }
}

function deleteHistoryItem(button) {
    const listItem = button.parentNode;
    historyList.removeChild(listItem);
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
    } else if (key === "Delete") {
        clearResult();
    } else if (!isNaN(key) || key === "." || "+-*/()".includes(key)) {
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
