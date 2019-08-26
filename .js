
    
    
  
    
    
      switch (this.operation) {
        case "+":
          computation = prev + current;
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
    getDisplayNumber() {
      const floatNumber = parseFloat(number);
      if (isNaN(floatNumber)) return "";
      return floatNumber.toLocaleString("en");
    }
    
  
  
 
  
  
  /*(this.numberTyping);
      if (this.operation != null) {
        this.numberTyped.innerText =
          "${this.getDisplayNumber(this.typedOperation)} ${this.operation}";*/