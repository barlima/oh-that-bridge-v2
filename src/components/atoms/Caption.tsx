import React from "react";
import styled from "styled-components";

const CaptionText: React.FC = ({ children }) => {
  return <Text>{children}</Text>;
};

const CaptionLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...props
}) => {
  return <a {...props}>{children}</a>;
};

const Text = styled.span`
  bottom: 0.35rem;
  color: var(--white);
  font-size: 0.6rem;
  font-weight: 300;
  left: 0.35rem;
  position: absolute;
`;

Text.displayName = "Text";

export const Caption = Object.assign(CaptionText, { Link: CaptionLink });
