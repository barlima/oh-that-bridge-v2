import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Title, Alignment } from "../components/atoms";
import { Card } from "../components/molecules";
import { SizeEnum } from "../utils/types";
import { Search } from "../components/organism";
import { useScreenResize } from "../hooks";
import { Fade } from "../containers";
import { breakpoints } from "../styles/breakpoints";

const Home: NextPage = () => {
  const { t } = useTranslation();
  const { size } = useScreenResize();
  const imageLevel = [SizeEnum.L, SizeEnum.XL].includes(size)
    ? SizeEnum.L
    : SizeEnum.XL;

  return (
    <Fade>
      <Head>
        <title>Oh, that bridge!</title>
        <meta name="description" content={t("search")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Title as="h1" text="Oh, that bridge!" />

        <Alignment.Horizontal>
          <Card
            image={{
              src: "/images/hero.jpg",
              alt: "hero image",
              caption: {
                text: "picture by",
                link: "@lance_asper",
                href: "https://unsplash.com/@lance_asper",
              },
            }}
            level={imageLevel}
          />
        </Alignment.Horizontal>

        <Alignment.Horizontal>
          <Search />
        </Alignment.Horizontal>
      </Container>
    </Fade>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const Container = styled.div`
  text-align: center;
  position: relative;

  & > h1 {
    font-size: 2rem;

    @media ${breakpoints.M} {
      font-size: 3rem;
    }
  }
`;

Container.displayName = "Container";
