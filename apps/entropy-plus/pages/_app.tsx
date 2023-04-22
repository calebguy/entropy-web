import localFont from "@next/font/local";
import "dsl/styles.css";
import Head from "next/head";
import "../styles/globals.css";

import { observer } from "mobx-react-lite";
import type { AppProps } from "next/app";
import Image from "next/image";
import { useEffect } from "react";
import { css } from "utils";
import {
  DESCRIPTION,
  NAME,
  TWITTER_CARD_URL,
  getBaseUrl,
} from "../environment/vars";
import AppStore from "../store/App.store";

// @next can this live in the DSL?
const helvetica = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNeue.woff2",
      weight: "400",
    },
  ],
  variable: "--font-helvetica-neue",
});

const MyApp = observer(({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    AppStore.init();
  }, []);
  return (
    <>
      <Head>
        <title>E+</title>
        <meta
          name="viewport"
          content="width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, user-scalable=0"
        />
        <meta name="description" content={DESCRIPTION} key="desc" />
        <meta property="og:site_name" content={NAME} />
        <meta property="og:title" content={NAME} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={TWITTER_CARD_URL} />
        <meta property="og:url" content={getBaseUrl()} />
        <meta name="twitter:title" content={NAME} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={TWITTER_CARD_URL} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className={css(helvetica.variable, "grow", "flex", "flex-col")}>
        {AppStore.hasInitialized && <Component {...pageProps} />}
        {!AppStore.hasInitialized && (
          <div
            className={css(
              "w-full",
              "h-full",
              "flex",
              "items-center",
              "justify-center",
              "grow"
            )}
          >
            <Image
              alt={"rotating logo"}
              src="/images/rotating-logo.gif"
              width={30}
              height={30}
            />
          </div>
        )}
      </main>
    </>
  );
});

export default MyApp;
