import CapabilityContent from '../CapabilityContent';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('new-energy-validation-and-eor', {
    title: 'New Energy Validation & EOR | Tridiagonal Solutions',
    description: 'Bridging the gap from TRL3 to TRL10 in Carbon Capture, Hydrogen, and Battery technology.'
  });
}

export default function Page() {
  return <CapabilityContent capabilityId="new-energy-validation" />;
}
