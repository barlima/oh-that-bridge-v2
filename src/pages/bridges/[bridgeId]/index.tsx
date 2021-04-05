import { useState, useEffect } from "react";
import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";

import { Bridge as BridgeType, SizeEnum } from "../../../utils/types";
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

interface BridgeInitialProps {
  bridge: BridgeType;
}

const Bridge: NextPage<BridgeInitialProps> = ({ bridge }) => {
  const { size } = useScreenResize();
  const [imageWidth, setImageWidth] = useState(BREAKPOINT_SIZE[SizeEnum.L] / 2);
  const [mainImage, setMainImage] = useState(bridge.image);

  const metadata = bridgeMetadataMap(bridge.metadata);
  const caption = (
    <span>
      {mainImage.caption.text}{" "}
      <a href={mainImage.caption.link} target="_blank">
        {mainImage.caption.link}
      </a>
    </span>
  );

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
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo />

      <Alignment.Center>
        <Container>
          <ImageOverflow>
            <Rotate deg={size === SizeEnum.S ? 0 : -2}>
              <Card image={bridge.image} width={imageWidth} text={caption} />
            </Rotate>
          </ImageOverflow>

          <MainSection>
            <Title as="h1" text={bridge.name} />

            <BulletList>
              {Object.entries(metadata).map(([key, value]) => (
                <IconBullet
                  key={key}
                  icon={metadataIconsMap[key]}
                  text={value}
                />
              ))}
            </BulletList>

            <OtherImages>other images</OtherImages>
          </MainSection>

          <SecondarySection offset={imageWidth * IMAGE_RATIO}>
            <Paragraph>{bridge.description}</Paragraph>
          </SecondarySection>
        </Container>
      </Alignment.Center>
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

  @media ${breakpoints.M} {
    flex-direction: row;
  }
`;

Container.displayName = "Container";

const OtherImages = styled.div`
  @media ${breakpoints.M} {
    height: 50%;
  }
`;

OtherImages.displayName = "OtherImages";

const MainSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  margin: 2rem;

  & > h1 {
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

const ImageOverflow = styled.div`
  margin-top: 5vh;

  @media ${breakpoints.M} {
    margin-top: 0;
    position: absolute;
    right: calc(-0.5 * var(--padding));
    top: 0;
  }
`;

ImageOverflow.displayName = "ImageOverflow";

const BulletList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: calc(2 * var(--padding)) 0;

  & > div {
    min-width: 40%;
    padding-bottom: var(--padding);
  }
`;

BulletList.displayName = "BulletList";
