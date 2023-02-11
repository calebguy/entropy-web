import localFont from "@next/font/local";
import type { AppProps } from "next/app";
import "ui/styles.css";
import "../styles/globals.css";

const helvy = localFont({
  src: [
    {
      path: "../public/fonts/HelveticaNeue-Light.woff2",
      weight: "300",
    },
    {
      path: "../public/fonts/HelveticaNeue.woff2",
      weight: "400",
    },
    {
      path: "../public/fonts/HelveticaNeue-Medium.woff2",
      weight: "500",
    },
    {
      path: "../public/fonts/HelveticaNeue-Bold.woff2",
      weight: "700",
    },
  ],
  variable: "--font-helvetica-neue",
});

console.log(helvy);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <main className={`${helvy.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
