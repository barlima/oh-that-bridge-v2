import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Title, Alignment } from "../components/atoms";
import { Card } from "../components/molecules";
import { SizeEnum } from "../utils/types";
import { Search } from "../components/organism";
import { useScreenResize } from "../hooks";

const Home: NextPage = () => {
  const { size } = useScreenResize();
  const imageLevel = [SizeEnum.L, SizeEnum.XL].includes(size)
    ? SizeEnum.L
    : SizeEnum.XL;

  return (
    <div>
      <Head>
        <title>Oh, that bridge!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Title as="h1" text="Oh, that bridge!" />

        <Alignment.Horizontal>
          <Card
            image={{
              src: "/images/hero.jpg",
              alt: "hero image",
            }}
            level={imageLevel}
            caption={{
              text: "picture by",
              link: "@lance_asper",
              href: "https://unsplash.com/@lance_asper",
            }}
          />
        </Alignment.Horizontal>

        <Alignment.Horizontal>
          <Search />
        </Alignment.Horizontal>
      </Container>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const Container = styled.div`
  text-align: center;
`;

Container.displayName = "Container";
