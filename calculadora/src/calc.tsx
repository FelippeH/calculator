import React, { useState, useEffect } from 'react';
import "./calc.css";

const Calc: React.FC = () => {
  const [currentNumber, setCurrentNumber] = useState<string>("");
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [restart, setRestart] = useState<boolean>(false);

  const addDigit = (digit: string) => {
    if (digit === "," && (currentNumber.includes(",") || currentNumber === "")) return;

    if (restart) {
      setCurrentNumber(digit);
      setRestart(false);
    } else {
      setCurrentNumber((prev) => prev + digit);
    }
  };

  const handleOperator = (newOperator: string) => {
    if (currentNumber) {
      setFirstOperand(parseFloat(currentNumber.replace(",", ".")));
      setCurrentNumber("");
    }
    setOperator(newOperator);
  };

  const calculate = () => {
    if (!operator || firstOperand === null) return;

    const secondOperand = parseFloat(currentNumber.replace(",", "."));
    let resultValue = 0;

    switch (operator) {
      case "+":
        resultValue = firstOperand + secondOperand;
        break;
      case "-":
        resultValue = firstOperand - secondOperand;
        break;
      case "x":
        resultValue = firstOperand * secondOperand;
        break;
      case "÷":
        resultValue = firstOperand / secondOperand;
        break;
      default:
        return;
    }

    setCurrentNumber(resultValue.toFixed(6).replace(/\.?0+$/, "").replace(".", ","));
    setOperator(null);
    setFirstOperand(null);
    setRestart(true);
  };

  const clearCalculator = () => {
    setCurrentNumber("");
    setFirstOperand(null);
    setOperator(null);
  };

  const setPercentage = () => {
    if (!currentNumber) return;
    let result = parseFloat(currentNumber.replace(",", ".")) / 100;
    if (operator && firstOperand !== null && ["+", "-"].includes(operator)) {
      result *= firstOperand;
    }
    setCurrentNumber(result.toFixed(6).replace(/\.?0+$/, "").replace(".", ","));
  };

  const handleKeydown = (event: KeyboardEvent) => {
    const key = event.key;

    if (/^[0-9.]$/.test(key)) {
      addDigit(key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      handleOperator(key === "*" ? "x" : key === "/" ? "÷" : key);
    } else if (key === "Enter" || key === "=") {
      event.preventDefault();
      calculate();
    } else if (key === "Backspace") {
      setCurrentNumber((prev) => prev.slice(0, -1));
    } else if (key === "Escape") {
      clearCalculator();
    } else if (key === "%") {
      setPercentage();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [currentNumber, firstOperand, operator, restart]);

  return (
    <div className="calculator">
      <div className="result">{currentNumber || "0"}</div>
      <div className="buttons">
        <button className="bg-dark-gray" onClick={clearCalculator}>C</button>
        <button className="bg-dark-gray" onClick={() => setCurrentNumber((prev) => (parseFloat(prev) * -1).toString())}>±</button>
        <button className="bg-dark-gray" onClick={setPercentage}>%</button>
        <button className="bg-orange" onClick={() => handleOperator("÷")}>÷</button>

        {["7", "8", "9"].map((num) => (
          <button key={num} className="bg-gray" onClick={() => addDigit(num)}>{num}</button>
        ))}
        <button className="bg-orange" onClick={() => handleOperator("x")}>x</button>

        {["4", "5", "6"].map((num) => (
          <button key={num} className="bg-gray" onClick={() => addDigit(num)}>{num}</button>
        ))}
        <button className="bg-orange" onClick={() => handleOperator("-")}>-</button>

        {["1", "2", "3"].map((num) => (
          <button key={num} className="bg-gray" onClick={() => addDigit(num)}>{num}</button>
        ))}
        <button className="bg-orange" onClick={() => handleOperator("+")}>+</button>

        <button className="bg-gray button-zero" onClick={() => addDigit("0")}>0</button>
        <button className="bg-gray" onClick={() => addDigit(",")}>,</button>
        <button className="bg-orange" onClick={calculate}>=</button>
      </div>
    </div>
  );
};

export default Calc;
