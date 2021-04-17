import { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Bridge } from "../../../utils/types";

interface CountryInitialProps {
  bridges: Bridge;
  country: string;
}

const Country: NextPage<CountryInitialProps> = ({ bridges, country }) => {
  const countryName = country.replace(/\-/g, ' ').toUpperCase()

  return (
    <>
      <Head>
        <title>{`${countryName} | Oh, that bridge!`}</title>
        <meta name="description" content={country} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      In Progress
    </>
  );
};

export default Country;

export const getServerSideProps: GetServerSideProps<CountryInitialProps> = async ({
  locale,
  query,
}) => {
  const { countryName } = query;

  const response = await fetch(
    `${process.env.PUBLIC_URL}/api/bridges-by-country?country=${countryName}`
  );
  const data = await response.json();

  return {
    props: {
      bridges: data.bridges || [],
      country: countryName as string,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};
