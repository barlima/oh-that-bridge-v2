import { NextPage, GetStaticProps } from "next";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import styled from "styled-components";

import {
  Background,
  BackArrow,
  Container,
  Logo,
  Alignment,
  Title,
  Paragraph,
} from "../components/atoms";
import { FadeInAndOut, Fade } from "../containers";
import { breakpoints } from "../styles/breakpoints";

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
                <Text>
                  {t("contribute.content.a")}
                  <Paragraph>
                    {t("contribute.content.b")}
                    <Title as="span" text="Oh, that bridge!" />
                    {t("contribute.content.c")}
                    <br />
                    {t("contribute.content.d")}
                    <br />
                    <br />
                    <DataItem>{t("contribute.data.a")}</DataItem>
                    <DataItem>{t("contribute.data.b")}</DataItem>
                    <DataItem>{t("contribute.data.c")}</DataItem>
                    <DataItem>{t("contribute.data.d")}</DataItem>
                    <DataItem>{t("contribute.data.e")}</DataItem>
                    <DataItem>{t("contribute.data.f")}</DataItem>
                    <br />
                    {t("contribute.content.e")}
                    <br />
                    <br />
                    {t("contribute.content.f")}
                    <br />
                    <Email href="mailto:bartekperucki@gmail.com">
                      <Title as="h3" text="bartekperucki@gmail.com" />
                    </Email>
                  </Paragraph>
                </Text>
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
    color: var(--black);
    margin: 0;
    width: 100%;
  }
`;

TextWrapper.displayName = "Text";

const Text = styled.div`
  width: 100%;
`;

Text.displayName = "Text";

const DataItem = styled.div`
  font-size: 0.75rem;
  margin-bottom: 0.5rem;
  margin-left: auto;
  margin-right: auto;

  @media ${breakpoints.M} {
    width: 50vw;
  }
`;

DataItem.displayName = "DataItem";

const Email = styled.a`
  & > h3 {
    margin-top: var(--padding);
    font-size: 1rem;
    transform: scale(1);
    width: 100%;
    transition: color 0.5s;

    &:hover {
      color: var(--grey);
    }

    @media ${breakpoints.M} {
      font-size: 1.5rem;
    }
  }
`;

Email.displayName = "Email";
