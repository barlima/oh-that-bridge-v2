import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

import { Paper, Caption } from "../atoms";
import { useScreenResize } from "../../hooks";
import { SizeEnum } from "../../utils/types";
import { BREAKPOINT_SIZE } from "../../styles/breakpoints";
import { ImageSizeMap } from "../../utils/maps/imageSizeMap";

const IMAGE_RATIO = 9 / 16;

interface CardProps {
  image: {
    src: string;
    alt: string;
  };
  level: SizeEnum;
  caption?: {
    text: string;
    link?: string;
    href?: string;
  };
}

export const Card: React.FC<CardProps> = ({ image, level, caption }) => {
  const { size } = useScreenResize();
  const [width, setWidth] = useState(
    BREAKPOINT_SIZE[size] * ImageSizeMap[level]
  );

  useEffect(() => {
    setWidth(BREAKPOINT_SIZE[size] * ImageSizeMap[level]);
  }, [size, level]);

  return (
    <Paper>
      <ImageWrapper>
        <Image
          src={image.src}
          alt={image.alt}
          objectFit="fill"
          width={width}
          height={width * IMAGE_RATIO}
        />
        <Caption>
          {caption.text}{" "}
          <Caption.Link href={caption.href} target="_blank">
            {caption.link}
          </Caption.Link>
        </Caption>
      </ImageWrapper>
    </Paper>
  );
};

const ImageWrapper = styled.div`
  position: relative;
`;

ImageWrapper.displayName = "ImageWrapper";
