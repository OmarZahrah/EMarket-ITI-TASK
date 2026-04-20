import type { NextPage } from "next";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { ReactElement, ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import "@/styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export type NextPageWithLayout<P = object> = NextPage<P> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => <SiteShell>{page}</SiteShell>);

  return (
    <>
      <Head>
        <title>EMarket</title>
        <meta
          name="description"
          content="EMarket — curated accessories, electronics, and lifestyle essentials with clear pricing and fast browsing."
        />
      </Head>
      <main
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-full flex-col bg-[var(--background)] text-slate-800 antialiased`}
      >
        {getLayout(<Component {...pageProps} />)}
      </main>
    </>
  );
}
