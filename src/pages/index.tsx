import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import styled from "styled-components";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { Title, Alignment } from "../components/atoms";
import { Card } from "../components/molecules";
import { SizeEnum } from "../utils/types";
import { Search } from "../components/organism";
import { useScreenResize } from "../hooks";
import { Fade, FadeInAndOut, Motion } from "../containers";
import { breakpoints } from "../styles/breakpoints";
import { slideBottom } from "../utils/animations";

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

      <Motion>
        <Container>
          <motion.div variants={slideBottom}>
            <Title as="h1" text="Oh, that bridge!" />
          </motion.div>

          <Alignment.Horizontal>
            <FadeInAndOut>
              <Card
                image={{
                  src:
                    "https://images.unsplash.com/photo-1477288309209-a14ce05a641e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
                  alt: "hero image",
                  caption: {
                    text: "picture by",
                    link: "@lance_asper",
                    href: "https://unsplash.com/@lance_asper",
                  },
                }}
                level={imageLevel}
              />
            </FadeInAndOut>
          </Alignment.Horizontal>

          <Alignment.Horizontal>
            <Search />
          </Alignment.Horizontal>

          <Alignment.Horizontal>
            <FadeInAndOut>
              <Note>
                <Title as="h4" text={t("note")} />
              </Note>
            </FadeInAndOut>
          </Alignment.Horizontal>
        </Container>
      </Motion>
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

const Note = styled.div`
  bottom: 0;
  width: 90vw;
  margin-top: var(--padding);

  @media ${breakpoints.M} {
    width: 50vw;
    position: relative;
  }
`;

Note.displayName = "Note";
