import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const Background = styled.div`
  background-color: var(--white);
  width: 100vw;
  height: 100vh;

  @media ${breakpoints.M} {
    background-color: var(--background);
    overflow: hidden;
    padding: 5vh;
    position: relative;
  }
`;

Background.displayName = "Background";
