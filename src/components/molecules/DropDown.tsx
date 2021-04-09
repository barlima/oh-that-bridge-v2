import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface DropDownProps {
  items: JSX.Element[];
}

export const DropDown: React.FC<DropDownProps> = ({ items }) => {
  return (
    <DropDownContainer
      initial={{ height: 0 }}
      animate={{ height: "auto", transition: { duration: 0.2 } }}
      exit={{ height: 0 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 0.2 } }}
          exit={{ opacity: 0 }}
        >
          <DropDownElement>{item}</DropDownElement>
        </motion.div>
      ))}
    </DropDownContainer>
  );
};

const DropDownContainer = styled(motion.div)`
  top: 100%;
  border: 1px solid var(--grey);
  margin-top: -1px;
  position: absolute;
  width: inherit;
  max-height: 200px;
  overflow-y: scroll;
  z-index: 100;
`;

DropDownContainer.displayName = "DropDownContainer";

const DropDownElement = styled.div`
  background-color: var(--white);
  text-align: left;
  width: 100%;
`;

DropDownElement.displayName = "DropDownElement";
