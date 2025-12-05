import React, { useState } from 'react';

// Funzione di calcolo sicuro (senza eval)
const calculate = (num1, num2, operator) => {
  // Assicura che i numeri siano trattati come floating point
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
      // Gestione divisione per zero
      if (n2 === 0) return 'Error';
      return (n1 / n2).toString();
    default:
      return n2.toString();
  }
};

const Calculator = () => {
  // Lo stato visualizzato (risultato o input corrente)
  const [displayValue, setDisplayValue] = useState('0');
  // Il primo operando (stringa per mantenere la precisione)
  const [firstOperand, setFirstOperand] = useState(null);
  // L'operatore in attesa (es. '+', '*')
  const [operator, setOperator] = useState(null);
  // Flag per indicare se l'input successivo è l'inizio del secondo operando
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  // --- Gestione input numeri (0-9) ---
  const inputDigit = (digit) => {
    if (displayValue === 'Error') {
        clearCalculator();
        return;
    }
    if (waitingForSecondOperand) {
      // Inizia un nuovo numero (secondo operando)
      setDisplayValue(String(digit));
      setWaitingForSecondOperand(false);
    } else {
      // Continua ad aggiungere cifre all'input corrente
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  // --- Gestione punto decimale (.) ---
  const inputDot = () => {
    if (displayValue === 'Error') return;

    if (waitingForSecondOperand) {
      // Se si inizia un nuovo operando, inizia con "0."
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    // Aggiunge il punto solo se non è già presente
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  // --- Gestione Operatori (+, -, *, /) ---
  const handleOperator = (nextOperator) => {
    if (displayValue === 'Error') return;
    
    // Converte il display in numero (la funzione calculate si occupa dei float)
    const inputValue = displayValue;

    if (firstOperand === null) {
      // 1. Imposta il primo operando
      setFirstOperand(inputValue);
    } else if (!waitingForSecondOperand) {
      // 2. Calcola il risultato intermedio
      const result = calculate(firstOperand, inputValue, operator);
      
      if (result === 'Error') {
          setDisplayValue(result);
          setFirstOperand(null);
      } else {
          // Imposta il risultato intermedio come nuovo firstOperand
          setDisplayValue(result);
          setFirstOperand(result);
      }
    }

    // Prepara per il prossimo input e imposta il nuovo operatore
    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  // --- Gestione Uguale (=) ---
  const executeCalculation = () => {
    if (displayValue === 'Error') return;

    // Richiede almeno un operando e un operatore in attesa
    if (firstOperand === null || operator === null || waitingForSecondOperand) {
      return;
    }

    const result = calculate(firstOperand, displayValue, operator);
    
    setDisplayValue(result);
    // Resetta lo stato per iniziare un nuovo calcolo dal risultato
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(true);
  };
  
  // --- Gestione C (Clear/Reset) ---
  const clearCalculator = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };
  
  // --- Componente per i Bottoni (opzionale, per chiarezza) ---
  const Button = ({ label, className, onClick }) => (
    <button className={`calculator-button ${className}`} onClick={onClick}>
      {label}
    </button>
  );

  return (
    <div className="calculator">
      {/* Display */}
      <div className="calculator-display">{displayValue}</div>

      <div className="calculator-keys">
        {/* Tasto C (Clear) */}
        <Button label="C" className="function large" onClick={clearCalculator} />
        
        {/* Tasti Operatori */}
        <Button label="÷" className="operator" onClick={() => handleOperator('/')} />
        <Button label="×" className="operator" onClick={() => handleOperator('*')} />
        
        {/* Riga 2: Numeri 7, 8, 9 */}
        <Button label="7" onClick={() => inputDigit(7)} />
        <Button label="8" onClick={() => inputDigit(8)} />
        <Button label="9" onClick={() => inputDigit(9)} />
        <Button label="−" className="operator" onClick={() => handleOperator('-')} />

        {/* Riga 3: Numeri 4, 5, 6 */}
        <Button label="4" onClick={() => inputDigit(4)} />
        <Button label="5" onClick={() => inputDigit(5)} />
        <Button label="6" onClick={() => inputDigit(6)} />
        <Button label="+" className="operator" onClick={() => handleOperator('+')} />

        {/* Riga 4 e 5: Numeri 1, 2, 3, 0, Punto e Uguale */}
        <Button label="1" onClick={() => inputDigit(1)} />
        <Button label="2" onClick={() => inputDigit(2)} />
        <Button label="3" onClick={() => inputDigit(3)} />
        <Button label="=" className="operator large-equal" onClick={executeCalculation} />

        <Button label="0" className="zero" onClick={() => inputDigit(0)} />
        <Button label="." onClick={inputDot} />
      </div>
    </div>
  );
};

export default Calculator;