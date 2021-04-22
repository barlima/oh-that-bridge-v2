import React from "react";
import Link from "next/link";
import styled from "styled-components";

import { Bridge } from "../../utils/types";
import { Rotate } from "../atoms";
import { ImagePreview } from "./ImagePreview";

interface BridgesListProps {
  bridges: Bridge[];
}

export const BridgesList: React.FC<BridgesListProps> = ({ bridges }) => {
  return (
    <>
      {bridges.map((bridge) => (
        <Link href={`/bridges/${bridge.id}`} passHref key={bridge.id}>
          <BridgeLink>
            <Rotate random>
              <ImagePreview image={bridge.image} text={bridge.name} />
            </Rotate>
          </BridgeLink>
        </Link>
      ))}
    </>
  );
};

const BridgeLink = styled.a`
  margin: var(--padding);
  transition: transform 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    z-index: 10;

    & > div {
      transform: rotate(0);
    }
  }
`;

BridgeLink.displayName = "BridgeLink";
