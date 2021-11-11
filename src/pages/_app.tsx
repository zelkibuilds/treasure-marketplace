import "../css/tailwind.css";

import * as React from "react";
import Head from "next/head";
import { ChainId, DAppProvider } from "@yuyao17/corefork";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
import { resolveValue, Toaster } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/outline";
import { SSRProvider } from "@react-aria/ssr";
import { ThemeProvider } from "next-themes";

import Header from "../components/Header";
import { Spinner } from "../components/Spinner";
import { MagicProvider } from "../context/magicContext";
import Footer from "../components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const config = {
  readOnlyChainId: ChainId.Arbitrum,
  readOnlyUrls: {
    [ChainId.Rinkeby]:
      "https://rinkeby.infura.io/v3/62687d1a985d4508b2b7a24827551934",
    [ChainId.Arbitrum]:
      "https://arb-mainnet.g.alchemy.com/v2/gBb4c8M46YRZdoX3xrwbvaOk9CJQk82s",
  },
};

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Treasure Marketplace</title>
        <meta name="title" content="Treasure Marketplace" />
        <meta
          name="description"
          content="Arbitrum native NFT marketplace, created by TreasureDAO"
        />
        <meta property="og:type" content="website" />
        {/* TODO: change this to prod URL */}
        <meta property="og:url" content="https://metatags.io/" />
        <meta property="og:title" content="Treasure Marketplace" />
        <meta
          property="og:description"
          content="Arbitrum native NFT marketplace, created by TreasureDAO"
        />
        <meta
          property="og:image"
          // TODO: change this to prod URL
          content="http://localhost:3000/img/seoBanner.png"
        />
        <meta property="twitter:card" content="summary_large_image" />
        {/* TODO: change this to prod URL */}
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Treasure Marketplace" />
        <meta
          property="twitter:description"
          content="Arbitrum native NFT marketplace, created by TreasureDAO"
        />
        <meta
          property="twitter:image"
          // TODO: change this to prod URL
          content="http://localhost:3000/img/seoBanner.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <ThemeProvider attribute="class">
        <SSRProvider>
          <DAppProvider config={config}>
            <MagicProvider>
              <QueryClientProvider client={queryClient}>
                <Main Component={Component} pageProps={pageProps} />
                <ReactQueryDevtools />
              </QueryClientProvider>
            </MagicProvider>
          </DAppProvider>
          <Toaster position="bottom-left">
            {(t) => (
              <Transition
                show={t.visible}
                as={React.Fragment}
                enter="transform ease-out duration-300 transition"
                enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
                  <div className="p-4">
                    <div className="flex justify-center items-center">
                      <div className="flex-shrink-0">
                        {(() => {
                          switch (t.type) {
                            case "success":
                              return (
                                <CheckCircleIcon className="h-6 w-6 text-green-500" />
                              );
                            case "error":
                              return (
                                <ExclamationCircleIcon className="h-6 w-6 text-red-500" />
                              );
                            case "loading":
                              return (
                                <Spinner className="h-6 w-6 text-blue-500" />
                              );
                            default:
                              return (
                                <CheckCircleIcon className="h-6 w-6 text-yellow-500" />
                              );
                          }
                        })()}
                      </div>
                      <div className="ml-3 w-0 flex-1">
                        <p className="text-sm text-gray-500">
                          {resolveValue(t.message, t)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            )}
          </Toaster>
        </SSRProvider>
      </ThemeProvider>
    </>
  );
}

const Main = ({ pageProps, Component }) => {
  const [mounted, setMounted] = React.useState(false);

  // When mounted on client, now we can show the UI
  React.useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen relative flex flex-col overflow-hidden dark:bg-gray-900">
      {Component.disableHeader ? null : <Header />}
      <Component {...pageProps} />
      <Footer />
    </div>
  );
};

export default MyApp;
