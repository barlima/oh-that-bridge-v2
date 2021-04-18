import styled from "styled-components";

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

Vertical.displayName = "Vertical";

const Horizontal = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

Horizontal.displayName = "Horizontal";

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
`;

Center.displayName = "Center";

export const Alignment = Object.assign({}, { Vertical, Horizontal, Center });
