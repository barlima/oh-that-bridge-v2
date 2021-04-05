import React from "react";
import styled from "styled-components";

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
`;

Text.displayName = "Text";
