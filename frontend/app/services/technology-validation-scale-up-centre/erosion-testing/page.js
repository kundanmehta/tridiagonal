import CapabilityContent from '../CapabilityContent';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('erosion-testing', {
    title: 'Erosion Testing Services | Tridiagonal Solutions',
    description: 'Rigorous evaluation for durability and reliability of oil and gas production equipment.'
  });
}

export default function Page() {
  return <CapabilityContent capabilityId="erosion-testing" />;
}
