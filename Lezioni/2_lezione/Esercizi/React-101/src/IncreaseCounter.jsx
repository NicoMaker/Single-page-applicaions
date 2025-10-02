function IncreaseCounter({ setValue }) {
  const increase = () => setValue(prev => prev + 1);

  return (
    <button className="btn increment" onClick={increase}>
      +
    </button>
  );
}

export default IncreaseCounter;