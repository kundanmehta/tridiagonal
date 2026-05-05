export const constructMetadata = (seo = {}, defaults = {}) => {
  const safeSeo = seo || {};
  const title = safeSeo.metaTitle || defaults.title || 'Tridiagonal Solutions | Process Excellence';
  const description = safeSeo.metaDescription || defaults.description || 'Leveraging advanced technologies to address process related challenges.';
  const image = safeSeo.ogImage || defaults.image || '/hubfs/tridiagonal-social-share.jpg';

  return {
    title,
    description,
    keywords: safeSeo.focusKeyword || defaults.keywords || 'process consulting, CFD, technology solutions',
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: safeSeo.canonicalUrl || defaults.canonical || 'https://tridiagonal.com',
    },
  };
};

export const fetchServiceMetadata = async (slug, defaults = {}) => {
  const { API_URL } = require('./apiConfig');
  try {
    const res = await fetch(`${API_URL}/api/services/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error('Not found');
    const json = await res.json();
    return constructMetadata(json.data?.seo, defaults);
  } catch (err) {
    return constructMetadata(null, defaults);
  }
};
