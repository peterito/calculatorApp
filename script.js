class Calculator {
  constructor(numberTyped, numberTyping) {
    this.numberTyped = numberTyped;
    this.numberTyping = numberTyping;
    this.clear();
  }
  clear() {
    this.typingOperation = "";
    this.typedOperation = "";
    this.operation = undefined;
  }
  delete() {
    this.typingOperation = this.typingOperation.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number === "." && this.typingOperation.includes(".")) return;
    this.typingOperation = this.typingOperation.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.typingOperation === "") return;
    if (this.typedOperation !== "") {
      this.compute();
    }
    this.operation = operation;
    this.typedOperation = this.typingOperation;
    this.typingOperation = "";
  }
  compute() {
    let computation;
    const prev = parseFloat(this.typedOperation);
    const current = parseFloat(this.typingOperation);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "%":
        computation = (prev * current) / 100;
        break;

      case "-":
        computation = prev - current;
        break;

      case "*":
        computation = prev * current;
        break;

      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.readyToReset = true;
    this.typingOperation = computation;
    this.operation = undefined;
    this.typedOperation = "";
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimaDigits = stringNumber.split(".")[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = "";
    } else {
      integerDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0
      });
    }
    if (decimaDigits != null) {
      return `${integerDisplay}.${decimaDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.numberTyping.innerText = this.typingOperation;
    this.getDisplayNumber(this.typingOperation);
    if (this.operation != null) {
      this.numberTyped.innerText = `${this.typedOperation} ${this.operation}`;
    } else {
      this.numberTyped.innerText = "";
    }
  }
}

const numberBtn = document.querySelectorAll("[number-btn]");
const operationBtn = document.querySelectorAll("[operation-btn]");
const equalBtn = document.querySelector("[equal-operation-btn]");
const deleteBtn = document.querySelector("[delete-btn]");
const clearBtn = document.querySelector("[clear-btn]");
const numberTyped = document.querySelector("[number-typed]");
const numberTyping = document.querySelector("[number-typing]");

const calculator = new Calculator(numberTyped, numberTyping);

numberBtn.forEach(button => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationBtn.forEach(button => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
equalBtn.addEventListener("click", button => {
  calculator.compute();
  calculator.updateDisplay();
});
clearBtn.addEventListener("click", button => {
  calculator.clear();
  calculator.updateDisplay();
});
deleteBtn.addEventListener("click", button => {
  calculator.delete();
  calculator.updateDisplay();
});
