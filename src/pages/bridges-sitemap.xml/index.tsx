import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { Bridge } from "../../utils/types";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const response = await fetch(`${process.env.PUBLIC_URL}/api/bridges`);
  const data = await response.json();

  const fields = data.bridges.map((bridge: Bridge) => ({
    loc: `https://ohthatbridge.com/bridge/${bridge.id}`,
    lastmod: new Date().toISOString(),
  }));

  return getServerSideSitemap(ctx, fields);
};

export default () => {};
