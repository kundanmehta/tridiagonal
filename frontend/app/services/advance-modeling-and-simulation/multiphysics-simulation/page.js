import CapabilityContent from '../CapabilityContent';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('multiphysics-simulation', {
    title: 'Multiphysics Simulation | Tridiagonal Solutions',
    description: 'Capturing synergy through CFD, FEA & DEM coupling for complex engineering challenges.'
  });
}

export default function Page() {
  return <CapabilityContent capabilityId="multiphysics" />;
}
