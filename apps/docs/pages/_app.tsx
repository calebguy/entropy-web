import localFont from "@next/font/local";
import type { AppProps } from "next/app";
import "ui/styles.css";
import "../styles/globals.css";

const helvy = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNeue-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeue.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeue-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/HelveticaNeue-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-helvetica-neue",
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${helvy.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
