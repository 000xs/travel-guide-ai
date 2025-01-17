import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "TravelAgency",
      name: "SerandipAI",
      description: "AI-powered travel planner for Sri Lanka.",
      url: "https://travel-agent-roan.vercel.app/",

      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+94 123 456 789",
        contactType: "customer service",
        email: "info@travelplanner.com",
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Colombo Street",
        addressLocality: "Colombo",
        addressRegion: "Western Province",
        postalCode: "12345",
        addressCountry: "Sri Lanka",
      },
    };

    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+Pro:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&family=Roboto:wght@400;500&display=swap"
            rel="stylesheet"
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
