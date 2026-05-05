import CapabilityContent from '../CapabilityContent';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('digital-twin', {
    title: 'Digital Twin | Tridiagonal Solutions',
    description: 'Virtual replicas of industrial assets and processes to optimize performance and reduce simulation costs.'
  });
}

export default function DigitalTwinPage() {
  return <CapabilityContent capabilityId="digital-twin" />;
}
