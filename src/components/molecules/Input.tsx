import React from "react";
import { Paper } from "../atoms";
import styled from "styled-components";

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
  ...props
}) => {
  return (
    <Paper>
      <StyledInput {...props} />
    </Paper>
  );
};

const StyledInput = styled.input`
  border: none;
  font-size: 1.2rem;
  font-weight: 300;
  width: 100%;

  &:focus {
    outline: none;
  }
`;

StyledInput.displayName = "StyledInput";
