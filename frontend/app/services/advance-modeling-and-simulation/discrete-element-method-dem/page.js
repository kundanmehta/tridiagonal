import CapabilityContent from '../CapabilityContent';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('discrete-element-method-dem', {
    title: 'Discrete Element Method (DEM) | Tridiagonal Solutions',
    description: 'Granular flow and particle dynamics optimization using advanced DEM simulation.'
  });
}

export default function Page() {
  return <CapabilityContent capabilityId="dem" />;
}
