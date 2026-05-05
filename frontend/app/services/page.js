import { constructMetadata } from '@/lib/seoUtils';
import { API_URL } from '@/lib/apiConfig';
import ServicesClient from './ServicesClient';

export async function generateMetadata() {
  const slug = 'services-landing';
  try {
    const res = await fetch(`${API_URL}/api/services/${slug}`, { next: { revalidate: 3600 } });
    const json = await res.json();
    return constructMetadata(json.data?.seo, {
      title: 'Engineering Services & Solutions | Tridiagonal Solutions',
      description: 'Design, optimize and troubleshoot complex chemical processes with our expert engineering team specializing in flow modeling, particle technology, and asset performance.'
    });
  } catch {
    return constructMetadata(null, {
      title: 'Engineering Services & Solutions | Tridiagonal Solutions',
      description: 'Design, optimize and troubleshoot complex chemical processes with our expert engineering team specializing in flow modeling, particle technology, and asset performance.'
    });
  }
}

export default function ServicesPage() {
  return <ServicesClient />;
}
