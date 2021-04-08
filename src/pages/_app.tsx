import { AppProps } from "next/app";
import Head from "next/head";
import { appWithTranslation } from "next-i18next";

import "../styles/globals.css";

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
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
