import React, { useState } from 'react';
import Display from './Display';
import Keypad from './Keypad';

// Funzione helper di calcolo sicuro (senza eval)
const calculate = (num1, num2, operator) => {
  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  switch (operator) {
    case '+':
      return (n1 + n2).toString();
    case '-':
      return (n1 - n2).toString();
    case '*':
      return (n1 * n2).toString();
    case '/':
      if (n2 === 0) return 'Error';
      return (n1 / n2).toString();
    default:
      return n2.toString();
  }
};

const Calculator = () => {
  // --- STATO ---
  const [displayValue, setDisplayValue] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // --- HANDLERS DI BASE ---
  const clearCalculator = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const inputDigit = (digit) => {
    if (displayValue === 'Error') { clearCalculator(); return; }
    if (waitingForSecondOperand) {
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const inputDot = () => {
    if (displayValue === 'Error') return;
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // --- GESTIONE OPERATORI (+, -, *, /) ---
  const handleOperator = (nextOperator) => {
    if (displayValue === 'Error') return;
    const inputValue = displayValue;

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (!waitingForSecondOperand) {
      const result = calculate(firstOperand, inputValue, operator);
      if (result === 'Error') {
          setDisplayValue(result);
          setFirstOperand(null);
      } else {
          setDisplayValue(result);
          setFirstOperand(result);
      }
    }
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  // --- ESECUZIONE CALCOLO (=) ---
  const executeCalculation = () => {
    if (displayValue === 'Error' || firstOperand === null || operator === null || waitingForSecondOperand) {
      return;
    }
    const result = calculate(firstOperand, displayValue, operator);
    setDisplayValue(result);
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };

  // --- NUOVA GESTIONE OPERAZIONI SPECIALI (±, %) ---
  const performSpecialOperation = (op) => {
      const inputValue = parseFloat(displayValue);

      if (displayValue === 'Error') return;

      switch (op) {
          case '+/-':
              setDisplayValue(String(inputValue * -1));
              break;
          case '%':
              // La percentuale agisce come (current value / 100)
              const percentValue = inputValue / 100;
              setDisplayValue(String(percentValue));
              setWaitingForSecondOperand(false); 
              break;
          default:
              break;
      }
  };

  // Oggetto contenente tutti gli handler da passare al Keypad
  const keypadHandlers = {
      inputDigit,
      inputDot,
      handleOperator,
      executeCalculation,
      clearCalculator,
      performSpecialOperation, // Nuovo handler
  };

  return (
    <div className="calculator">
      <Display value={displayValue} />
      <Keypad handlers={keypadHandlers} />
    </div>
  );
};

export default Calculator;