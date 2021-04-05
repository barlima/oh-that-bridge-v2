import React from "react";
import styled from "styled-components";

interface DropDownProps {
  items: JSX.Element[];
}

export const DropDown: React.FC<DropDownProps> = ({ items }) => {
  return (
    <DropDownContainer>
      {items.map((item) => (
        <DropDownElement>{item}</DropDownElement>
      ))}
    </DropDownContainer>
  );
};

const DropDownContainer = styled.div`
  top: 100%;
  border: 1px solid var(--grey);
  margin-top: -1px;
  position: absolute;
  width: inherit;
  max-height: 200px;
`;

DropDownContainer.displayName = "DropDownContainer";

const DropDownElement = styled.div`
  background: var(--white);
  text-align: left;
  width: 100%;
`;

DropDownElement.displayName = "DropDownElement";
