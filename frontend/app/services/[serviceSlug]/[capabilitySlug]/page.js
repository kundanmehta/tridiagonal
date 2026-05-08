import DynamicSubPageClient from '@/components/DynamicSubPageClient';
import { API_URL } from '@/lib/apiConfig';

export async function generateMetadata({ params }) {
  const { capabilitySlug } = params;
  try {
    const res = await fetch(`${API_URL}/api/sub-pages/${capabilitySlug}`, { next: { revalidate: 60 } });
    const json = await res.json();
    const data = json.data;
    if (!data) return { title: 'Tridiagonal Solutions' };
    return {
      title: data.seo?.metaTitle || `${data.title} | Tridiagonal Solutions`,
      description: data.seo?.metaDescription || data.hero?.description || data.subtitle,
      openGraph: {
        title: data.seo?.metaTitle || data.title,
        description: data.seo?.metaDescription || data.subtitle,
        images: [data.seo?.ogImage || data.hero?.image || '/images/og-default.jpg'],
      }
    };
  } catch {
    return { title: 'Tridiagonal Solutions' };
  }
}

export default function CapabilitySubPage({ params }) {
  const { capabilitySlug } = params;
  return <DynamicSubPageClient slug={capabilitySlug} />;
}
