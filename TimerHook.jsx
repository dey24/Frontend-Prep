import React from 'react';
import { useState, useRef } from 'react'
//  Run in One Compiler React Env

const useTimerHook = () => {
  const [time, setTime] = useState(0);
  const timeInterval = useRef(null);

  const startTimer = () => {
    if (timeInterval.current) return;

    timeInterval.current = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    clearInterval(timeInterval.current);
    timeInterval.current = null;
    setTime(0);
  };

  return {
    time,
    startTimer,
    stopTimer
  };
};


function App() {
  
  const styles = {
    main: {
      padding: '20px',
    },
    title: {
      color: '#5C6AC4'
    },
  };
  
  
  const { time, startTimer, stopTimer } = useTimerHook();

  return (
    <div style={styles.main}>
      <h1 style={styles.title}>Timer Here!</h1>
      <h2>{time}</h2>
      <div>
        <button onClick={startTimer}>
          Start Timer
        </button>
        <button onClick={stopTimer}>
          Stop Timer
        </button>
      </div>
    </div>
  )
}

export default App
