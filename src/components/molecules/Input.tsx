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
  margin: calc(-1 * var(--padding));
  padding: var(--padding);
  width: calc(100% + 2*var(--padding));
  height: calc(1.2rem + 2*var(--padding));

  &:focus {
    outline: none;
  }
`;

StyledInput.displayName = "StyledInput";
