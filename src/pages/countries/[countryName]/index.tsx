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
  BackArrow,
  Logo,
  Container,
} from "../../../components/atoms";
import { breakpoints } from "../../../styles/breakpoints";
import { FadeInAndOut, Fade } from "../../../containers";
import { BridgesList } from "../../../components/molecules";

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
            <BridgesList bridges={bridges} />

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
      `${process.env.PUBLIC_URL}/api/bridges-by-country?country=${countryCode}`
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

const Bridges = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

Bridges.displayName = "Bridges";

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
