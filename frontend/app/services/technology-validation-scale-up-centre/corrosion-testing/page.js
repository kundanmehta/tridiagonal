import CapabilityContent from '../CapabilityContent';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('corrosion-testing', {
    title: 'Corrosion Testing Services | Tridiagonal Solutions',
    description: 'Material science excellence and integrity assurance through field and lab scale corrosion assessment.'
  });
}

export default function Page() {
  return <CapabilityContent capabilityId="corrosion-testing" />;
}
