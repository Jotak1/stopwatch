import styled from "@emotion/styled";
import { Fab } from "@mui/material";
import React, { useEffect } from "react";
import { useTimerContext } from "../hooks/TimerContext";
import "./styles.css";

export const Buttons = () => {
  const { isLapNotEmpty, isRunning, handleStart, handleStop, handleReset, handleLap, handleSaveLap, handleShowUser } =
    useTimerContext();




  return (
    <>
      <div className="controlButtons">
        {!isRunning ? (
          <>
            <Fab className="buttonFab" onClick={handleStart}>
              Start
            </Fab>
            <Fab className="buttonFab" onClick={handleReset}>
              Reset
            </Fab>
          </>
        ) : (
          <>
            <Fab className="buttonFab" onClick={handleStop}>
              Stop
            </Fab>
            <Fab className="buttonFab" onClick={handleLap}>
              Lap
            </Fab>
          </>
        )} {
          isLapNotEmpty ? (
            <Fab className="buttonFab" onClick={handleSaveLap} disabled={isRunning} >
              Save
            </Fab>
          ) : (
            <Fab className="buttonFab" onClick={handleShowUser} >
              Users
            </Fab>
          )
        }
      </div>
    </>
  );
};
