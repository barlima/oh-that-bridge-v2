import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import countries from "i18n-iso-countries";
import styled from "styled-components";

import { Bridge } from "../../../utils/types";
import {
  Background,
  Title,
  Alignment,
  Rotate,
  BackArrow,
  Logo,
} from "../../../components/atoms";
import { breakpoints } from "../../../styles/breakpoints";
import { FadeInAndOut, Fade } from "../../../containers";
import { ImagePreview } from "../../../components/molecules";

interface CountryInitialProps {
  bridges: Bridge[];
  country: string;
}

const Country: NextPage<CountryInitialProps> = ({ bridges, country }) => {
  const { t } = useTranslation();

  return (
    <Background>
      <Head>
        <title>{`${country} | Oh, that bridge!`}</title>
        <meta name="description" content={country} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Logo />
      <BackArrow href="/" />

      <Fade>
        <Container>
          <Alignment.Horizontal>
            <FadeInAndOut>
              <Title as="h1" text={t("bridgesOf", { country })} />
            </FadeInAndOut>
          </Alignment.Horizontal>

          <Bridges>
            {bridges.map((bridge) => (
              <Link href={`/bridges/${bridge.id}`} passHref>
                <BridgeLink>
                  <Rotate random>
                    <ImagePreview image={bridge.image} text={bridge.name} />
                  </Rotate>
                </BridgeLink>
              </Link>
            ))}

            {bridges.length === 0 && (
              <NoBridges>
                <Title as="h2" text={t("noBridges")} />
                <Link href="/">
                  <a>
                    <Title as="h2" text={`<- ${t("goBack")}`} />
                  </a>
                </Link>
              </NoBridges>
            )}
          </Bridges>
        </Container>
      </Fade>
    </Background>
  );
};

export default Country;

export const getServerSideProps: GetServerSideProps<CountryInitialProps> = async ({
  locale,
  query,
}) => {
  try {
    const { countryName } = query;
    const country = (countryName as string).replace(/\-/g, " ");
    const countryCode = countries.getAlpha2Code(country, locale);
    const name =
      countries.getName(countryCode, locale, { select: "official" }) ||
      country.toUpperCase();

    const response = await fetch(
      `${process.env.PUBLIC_URL}/api/bridges-by-country?country=${countryName}`
    );
    const data = await response.json();

    return {
      props: {
        bridges: data.bridges || [],
        country: name,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (e) {
    return {
      redirect: {
        destination: "/",
      },
      props: {} as any,
    };
  }
};

const Container = styled.div`
  background-color: var(--white);
  width: 100%;
  min-height: 90vh;
  overflow-x: hidden;
  padding: 2rem;
  padding-top: calc(7vh + 2rem);

  @media ${breakpoints.M} {
    padding-top: 2rem;
  }

  & h1 {
    margin: 0;
    text-align: center;

    @media ${breakpoints.M} {
      text-align: left;
    }
  }
`;

Container.displayName = "Container";

const Bridges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

Bridges.displayName = "Bridges";

const BridgeLink = styled.a`
  margin: var(--padding);
  transition: transform 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.1);
    z-index: 10;

    & > div {
      transform: rotate(0);
    }
  }
`;

BridgeLink.displayName = "BridgeLink";

const NoBridges = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;

  @media ${breakpoints.M} {
    margin-top: 20vh;
  }

  & > h2 {
    color: var(--grey);
  }

  & h2 {
    margin: var(--padding);
  }
`;

NoBridges.displayName = "NoBridges";
