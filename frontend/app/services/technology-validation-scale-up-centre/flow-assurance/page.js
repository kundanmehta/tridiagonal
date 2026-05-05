import CapabilityContent from '../CapabilityContent';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('flow-assurance', {
    title: 'Flow Assurance Services | Tridiagonal Solutions',
    description: 'Proactive testing and innovative solutions for smooth flow operations from reservoir to processing facilities.'
  });
}

export default function Page() {
  return <CapabilityContent capabilityId="flow-assurance" />;
}
