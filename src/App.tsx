import React, { useState, useEffect } from 'react';
import './App.css';
import { Stopwatch } from './components/stopwatch';
import { TimerContext } from './hooks/TimerContext';
import { ListLaps } from './components/listLaps';
import Swal from 'sweetalert2';
import axios from 'axios';
import { ModalUser } from './components/modal';
import { createContext } from 'react';

function App() {

  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [isReset, setIsReset] = useState(false)
  const [lap, setLap] = useState<any>([])
  const [isLapNotEmpty, setIsLapNotEmpty] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState<any>([])

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
    const stopwatch = ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2) + ":" + tens;
    if (lap.length === 0) {
      setLap([stopwatch])
    } else {
      setLap([stopwatch, ...lap])
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
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
      if (result.value.length > 15) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your name is too long, Max 15 characters',
          showCloseButton: true,
          focusConfirm: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel'
        })
        return
      }
      if (result.value.length < 3) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Your name is too short, Min 3 characters',
          showCloseButton: true,
          focusConfirm: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ok',
          cancelButtonText: 'Cancel'
        })
        return
      }
      if (result.value) {
        const data = {
          name: result.value,
          laps: lap,
        }
        axios.post('http://localhost:4000/api/laps/', data)
          .then(res => {
            Swal.fire(
              'Saved!',
              'Your laps has been saved',
              'success'
            )
          })
          .catch(err => {
            Swal.fire(
              'Error!',
              'Your laps has not been saved',
              'error'
            )
          }
          )
      }
    }).catch(err => {
      console.log(err)

    })

  }
  const handleShowUser = () => {
    Swal.fire({
      title: 'Insert your name',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Search',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.value) {
        axios.get('http://localhost:4000/api/laps/' + result.value)
          .then(res => {
            if (res.data.data.length === 0) {
              Swal.fire(
                'Not found!',
                'User not found',
                'error'
              )
            } else {
              setUser(res.data.data)
              setIsModalOpen(true)
            }
          })
      }
    }).catch(err => {
      console.log(err)
    })

  }



  return (
    <div className="App">
      <TimerContext.Provider value={{ time, isRunning, isReset, lap, isLapNotEmpty, isModalOpen, user, handleStart, handleStop, handleReset, handleLap, handleSaveLap, handleShowUser, handleCloseModal }}>
        <Stopwatch />
        <ListLaps />
        {isModalOpen ? <ModalUser /> : null}
      </TimerContext.Provider>
    </div>
  );
}

export default App;
