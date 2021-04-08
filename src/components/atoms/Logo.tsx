import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Title } from "./Title";
import { breakpoints } from "../../styles/breakpoints";

export const Logo: React.FC = () => {
  return (
    <Link href="/" passHref>
      <LogoWrapper>
        <Title as="h3" text="Oh, that bridge!" />
      </LogoWrapper>
    </Link>
  );
};

const LogoWrapper = styled.a`
  background-color: var(--black);
  height: 7vh;
  line-height: 7vh;
  display: flex;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;

  @media ${breakpoints.M} {
    background-color: transparent;
    bottom: 0;
    height: 5vh;
    top: auto;
    top: none;
    line-height: 5vh;
  }

  & > h3 {
    color: var(--white);
    margin: 0;
    transform: scale(0.75);
    transition: color 0.3s;

    &:hover {
      color: var(--black);
    }

    @media ${breakpoints.M} {
      color: var(--grey);
    }
  }
`;

LogoWrapper.displayName = "LogoWrapper";
