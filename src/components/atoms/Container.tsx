import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

export const Container = styled.div`
  background-color: var(--white);
  width: 100%;
  min-height: 90vh;
  overflow-x: hidden;
  padding: 2rem;
  padding-top: calc(7vh + 2rem);

  @media ${breakpoints.M} {
    padding-top: 2rem;
  }

  & h1 {
    margin: 0;
    text-align: center;

    @media ${breakpoints.M} {
      text-align: left;
    }
  }
`;

Container.displayName = "Container";
