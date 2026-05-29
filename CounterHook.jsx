import React from 'react';
import { useState } from 'react'
//  Run in One Compiler React Env
const customCounterHook = (initVal, incCount=1, decCount=1) => {
  const [count, setCount] = useState(initVal);

  const increment = (step = incCount) => {

      setCount((prev) => {
        return prev + step
      });
  }
  const decrement = (step = decCount) => {
    setCount(prev => prev-step)
  }

  return {
    count, increment, decrement
  }
}

function App() {
  
  const styles = {
    main: {
      padding: '20px',
    },
    title: {
      color: '#5C6AC4'
    },
  };
  const customInc = 5;
  const customDec = 2;
  const {count, increment, decrement} = customCounterHook(10, customInc, customDec);
  
  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Counter Here!</h1>
      <h2>{count}</h2>
      <div>
        <button onClick = {() => increment()}>
          Increment
        </button>
        <button onClick = {() => decrement()}>
          Decrement
        </button>
      </div>
    </div>
  )
}

export default App
