import React from "react";
import Image from "next/image";
import styled from "styled-components";

import { Paper, Caption, Title } from "../atoms";
import { SizeEnum, Image as ImageType } from "../../utils/types";
import { ADDITIONAL_IMAGE_WIDTH, FALLBACK_IMAGE } from "../../utils/consts";
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
          src={image.src || FALLBACK_IMAGE}
          alt={image.alt}
          layout="intrinsic"
          objectFit="cover"
          priority
          width={ADDITIONAL_IMAGE_WIDTH}
          height={ADDITIONAL_IMAGE_WIDTH}
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
      <Subtitle>{text && <Title text={text} />}</Subtitle>
    </Paper>
  );
};

const ImageWrapper = styled.div`
  position: relative;

  @media ${breakpoints.M} {
    width: 200px;
  }
`;

ImageWrapper.displayName = "ImageWrapper";

const Subtitle = styled.div`
  margin-top: 0.5rem;
  max-width: 100%;
  text-align: center;

  @media ${breakpoints.M} {
    width: 200px;
  }
`;

Subtitle.displayName = "Subtitle";
