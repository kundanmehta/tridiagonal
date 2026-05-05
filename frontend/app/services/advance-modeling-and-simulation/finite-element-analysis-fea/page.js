import CapabilityContent from '../CapabilityContent';
import { fetchServiceMetadata } from '@/lib/seoUtils';

export async function generateMetadata() {
  return fetchServiceMetadata('finite-element-analysis-fea', {
    title: 'Finite Element Analysis (FEA) | Tridiagonal Solutions',
    description: 'Structural, fatigue, and thermal integrity assessment using advanced FEA simulation.'
  });
}

export default function Page() {
  return <CapabilityContent capabilityId="fea" />;
}
