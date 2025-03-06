"use client";

import { DefaultSeo } from "next-seo";

export default function SeoWrapper({ siteName, siteUrl }) {
  return (
    <DefaultSeo
      openGraph={{
        type: "website",
        locale: "en_US",
        url: siteUrl,
        siteName: siteName,
      }}
      twitter={{
        handle: "@handle",
        site: "@site",
        cardType: "summary_large_image",
      }}
    />
  );
}
