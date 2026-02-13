import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, url, image }) => {
  
  const siteTitle = "PalmeFoods | Premium Palm Oil Nigeria";
  const defaultDescription = "PalmeFoods offers pure, unadulterated palm oil sourced from Osun State. Nationwide delivery to Lagos, Abuja, and beyond. Wholesale & Retail.";
  const siteUrl = "https://palmefoods.com";
  const defaultImage = "https://palmefoods.com/images/og-social-card.jpg"; 

  
  const finalTitle = title ? `${title} | PalmeFoods` : siteTitle;
  const finalDescription = description || defaultDescription;
  const finalUrl = url || siteUrl;
  const finalImage = image || defaultImage;

  return (
    <Helmet>
      
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content="palm oil, buy palm oil nigeria, unadulterated palm oil, osun palm oil, cooking oil, wholesale palm oil, red oil, palmefoods, healthy cooking oil" />
      <link rel="canonical" href={finalUrl} />

      
      <meta property="og:type" content="website" />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:site_name" content="PalmeFoods Nigeria" />

      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={finalUrl} />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      
      
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "PalmeFoods Nigeria",
          "url": "https://palmefoods.com",
          "logo": "https://palmefoods.com/logo.png",
          "sameAs": [
            "https://www.facebook.com/palmefoods/",
            "https://www.instagram.com/palmefoods",
            "https://x.com/palmefoods"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+234-913-403-3103",
            "contactType": "customer service",
            "areaServed": "NG"
          }
        })}
      </script>
    </Helmet>
  );
};

export default SEO;