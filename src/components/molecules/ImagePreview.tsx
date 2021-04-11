import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { Paper } from "../atoms";
import { SizeEnum, Image as ImageType } from "../../utils/types";
import { ADDITIONAL_IMAGE_WIDTH } from "../../utils/consts";
import { breakpoints } from "../../styles/breakpoints";

interface ImagePreviewProps {
  image: ImageType;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({ image }) => {
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
      </ImageWrapper>
    </Paper>
  );
};

const ImageWrapper = styled.div`
  width: calc(80vw - 2 * var(--padding));

  @media ${breakpoints.M} {
    width: 200px;
  }
`;

ImageWrapper.displayName = "ImageWrapper";
