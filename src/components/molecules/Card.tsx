import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { Paper, Caption, Title } from "../atoms";
import { SizeEnum, Image as ImageType } from "../../utils/types";
import {
  IMAGE_RATIO,
  DEFAULT_IMAGE_WIDTH,
  FALLBACK_IMAGE,
} from "../../utils/consts";
import { breakpoints } from "../../styles/breakpoints";

interface CardProps {
  image: ImageType;
  level?: SizeEnum;
  width?: number;
  text?: string | JSX.Element;
  ratio?: number;
}

export const Card: React.FC<CardProps> = ({
  image,
  level = SizeEnum.L,
  width,
  text,
  ratio = IMAGE_RATIO,
}) => {
  return (
    <Paper size={level}>
      <ImageWrapper>
        <Image
          src={image.src || FALLBACK_IMAGE}
          alt={image.alt}
          layout="intrinsic"
          objectFit="cover"
          priority
          width={width || DEFAULT_IMAGE_WIDTH}
          height={(width || DEFAULT_IMAGE_WIDTH) * ratio}
        />
        {image.caption && !text && (
          <Caption>
            {image.caption.text}{" "}
            {image.caption.link && (
              <Caption.Link href={image.caption.href} target="_blank">
                {image.caption.link}
              </Caption.Link>
            )}
          </Caption>
        )}
      </ImageWrapper>

      {text && (
        <TextWrapper>
          <Title text={text} />
        </TextWrapper>
      )}
    </Paper>
  );
};

const ImageWrapper = styled.div`
  position: relative;
  width: calc(100vw - 2 * var(--padding));

  & * {
    will-change: transform;
  }

  & > div::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      150deg,
      black 10%,
      var(--black) 48%,
      var(--black) 52%,
      black 90%
    );
  }

  @media ${breakpoints.M} {
    width: 60vw;
  }

  @media ${breakpoints.L} {
    width: 50vw;
  }

  @media ${breakpoints.XL} {
    width: 40vw;
  }
`;

ImageWrapper.displayName = "ImageWrapper";

const TextWrapper = styled.div`
  margin-top: var(--padding);
  font-size: 1rem;
`;

TextWrapper.displayName = "TextWrapper";
