import React from "react";
import styled from "styled-components";

export const Paragraph: React.FC<React.HTMLAttributes<
  HTMLParagraphElement
>> = ({ children, ...props }) => {
  return <Text {...props}>{children}</Text>;
};

const Text = styled.p`
  margin-top: 5vh;
`;

Text.displayName = "Text";
