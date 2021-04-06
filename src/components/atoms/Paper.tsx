import React from "react";
import styled, { css } from "styled-components";
import { SizeEnum } from "../../utils/types";

interface PaperProps {
  size?: SizeEnum;
}

export const Paper: React.FC<PaperProps> = ({
  children,
  size = SizeEnum.L,
}) => {
  const compact = [SizeEnum.S, SizeEnum.M].includes(size);

  return <PaperContainer compact={compact}>{children}</PaperContainer>;
};

const pseudo = css`
  background: black;
  box-shadow: 0 0 20px 10px var(--black);
  border-radius: 50%;
  content: "";
  position: absolute;
  z-index: -1;
`;

const PaperContainer = styled.div<{ compact: boolean }>`
  background-color: var(--white);
  border-width: 0.5px;
  border-style: solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(
    to right bottom,
    var(--grey),
    transparent 20%,
    transparent 70%,
    var(--grey) 80%
  );
  padding: ${(p) =>
    p.compact ? "calc(var(--padding) / 2)" : "var(--padding)"};
  position: relative;
  width: fit-content;
  min-width: 200px;

  &::after {
    ${pseudo}
    bottom: 10px;
    height: 30%;
    left: 30px;
    width: 70%;
  }

  &::before {
    ${pseudo}
    height: min(70%, 100% - 60px);
    right: 10px;
    top: 40px;
    transform: rotate(5deg);
    width: 20%;
  }
`;

PaperContainer.displayName = "PaperContainer";
