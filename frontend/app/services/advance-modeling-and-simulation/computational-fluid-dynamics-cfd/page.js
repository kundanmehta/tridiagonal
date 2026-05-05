import CapabilityContent from '../CapabilityContent';
import { constructMetadata } from '@/lib/seoUtils';
import { API_URL } from '@/lib/apiConfig';

export async function generateMetadata() {
  const slug = 'computational-fluid-dynamics-cfd';
  try {
    const res = await fetch(`${API_URL}/api/services/${slug}`, { next: { revalidate: 3600 } });
    const json = await res.json();
    const data = json.data;

    return constructMetadata(data?.seo, {
      title: 'Computational Fluid Dynamics (CFD) | Tridiagonal Solutions',
      description: 'Advanced CFD simulation services for fluid flow analysis, combustion modeling, and performance enhancement.'
    });
  } catch {
    return constructMetadata(null, {
      title: 'Computational Fluid Dynamics (CFD) | Tridiagonal Solutions',
      description: 'Advanced CFD simulation services for fluid flow analysis, combustion modeling, and performance enhancement.'
    });
  }
}

export default function Page() {
  return <CapabilityContent capabilityId="cfd" />;
}
