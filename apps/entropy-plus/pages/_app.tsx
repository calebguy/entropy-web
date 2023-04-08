import localFont from "@next/font/local";
import "dsl/styles.css";
import Head from "next/head";
import "../styles/globals.css";

import { observer } from "mobx-react-lite";
import type { AppProps } from "next/app";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { css } from "utils";
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
  const description = "universal connector";
  const name = "E+";
  // @next update
  const twitterCardUrl =
    "https://entropy-web-docs.vercel.app/images/twitter-card.png";
  const url = "https://entropy-web-docs.vercel.app/";
  const router = useRouter();
  useEffect(() => {
    console.log("calling init");
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
        <meta name="description" content={description} key="desc" />
        <meta property="og:site_name" content={name} />
        <meta property="og:title" content={name} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={twitterCardUrl} />
        <meta property="og:url" content={url} />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={twitterCardUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <main className={css(helvetica.variable, "grow", "flex", "flex-col")}>
        {AppStore.auth.hasInitialized && <Component {...pageProps} />}
        {!AppStore.auth.hasInitialized && (
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
