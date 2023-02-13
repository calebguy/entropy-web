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
  return (
    <>
      <Head>
        <title>e+ DSL</title>
      </Head>
      <main className={`${helvetica.variable}`}>
        <Component {...pageProps} />
      </main>{" "}
    </>
  );
}
