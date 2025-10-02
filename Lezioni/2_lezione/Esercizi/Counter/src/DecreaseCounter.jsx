function DecreaseCounter({ setValue }) {
  const decrease = () => setValue(prev => prev - 1);

  return (
    <button className="btn decrement" onClick={decrease}>
      -
    </button>
  );
}

export default DecreaseCounter;