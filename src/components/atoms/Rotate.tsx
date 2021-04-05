import React from "react";
import styled from "styled-components";

interface RotateProps {
  random?: boolean;
  deg?: number;
}

const getRandomRotation = (): number => Math.random() * 10 - 5;

export const Rotate: React.FC<RotateProps> = ({ random, deg, children }) => {
  const degrees = random ? getRandomRotation() : deg;
  
  return <RotateWrapper deg={degrees}>{children}</RotateWrapper>;
};

const RotateWrapper = styled.div<{ deg: number }>`
  transform: rotate(${(p) => p.deg}deg);
`;

RotateWrapper.displayName = "RotateWrapper";
