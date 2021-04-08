import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { Rotate } from "../atoms";
import { breakpoints } from "../../styles/breakpoints";

interface IconBulletProps {
  icon: IconDefinition;
  text: string;
  rotate?: number;
}

export const IconBullet: React.FC<IconBulletProps> = ({
  icon,
  text,
  rotate = 0,
}) => {
  return (
    <IconBulletWrapper>
      <Rotate deg={rotate}>
        <FontAwesomeIcon icon={icon} />
      </Rotate>
      <Text>{text}</Text>
    </IconBulletWrapper>
  );
};

const IconBulletWrapper = styled.div`
  display: flex;
  font-size: 1.25rem;
  justify-content: center;

  & > svg {
    display: block;
  }

  @media ${breakpoints.M} {
    justify-content: flex-start;
  }
`;

IconBulletWrapper.displayName = "IconBulletWrapper";

const Text = styled.span`
  margin: 0 1rem;
  font-weight: 100;
`;

Text.displayName = "Text";
