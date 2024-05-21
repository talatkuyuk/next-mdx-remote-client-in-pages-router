import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import ErrorComponent from "@/components/ErrorComponent";
import Header from "@/components/Header";

import "@/styles/styles.css";
import "@/styles/hljs.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <div className="main-wrapper">
        <Header />
        <ErrorBoundary
          errorComponent={(state) => <ErrorComponent error={state.error} />}
        >
          <Component {...pageProps} />
        </ErrorBoundary>
      </div>
    </>
  );
}
