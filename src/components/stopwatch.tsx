import React, { useEffect, useState } from "react";
import { Timer } from "./timer";
import { Buttons } from "./buttons";
import styled from "@emotion/styled";

export const Stopwatch = () => {
  const StyleTitle = styled.div`
    font-size: 3rem;
    font-weight: bold;
    color: #000;
    z-index: 1;
  `;

  return (
      <>
      <StyleTitle>StopWatch</StyleTitle>

      <Timer />

      <Buttons />
      </>
  );
};
