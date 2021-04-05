import React from "react";
import styled from "styled-components";

interface ListItemProps {
  text: string;
  addition?: string;
  active?: boolean;
  disabled?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  text,
  addition,
  active = false,
  disabled = false,
}) => {
  return (
    <ListItemContainer active={active} disabled={disabled}>
      <Text>{text}</Text>
      {addition && <Addition>({addition})</Addition>}
    </ListItemContainer>
  );
};

const ListItemContainer = styled.div<{ active: boolean; disabled: boolean }>`
  padding: calc(var(--padding) / 2) var(--padding);
  background-color: ${(p) => (p.active ? "var(--background)" : "var(--white)")};

  ${(p) => {
    if (!p.disabled) {
      return `
        &:hover {
          cursor: pointer;
          background-color: var(--background);
        } 
      `;
    } else {
      return `
        & * {
          color: var(--grey);
        }
      `;
    }
  }}
`;

ListItemContainer.displayName = "ListItemContainer";

const Text = styled.span`
  font-family: var(--fancy-font);
`;

Text.displayName = "Text";

const Addition = styled.span`
  font-weight: 100;
  font-size: 0.75rem;
  margin-left: 0.75rem;
`;

Addition.displayName = "Addition";
