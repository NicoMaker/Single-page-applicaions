import { useState } from 'react'
import './App.css'
import { Counter } from './components/Counter'


const cities = [
  {
    city: 'Udine',
    temp: 18
  },
  {
    city: 'Trieste',
    temp: 24
  },
  {
    city: 'Gorizia',
    temp: 14
  },
    {
    city: 'Pordenone',
    temp: 15
  }
];

function seekMaxMin() {
  let maxIndex = 0;
  let minIndex = 0;
  for(let i = 0; i < cities.length; i++) {
    if(cities[i].temp > cities[maxIndex].temp) {
      maxIndex = i;
    }

    if(cities[i].temp < cities[minIndex].temp) {
      minIndex = i;
    }
  }

  console.log(cities[maxIndex].city);
  console.log(cities[minIndex].city);
}
 
function reverse() {
  for(let i = 0; i < arr1.length / 2; i++) {
    const j = arr1.length - 1 - i;
    let tmp = arr1[j];
    arr1[j] = arr1[i];
    arr1[i] = tmp;
    console.log(arr1);
  }
  
  
}


function App() {
  const [visible, setVisible] = useState(false);

  function toggle() {
    setVisible(v => !v);
  }

  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <button onClick={seekMaxMin}>Max min</button>
      {visible && <Counter /> }
    </>
  )
}

export default App
