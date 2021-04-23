import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Bridge } from "../../utils/types";
import { Rotate } from "../atoms";
import { ImagePreview } from "./ImagePreview";
import { fadeInAndOutSlowly } from "../../utils/animations";

interface BridgesListProps {
  bridges: Bridge[];
}

export const BridgesList: React.FC<BridgesListProps> = ({ bridges }) => {
  return (
    <>
      {bridges.map((bridge) => (
        <BridgeLink variants={fadeInAndOutSlowly}>
          <Link href={`/bridges/${bridge.id}`} passHref key={bridge.id}>
            <a>
              <Rotate random>
                <ImagePreview image={bridge.image} text={bridge.name} />
              </Rotate>
            </a>
          </Link>
        </BridgeLink>
      ))}
    </>
  );
};

const BridgeLink = styled(motion.div)`
  margin: var(--padding);
  transition: transform 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1) !important;
    z-index: 10;

    & > div {
      transform: rotate(0);
    }
  }
`;

BridgeLink.displayName = "BridgeLink";
