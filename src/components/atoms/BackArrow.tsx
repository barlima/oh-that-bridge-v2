import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Title } from "./Title";
import { breakpoints } from "../../styles/breakpoints";
import { slideLeft } from "../../utils/animations";

interface BackArrowProps {
  href: string;
}

export const BackArrow: React.FC<BackArrowProps> = ({ href }) => {
  return (
    <ArrowWrapper variants={slideLeft}>
      <Link href={href}>
        <a>
          <Title as="h2" text="<-" />
        </a>
      </Link>
    </ArrowWrapper>
  );
};

const ArrowWrapper = styled(motion.div)`
  display: none;
  position: fixed;
  left: 5vh;
  top: 0;

  & h2 {
    color: var(--grey);
    margin: 0;
    transition: color 0.3s;

    &:hover {
      color: var(--black);
    }
  }

  @media ${breakpoints.M} {
    display: block;
  }
`;

ArrowWrapper.displayName = "ArrowWrapper";
