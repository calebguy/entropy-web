import localFont from "@next/font/local";
import type { AppProps } from "next/app";
import "ui/styles.css";
import "../styles/globals.css";

// @next can this live in the UI package?
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
    <main className={`${helvetica.variable}`}>
      <Component {...pageProps} />
    </main>
  );
}
