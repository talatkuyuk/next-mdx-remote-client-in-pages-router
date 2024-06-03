import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { motion } from "framer-motion";

import { ErrorBoundary } from "next/dist/client/components/error-boundary";

import ErrorComponent from "@/components/ErrorComponent";
import Header from "@/components/Header";

import "@/styles/styles.css";
import "@/styles/hljs.css";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>
      <div className="main-wrapper">
        <ThemeProvider enableSystem={false}>
          <Header />
          <ErrorBoundary
            errorComponent={(state) => <ErrorComponent error={state.error} />}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 100 }}
              transition={{ type: "easeIn", duration: 0.4 }}
              key={router.asPath}
            >
              <Component {...pageProps} />
            </motion.div>
          </ErrorBoundary>
        </ThemeProvider>
      </div>
    </>
  );
}
