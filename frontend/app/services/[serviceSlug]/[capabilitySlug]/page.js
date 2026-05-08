import DynamicCapabilityClient from '@/components/DynamicCapabilityClient';
import { API_URL } from '@/lib/apiConfig';

export async function generateMetadata({ params }) {
  const { serviceSlug, capabilitySlug } = params;
  try {
    const res = await fetch(`${API_URL}/api/services/${serviceSlug}`, { next: { revalidate: 60 } });
    const json = await res.json();
    const service = json.data;
    const capability = service?.capabilities?.find(c => c.slug === capabilitySlug);
    
    if (!capability) return { title: 'Tridiagonal Solutions' };
    
    return {
      title: `${capability.title} | Tridiagonal Solutions`,
      description: capability.subtitle || capability.desc,
      openGraph: {
        title: capability.title,
        description: capability.subtitle || capability.desc,
        images: [capability.heroImage || '/images/og-default.jpg'],
      }
    };
  } catch {
    return { title: 'Tridiagonal Solutions' };
  }
}

export default function CapabilitySubPage({ params }) {
  const { serviceSlug, capabilitySlug } = params;
  return <DynamicCapabilityClient serviceSlug={serviceSlug} capabilitySlug={capabilitySlug} />;
}
