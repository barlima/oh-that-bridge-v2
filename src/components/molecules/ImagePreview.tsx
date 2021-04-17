import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { Paper, Caption, Title } from "../atoms";
import { SizeEnum, Image as ImageType } from "../../utils/types";
import { ADDITIONAL_IMAGE_WIDTH } from "../../utils/consts";
import { breakpoints } from "../../styles/breakpoints";

interface ImagePreviewProps {
  image: ImageType;
  text?: string;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image, text }) => {
  return (
    <Paper size={SizeEnum.S}>
      <ImageWrapper>
        <Image
          src={image.src}
          alt={image.alt}
          layout="intrinsic"
          objectFit="cover"
          priority
          width={ADDITIONAL_IMAGE_WIDTH}
          height={ADDITIONAL_IMAGE_WIDTH}
        />
        {image.caption && (
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
      {text && <Title text={text} />}
    </Paper>
  );
};

const ImageWrapper = styled.div`
  position: relative;
  width: calc(80vw - 2 * var(--padding));

  @media ${breakpoints.M} {
    width: 200px;
  }
`;

ImageWrapper.displayName = "ImageWrapper";
