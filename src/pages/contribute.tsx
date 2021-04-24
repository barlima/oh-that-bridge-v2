import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";

import {
  Background,
  BackArrow,
  Container,
  Logo,
  Alignment,
  Title,
} from "../components/atoms";
import { FadeInAndOut, Fade } from "../containers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";

const Contribute: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Background>
      <Head>
        <title>{`${t("contribute.title")} | Oh, that bridge!`}</title>
        <meta name="description" content={t("contribute.title")} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo />
      <BackArrow href="/" />

      <Fade>
        <Container>
          <Alignment.Horizontal>
            <FadeInAndOut>
              <Title as="h1" text={t("contribute.title")} />
            </FadeInAndOut>
          </Alignment.Horizontal>

          <TextWrapper>
            <FadeInAndOut>
              <Alignment.Horizontal>
                <div>
                  <Title as="h3" text={t("contribute.content.a")} />
                  <br />
                  <Title as="h3" text={t("contribute.content.b")} />
                  <br />
                  <Title as="h3" text={t("contribute.content.c")} />
                  <br />
                  <DataItem>
                    <Title as="span" text={`- ${t("contribute.data.a")} -`} />
                  </DataItem>
                  <DataItem>
                    <Title as="span" text={`- ${t("contribute.data.b")} -`} />
                  </DataItem>
                  <DataItem>
                    <Title as="span" text={`- ${t("contribute.data.c")} -`} />
                  </DataItem>
                  <DataItem>
                    <Title as="span" text={`- ${t("contribute.data.d")} -`} />
                  </DataItem>
                  <DataItem>
                    <Title as="span" text={`- ${t("contribute.data.e")} -`} />
                  </DataItem>
                  <DataItem>
                    <Title as="span" text={`- ${t("contribute.data.f")} -`} />
                  </DataItem>
                  <br />
                  <Title as="h3" text={t("contribute.content.d")} />
                  <br />
                  <Title as="h3" text={t("contribute.content.e")} />
                  <br />
                  <Title as="h2" text="bartekperucki@gmail.com" />
                </div>
              </Alignment.Horizontal>
            </FadeInAndOut>
          </TextWrapper>
        </Container>
      </Fade>
    </Background>
  );
};

export default Contribute;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};

const TextWrapper = styled.div`
  margin-top: 5vh;

  & h3,
  & span {
    color: var(--grey);
    margin: 0;
  }
`;

TextWrapper.displayName = "Text";

const DataItem = styled.div`
  margin-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;
  width: 50vw;
`;

DataItem.displayName = "DataItem";
