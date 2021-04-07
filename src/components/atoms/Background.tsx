import React from "react";
import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";
import { Fade } from "../../containers";

export const Background: React.FC = ({ children }) => {
  return (
    <Fade>
      <BackgroundContainer>{children}</BackgroundContainer>
    </Fade>
  );
};

const BackgroundContainer = styled.div`
  background-color: var(--white);
  width: 100vw;
  height: max(100%, 100vh);

  @media ${breakpoints.M} {
    background-color: var(--background);
    overflow: hidden;
    padding: 5vh;
    position: relative;
  }
`;

BackgroundContainer.displayName = "BackgroundContainer";
