import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import styled from "@emotion/styled";
import { useTimerContext } from "../hooks/TimerContext";

export const Timer = () => {
  const { time } = useTimerContext();

  const [progressSeconds, setProgressSeconds] = useState(0);
  const [progressMinutes, setProgressMinutes] = useState(0);
  const [progressTens, setProgressTens] = useState(0);

  const getRandomColor = () => {
    return `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(
      Math.random() * 255
    )}, ${Math.floor(Math.random() * 255)})`;
  };

  const [tensColor, setTensColor] = useState(getRandomColor());

  const [secondsColor, setSecondsColor] = useState(getRandomColor());

  const [minutesColor, setMinutesColor] = useState(getRandomColor());

  const tens = Math.floor(time / 10) % 10;
  const seconds = Math.floor(time / 100) % 60;
  const minutes = Math.floor(time / 6000) % 60;

  useEffect(() => {
    if (progressTens < 1) {
      setTensColor(getRandomColor());
    }
    if (progressSeconds < 1) {
      setSecondsColor(getRandomColor());
    }
    if (progressMinutes < 1) {
      setMinutesColor(getRandomColor());
    }
    setProgressSeconds(Math.floor((seconds * 100) / 60));
    setProgressMinutes(Math.floor((minutes * 100) / 60));
    setProgressTens(Math.floor((tens * 100) / 9));
  }, [time]);

  const StyleSpinner = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // height: 100vh;
    background-color: #f5f5f5;
  `;
  const StyleCircularSecond = styled(CircularProgress)`
    // margin: 0 auto;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    width: 100%;
    // font-size: 9rem;
    color: ${secondsColor};
  `;
  const StyleCircularMinute = styled(CircularProgress)`
    // margin: 0 auto;
    margin-left: auto;
    margin-right: auto;
    // position: absolute;
    width: 100%;
    // font-size: 9rem;
    color: ${minutesColor};
  `;

  const StyleCircularTens = styled(CircularProgress)`
    // margin: 0 auto;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    width: 100%;
    // font-size: 9rem;
    color: ${tensColor};
  `;
  const StyleTimer = styled.div`
    // margin: 0 auto;
    position: absolute;
    font-size: 2rem;
  `;
  const StyleView = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    // height: 100vh;
    background-color: #f5f5f5;
  `;
  const StyleApp = styled.div`
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: #f5f5f5;
    box-shadow: 2px 2px 5px 5px #999;
    position: absolute
    z-index: -10;
    margin-left: auto;
    margin-right: auto;
    position: absolute;
    // width: 100%;
    // height: 100%;
    // font-size: 9rem;
    `;
    return (
      <StyleView>
      <StyleApp />
      <StyleSpinner>
        <StyleCircularMinute
          variant="determinate"
          value={progressMinutes}
          size={250}
          thickness={1}
        />
        <StyleCircularSecond
          size={200}
          variant="determinate"
          value={progressSeconds}
          thickness={1}
        />
        <StyleCircularTens
          variant="determinate"
          value={progressTens}
          size={150}
          thickness={1}
        />
      </StyleSpinner>
      <StyleTimer>
        {("0" + minutes).slice(-2) +
          ":" +
          ("0" + seconds).slice(-2) +
          ":" +
          tens}
      </StyleTimer>
    </StyleView>
  );
};
