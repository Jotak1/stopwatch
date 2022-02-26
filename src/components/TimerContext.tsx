import { createContext, useContext } from "react";

export type TimerContextType = {
    time: number;
    isRunning: boolean;
    isReset: boolean;
    lap: number[];
    isLapNotEmpty: boolean;
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
    handleLap: () => void;
    handleSaveLap: () => void;
};

export const TimerContext = createContext<TimerContextType>({
    time: 0,
    isRunning: false,
    isReset: false,
    lap: [],
    isLapNotEmpty: false,
    handleStart: () => {},
    handleStop: () => {},
    handleReset: () => {},
    handleLap: () => {},
    handleSaveLap: () => {}
});

export const useTimerContext = () => useContext(TimerContext);
