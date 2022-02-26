import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Stopwatch } from './components/stopwatch';
import styled from '@emotion/styled';
import { TimerContext } from './components/TimerContext';
import { ListLaps } from './components/listLaps';
import Swal from 'sweetalert2';
import axios from 'axios';

function App() {

  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [lap, setLap] = useState<any>([])
  const [isLapNotEmpty, setIsLapNotEmpty] = useState(false)

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime(time => time + 10)
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isRunning])

  useEffect(() => {
    if (isRunning && lap.length > 0) {
      setIsLapNotEmpty(true)
    }
  }, [lap])



  const handleStart = () => {
    setIsRunning(true)
  }

  const handleStop = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setTime(0)
    setIsRunning(false)
    setIsReset(true)
    setLap([])
    setIsLapNotEmpty(false)
    setTimeout(() => {
      setIsReset(false)
    }, 100)
  }

  const handleLap = () => {
    const tens = Math.floor(time / 10) % 10;
    const seconds = Math.floor(time / 100) % 60;
    const minutes = Math.floor(time / 6000) % 60;
    const stopwatch = ("0" + minutes).slice(-2) +":" + ("0" + seconds).slice(-2) +":" + tens;  
    if (lap.length === 0) {
      setLap([stopwatch])
    } else {
      setLap([stopwatch, ...lap])
    }
  }

  const handleSaveLap = () => {
    Swal.fire({
      icon: 'info',
      title: 'Save yours laps',
      text: 'Enter your name',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
        
      showCancelButton: true,
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Save',
      cancelButtonText: 'Cancel'
    }).then((result) => {
          console.log(result)
      if (result.value) {
        const data = {
          name: result.value,
          laps: lap,
        }
        console.log(data)
        // axios.post('http://localhost:4000/api/saveLap', data)
        // .then(res => {
        //   console.log(res)
        // })
        // .catch(err => {
        //   console.log(err)
        // })
      }
    })
  }

  return (
    <div className="App">
      <TimerContext.Provider value={{ time, isRunning, isReset, lap, isLapNotEmpty, handleStart, handleStop, handleReset, handleLap, handleSaveLap }}>

        <Stopwatch />
        <ListLaps />
      </TimerContext.Provider>
    </div>
  );
}

export default App;
