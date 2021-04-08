import { useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { motion } from "framer-motion";
import styled from "styled-components";

import { Bridge as BridgeType, SizeEnum, Image } from "../../../utils/types";
import {
  Title,
  Alignment,
  Paragraph,
  Rotate,
  Background,
  Logo,
} from "../../../components/atoms";
import { Card, IconBullet } from "../../../components/molecules";
import { BREAKPOINT_SIZE, breakpoints } from "../../../styles/breakpoints";
import { useOnScreenResize, useScreenResize } from "../../../hooks";
import { IMAGE_RATIO } from "../../../utils/consts";
import { metadataIconsMap } from "../../../utils/maps/metadataIconsMap";
import { bridgeMetadataMap } from "../../../utils/maps/bridgeMetadataMap";
import { Motion, FadeInAndOut } from "../../../containers";
import {
  slideLeftBottom,
  stagger,
  slideBottom,
} from "../../../utils/animations";

interface BridgeInitialProps {
  bridge: BridgeType;
}

const Bridge: NextPage<BridgeInitialProps> = ({ bridge }) => {
  const { size } = useScreenResize();
  const [imageWidth, setImageWidth] = useState(BREAKPOINT_SIZE[SizeEnum.L] / 2);
  const [mainImage, setMainImage] = useState(bridge.image);
  const [additionalImages, setAdditionalImages] = useState(
    bridge.additionalImages
  );

  const metadata = bridgeMetadataMap(bridge.metadata);

  const getCaption = (image: Image) => (
    <span>
      {image.caption.text}{" "}
      <a href={image.caption.link} target="_blank">
        {image.caption.link}
      </a>
    </span>
  );

  const updateMainImage = (image: Image): void => {
    const newAdditionalImagesOrder =
      image === bridge.image
        ? bridge.additionalImages
        : bridge.additionalImages.reduce((acc, img) => {
            return img === image ? [...acc, bridge.image] : [...acc, img];
          }, []);

    setMainImage(image);
    setAdditionalImages(newAdditionalImagesOrder);
  };

  const onScreenResize = (): void => {
    if (typeof window !== "undefined") {
      const screenHeightHalf = window.innerHeight / 2;
      const screenWidthHalf = window.innerWidth / 2;

      if (window.innerWidth < BREAKPOINT_SIZE.M) {
        return;
      }

      if (screenWidthHalf * IMAGE_RATIO > screenHeightHalf) {
        setImageWidth(screenHeightHalf / IMAGE_RATIO);
      } else {
        setImageWidth(screenWidthHalf);
      }
    }
  };

  useOnScreenResize(onScreenResize);

  useEffect(() => {
    if (typeof window !== "undefined" && size === SizeEnum.S) {
      setImageWidth(window.innerWidth);
    }
  }, [size]);

  return (
    <Background>
      <Head>
        <title>{`${bridge.name} | Oh, that bridge!`}</title>
        <meta name="description" content={bridge.name} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo />

      <Motion>
        <Alignment.Center>
          <Container>
            <ImageOverflow variants={slideLeftBottom} key={mainImage.src}>
              <Rotate deg={size === SizeEnum.S ? 0 : -2}>
                <Card
                  image={mainImage}
                  width={imageWidth}
                  text={getCaption(mainImage)}
                />
              </Rotate>
            </ImageOverflow>

            <MainSection>
              <FadeInAndOut>
                <Title as="h1" text={bridge.name} />
              </FadeInAndOut>

              <BulletList variants={stagger}>
                {Object.entries(metadata).map(([key, value]) => (
                  <motion.div variants={slideBottom} key={key}>
                    <IconBullet icon={metadataIconsMap[key]} text={value} />
                  </motion.div>
                ))}
              </BulletList>

              <OtherImages>
                {additionalImages.map((img) => (
                  <OtherImage
                    key={img.src}
                    onClick={() => updateMainImage(img)}
                  >
                    <Rotate random>
                      <Card
                        image={{ ...img }}
                        level={SizeEnum.S}
                        ratio={1}
                        width={200}
                      />
                    </Rotate>
                  </OtherImage>
                ))}
              </OtherImages>
            </MainSection>

            <SecondarySection offset={imageWidth * IMAGE_RATIO}>
              <Paragraph>{bridge.description}</Paragraph>
            </SecondarySection>
          </Container>
        </Alignment.Center>
      </Motion>
    </Background>
  );
};

export default Bridge;

export const getServerSideProps: GetServerSideProps<BridgeInitialProps> = async ({
  locale,
  query,
}) => {
  const { bridgeId } = query;
  const response = await fetch(
    `${process.env.PUBLIC_URL}/api/bridge/${bridgeId}`
  );
  const data = await response.json();

  return {
    props: {
      bridge: data.bridge,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const Container = styled.div`
  background-color: var(--white);
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;
  min-height: 90vh;
  overflow-x: hidden;

  @media ${breakpoints.M} {
    flex-direction: row;
  }
`;

Container.displayName = "Container";

const OtherImages = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  @media ${breakpoints.M} {
    height: fit-content;
    min-height: 50%;
    align-items: flex-end;
    justify-content: flex-start;
  }
`;

OtherImages.displayName = "OtherImages";

const OtherImage = styled(FadeInAndOut)`
  height: min-content;
  transition: transform 0.5s;
  margin-right: 0;
  margin-top: var(--padding);

  @media ${breakpoints.M} {
    margin-right: var(--padding);
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    z-index: 10;

    & > div {
      transform: rotate(0);
    }
  }
`;

OtherImage.displayName = "OtherImage";

const MainSection = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin: 2rem;

  & h1 {
    margin: 0;
    text-align: center;

    @media ${breakpoints.M} {
      text-align: left;
    }
  }
`;

MainSection.displayName = "MainSection";

const SecondarySection = styled.div<{ offset: number }>`
  flex: 1;
  margin: 2rem;

  @media ${breakpoints.M} {
    margin-top: ${(p) => `calc(${p.offset}px + var(--padding))`};
  }
`;

SecondarySection.displayName = "SecondarySection";

const ImageOverflow = styled(motion.div)`
  margin-top: 5vh;

  @media ${breakpoints.M} {
    margin-top: 0;
    position: absolute;
    right: calc(-0.5 * var(--padding));
    top: 0;
  }
`;

ImageOverflow.displayName = "ImageOverflow";

const BulletList = styled(motion.div)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: calc(2 * var(--padding)) 0;

  & > div {
    width: 100%;
    padding-bottom: var(--padding);

    @media ${breakpoints.M} {
      width: 40%;
    }
  }
`;

BulletList.displayName = "BulletList";
