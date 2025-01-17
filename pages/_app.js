import "@/styles/globals.css";

import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        {/* Primary Meta Tags */}
        <title>SerandipAI - AI-Powered Sri Lanka Travel Planner</title>
        <meta
          name="title"
          content="SerandipAI - AI-Powered Sri Lanka Travel Planner"
        />
        <meta
          name="description"
          content="Plan your perfect trip to Sri Lanka with SerandipAI. Get personalized itineraries, real-time updates, and local insights powered by AI."
        />
        <link rel="canonical" href="https://www.serandipai.com" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.serandipai.com" />
        <meta
          property="og:title"
          content="SerandipAI - AI-Powered Sri Lanka Travel Planner"
        />
        <meta
          property="og:description"
          content="Plan your perfect trip to Sri Lanka with SerandipAI. Get personalized itineraries, real-time updates, and local insights powered by AI."
        />
        <meta
          property="og:image"
          content="https://www.serandipai.com/og-image.jpg"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.serandipai.com" />
        <meta
          property="twitter:title"
          content="SerandipAI - AI-Powered Sri Lanka Travel Planner"
        />
        <meta
          property="twitter:description"
          content="Plan your perfect trip to Sri Lanka with SerandipAI. Get personalized itineraries, real-time updates, and local insights powered by AI."
        />
        <meta
          property="twitter:image"
          content="https://www.serandipai.com/twitter-image.jpg"
        />

        {/* Viewport */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
