import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { breakpoints } from "../../styles/breakpoints";

export const Background: React.FC = ({ children }) => {
  return (
    <BackgroundContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </BackgroundContainer>
  );
};

const BackgroundContainer = styled(motion.div)`
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
