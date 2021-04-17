import { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";
import countries from "i18n-iso-countries";
import { ProgressBar } from "../components/atoms";

import "../styles/globals.css";

countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Oh, that bridge! (ohthatbridge.com)</title>
        <meta
          name="description"
          content="Search for bridges all around the world!"
        />
      </Head>

      <ProgressBar />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
