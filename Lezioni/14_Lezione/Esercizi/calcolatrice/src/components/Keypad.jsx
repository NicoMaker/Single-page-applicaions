import React from 'react';

// Componente helper per un singolo bottone
const Button = ({ label, className, onClick }) => (
  <button className={`calculator-button ${className}`} onClick={onClick}>
    {label}
  </button>
);

const Keypad = ({ handlers }) => {
  const { 
    inputDigit, 
    inputDot, 
    handleOperator, 
    executeCalculation, 
    clearCalculator, 
    performSpecialOperation // Nuovo handler
  } = handlers;

  return (
    <div className="calculator-keys">
      {/* Riga 1: Funzioni e Divisione */}
      <Button label="C" className="function" onClick={clearCalculator} />
      <Button label="±" className="function" onClick={() => performSpecialOperation('+/-')} />
      <Button label="%" className="function" onClick={() => performSpecialOperation('%')} />
      <Button label="÷" className="operator" onClick={() => handleOperator('/')} />
      
      {/* Riga 2 */}
      <Button label="7" className="number" onClick={() => inputDigit(7)} />
      <Button label="8" className="number" onClick={() => inputDigit(8)} />
      <Button label="9" className="number" onClick={() => inputDigit(9)} />
      <Button label="×" className="operator" onClick={() => handleOperator('*')} />

      {/* Riga 3 */}
      <Button label="4" className="number" onClick={() => inputDigit(4)} />
      <Button label="5" className="number" onClick={() => inputDigit(5)} />
      <Button label="6" className="number" onClick={() => inputDigit(6)} />
      <Button label="−" className="operator" onClick={() => handleOperator('-')} />

      {/* Riga 4 & 5 */}
      <Button label="1" className="number" onClick={() => inputDigit(1)} />
      <Button label="2" className="number" onClick={() => inputDigit(2)} />
      <Button label="3" className="number" onClick={() => inputDigit(3)} />
      <Button label="+" className="operator" onClick={() => handleOperator('+')} />

      <Button label="0" className="number zero" onClick={() => inputDigit(0)} />
      <Button label="." className="number" onClick={inputDot} />
      <Button label="=" className="operator" onClick={executeCalculation} />
    </div>
  );
};

export default Keypad;