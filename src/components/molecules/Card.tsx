import React, { useState, useEffect } from "react";
import Image from "next/image";
import styled from "styled-components";

import { Paper, Caption, Title } from "../atoms";
import { useScreenResize } from "../../hooks";
import { SizeEnum, Image as ImageType } from "../../utils/types";
import { BREAKPOINT_SIZE } from "../../styles/breakpoints";
import { ImageSizeMap } from "../../utils/maps/imageSizeMap";
import { IMAGE_RATIO } from "../../utils/consts";

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
  const { size } = useScreenResize();
  const [imageWidth, setImageWidth] = useState(
    BREAKPOINT_SIZE[size] * ImageSizeMap[level]
  );

  useEffect(() => {
    if (width) {
      return;
    }

    setImageWidth(BREAKPOINT_SIZE[size] * ImageSizeMap[level]);
  }, [size, level, width]);

  return (
    <Paper size={level}>
      <ImageWrapper>
        <Image
          src={image.src}
          alt={image.alt}
          objectFit="cover"
          width={width || imageWidth}
          height={(width || imageWidth) * ratio}
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

  & * {
    will-change: transform;
  }
`;

ImageWrapper.displayName = "ImageWrapper";

const TextWrapper = styled.div`
  margin-top: var(--padding);
  font-size: 1rem;
`;

TextWrapper.displayName = "TextWrapper";
