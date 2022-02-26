import React from 'react'
import "./styles.css";
import { useTimerContext } from './TimerContext';

export const ListLaps = () => {

    const { lap } = useTimerContext();

  return (
    <div className='ListLaps'>
        {lap.map((time, index) => (
            
            <div className='elementLap' key={index}>
                <div>
                    Lap {lap.length - index }
                </div>
                <div>
                    {time}
                    </div>

            </div>
        ))}

    </div>
  )
}
