import localFont from "@next/font/local";
import "dsl/styles.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";

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

export default function MyApp({ Component, pageProps }: AppProps) {
  const description = "e+ DSL";
  const name = "e+ DSL";
  const twitterCardUrl = "https://entropy-web-docs.vercel.app/twitter-card.png";
  const url = "https://entropy-web-docs.vercel.app/";
  return (
    <>
      <Head>
        <title>e+ DSL</title>
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
      <main className={`${helvetica.variable}`}>
        <Component {...pageProps} />
      </main>{" "}
    </>
  );
}
