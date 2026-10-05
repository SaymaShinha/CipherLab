import { Helmet } from "react-helmet-async";

const SITE_URL = "https://cipherlab.vercel.app";

const DEFAULT_TITLE = "CipherLab | Modern Browser-Based Cryptography Tools";

const DEFAULT_DESCRIPTION =
  "Free browser-based cryptography tools for encryption, hashing, encoding, passwords, and security workflows.";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  noIndex = false,
}) {
  const pageTitle = title ? `${title} | CipherLab` : DEFAULT_TITLE;

  const canonicalUrl = canonical
    ? canonical.startsWith("http")
      ? canonical
      : `${SITE_URL}${canonical}`
    : SITE_URL;

  return (
    <Helmet>
      <title>{pageTitle}</title>

      <meta name="description" content={description} />

      <link rel="canonical" href={canonicalUrl} />

      <meta
        name="robots"
        content={noIndex ? "noindex,nofollow" : "index,follow"}
      />

      <meta property="og:title" content={pageTitle} />

      <meta property="og:description" content={description} />

      <meta property="og:type" content="website" />

      <meta property="og:url" content={canonicalUrl} />

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={pageTitle} />

      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
