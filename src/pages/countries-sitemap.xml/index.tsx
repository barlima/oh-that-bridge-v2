import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import flatten from "lodash/flatten";
import { countriesMap } from "../../utils/maps/countriesMap";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const continents = countriesMap;

  const countries = flatten<Record<string, string>>(Object.values(continents));

  const fields = countries.map((country) => ({
    loc: `https://ohthatbridge.com/countries/${country.name
      .toLowerCase()
      .replace(/,/g, "")
      .replace(/\s/g, "-")}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default () => {};
