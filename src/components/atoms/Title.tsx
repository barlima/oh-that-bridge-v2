import React from "react";
import styled from "styled-components";
import { breakpoints } from "../../styles/breakpoints";

interface TitleProps {
  text: string | JSX.Element;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span";
}

export const Title: React.FC<TitleProps> = ({ text, as }) => {
  return <Text as={as}>{text}</Text>;
};

const Text = styled.span`
  color: var(--black);
  font-family: Permanent Marker;
  text-transform: uppercase;
  transform: scale(0.75);

  & * {
    color: inherit;
    font-family: inherit;
    text-transform: inherit;
  }

  & a {
    transition: color 0.3s;
  }

  & a:hover {
    color: var(--grey);
  }

  @media ${breakpoints.M} {
    transform: scale(1);
  }
`;

Text.displayName = "Text";
