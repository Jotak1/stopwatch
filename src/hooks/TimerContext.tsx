import { createContext, useContext } from "react";

export type TimerContextType = {
    time: number;
    isRunning: boolean;
    isReset: boolean;
    lap: number[];
    isLapNotEmpty: boolean;
    isModalOpen: boolean;
    user: any;
    handleStart: () => void;
    handleStop: () => void;
    handleReset: () => void;
    handleLap: () => void;
    handleSaveLap: () => void;
    handleShowUser: () => void;
    handleCloseModal: () => void;

};

export const TimerContext = createContext<TimerContextType>({
    time: 0,
    isRunning: false,
    isReset: false,
    lap: [],
    isLapNotEmpty: false,
    isModalOpen: false,
    user: [],
    handleStart: () => {},
    handleStop: () => {},
    handleReset: () => {},
    handleLap: () => {},
    handleSaveLap: () => {},
    handleShowUser: () => {},
    handleCloseModal: () => {}
});

export const useTimerContext = () => useContext(TimerContext);
