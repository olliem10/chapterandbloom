export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Chapter & Bloom",
    url: "https://chapterandbloom.co.uk",
    email: "chapterandbloom@outlook.com",
    description:
      "Curated book bundles and thoughtful gifts made for those who live between the pages.",
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
